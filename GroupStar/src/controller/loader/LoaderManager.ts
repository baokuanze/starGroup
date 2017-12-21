module controller.loader {
	/**
	 *
	 * @author 
	 *
	 */
    export class LoaderManager {
        private loadingGroups: Array<string>;
        private loadindex: number = 0;
        private _progress: Function = null;
        private _complete: Function = null;
        private autoRemoveView: boolean;
        private scope: any;
        public constructor() {
            this.autoRemoveView = false;
        }
        /**
        * 最初的静默加载
        */
        public preloading(callback: Function,scope:any): void {
            this.scope = scope;
            this.startLoading(["proload"],null,callback);
        }
                
        /**
        * 游戏主加载
        */
        public mainLoading(groupNames: Array<string>,callback: Function,scope: any): void {
            this.scope = scope;
            var int: number = 0;
            for(var i = 0;i < groupNames.length;i++) {
                RES.loadGroup(groupNames[i],i);
                if(!RES.isGroupLoaded(groupNames[i])) {
                    int++;
                }
            }
            console.log(int,'init')
            if(int>0){
                GameApp.Manager.viewManager.loading.show();
                this.autoRemoveView = true;
                this.startLoading(groupNames,
                    function(event: RES.ResourceEvent) {
                        console.log(event,'RES.ResourceEvent)')
                        GameApp.Manager.viewManager.loading.setProgress(event);
                    },function() {
                        callback.call(scope);
                    });
            }else{
                callback.call(scope);
            }
        }
        /**
        *游戏分步加载
        **/
        public moduleLoading(groupNames: Array<string>,callback: Function,scope: any): void {
            this.loadindex = 0;
            this.scope = scope;
            this._complete = callback;
            this.loadingGroups = groupNames;
            this.autoRemoveView = true;
            var int:number = 0;
            for(var i = 0;i < this.loadingGroups.length;i++) {
                RES.loadGroup(this.loadingGroups[i],i);
                if(!RES.isGroupLoaded(this.loadingGroups[i])){
                    int++;
                }
            }
            if(int==0){
                if(this._complete) this._complete.call(this.scope ? this.scope : this,event);
                return; 
            }
            GameApp.Manager.viewManager.loading.showModule();
            this._progress = function(event: RES.ResourceEvent) {
                GameApp.Manager.viewManager.loading.setProgress(event);
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            for(var i = 0;i < this.loadingGroups.length;i++) {
                RES.loadGroup(this.loadingGroups[i],i);
            }
        }
        /**开始加载明星资源**/
        public starLoading(starurl: string,nexturl: string):void{
//            controller.loader.LoadStar.getInstance().load(starurl,nexturl);
        }
        /**
        * 开始加载资源
        */
        private startLoading(groupNames: Array<string>,onProgress: Function,onComplete: Function): void {
            this.loadindex = 0;
            this.loadingGroups = groupNames;
            this._progress = onProgress;
            this._complete = onComplete;
            //初始化Resource资源加载库
            this.onConfigComplete(null);
//            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
//            RES.loadConfig("resource/resource.json","resource/");
        }
        public loadRes(onComplete: Function):void{
            this._complete = onComplete;
            this.onc(null);
//            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onc,this);
//            RES.loadConfig("resource/resource.json","resource/");
        }
        private onc(event: RES.ResourceEvent):void{
//            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onc,this);
            if(this._complete) this._complete.call(this.scope ? this.scope : this,event);
        } 
        /**
        * 配置文件加载完成,开始预加载preload资源组。
        */
        private onConfigComplete(event: RES.ResourceEvent): void {
//            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            for(var i = 0;i < this.loadingGroups.length;i++) {
                RES.loadGroup(this.loadingGroups[i],this.loadingGroups.length - i);
            }
//            GameApp.Manager.viewManager.loading.start();
//            GameApp.Manager.viewManager.loading.setLoadingTip(this.loadingGroups[this.loadindex]);
        }
                
        /**
        * preload资源组加载完成
        */
        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            if(event.groupName == this.loadingGroups[this.loadingGroups.length - 1]) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
                if(this.autoRemoveView) {
                    GameApp.Manager.viewManager.loading.removeM();
                }
                if(this._complete) this._complete.call(this.scope ? this.scope : this,event);
            } else {
                this.loadindex++;
//                GameApp.Manager.viewManager.loading.resetPropress(); 
//                GameApp.Manager.viewManager.loading.setLoadingTip(this.loadingGroups[this.loadindex]);
            }
        }
        
        /**
        * 资源组加载出错
        */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            this.onResourceLoadComplete(event);
        }
        
        /**
        * preload资源组加载进度
        */
        private onResourceProgress(event: RES.ResourceEvent): void {
            if(this._progress) this._progress(event);
        }
        public set AutoRemoveView(autoRemoveView:boolean) {
            this.autoRemoveView = autoRemoveView;
        }
        public endLoader():void{
//            if(this.autoRemoveView) {
                if(GameApp.Manager.viewManager.loading){
                    GameApp.Manager.viewManager.loading.resetPropress();
                    GameApp.Manager.viewManager.loading.end();
                    GameApp.Manager.viewManager.loading.remove();
                }
//            }
        }
        public errorLoader(str:string):void{
            if(GameApp.Manager.viewManager.loading) {
                GameApp.Manager.viewManager.loading.error(str);
            }
        }
	}
}
