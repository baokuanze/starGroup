module view.loader {
    /**
    *
    * @author 
    *
    */
    export class Loading extends common.BaseView {
                
        private loadingUI:MainLoading;
        private moduleLoading:ModuleLoading;
//        private loadingmodule:
//        private skinMap:Object;
        private type: string;
        private tips = {
              "main":"正在加载游戏资源...",
//            "wj":"正在加载武将资源包...",
              "public":"正在加载公共资源包...", 
//            "server":"正在读取数据...",
//            "fight":"正在加载战斗资源..."
        }
                
        public constructor(viewManager) {
            super(viewManager);
//            this.skinMap = {
//                "1": view.loader.MainLoading
//            };
        }
        public setStep(): void { 
            this.type = "step";
//            this.loadingUI.skinName = ztc.view.loader.StepLoadingSkin;
        }
        public show(): void { 
            if(!this.loadingUI) {
                this.loadingUI = new MainLoading();
            }
            this.BottomUIStage.addChild(this.loadingUI);
            //this.setLoadingTip("正在加载游戏资源...");
        }
        public error(str:string):void{
            this.loadingUI.error(str);
        }
        public showModule():void{
            if(!this.moduleLoading){
                this.moduleLoading=new ModuleLoading();
            }
            this.moduleLoading.show();
            this.UIStage.addChild(this.moduleLoading);
        }
        public remove(): void { 
            if(this.loadingUI&&this.loadingUI.parent)
            this.BottomUIStage.removeChild(this.loadingUI);
            if(this.moduleLoading&&this.moduleLoading.parent){
                this.moduleLoading.clear();
                this.moduleLoading.parent.removeChild(this.moduleLoading);
            }
        }
        public removeM():void{
            if(this.moduleLoading && this.moduleLoading.parent) {
                this.moduleLoading.clear();
                this.moduleLoading.parent.removeChild(this.moduleLoading);
            }
        }
        public setLoadingTip(g: string): void { 
            if(!this.loadingUI||this.type=="step") return;
            var tip: string = this.tips[g];
            if(tip) {
                this.loadingUI.setLoadingName(tip);
            } else { 
                this.loadingUI.setLoadingName("正在加载游戏资源...");         
            }
        }
                
        public setProgress(event:RES.ResourceEvent):void{
            console.log(event,'2222');
            if(!this.loadingUI) return;
            
            this.loadingUI.setProgress(event.itemsLoaded, event.itemsTotal);
        }
        public start(): void { 
            if(this.type != "step") {
                if(this.loadingUI) this.loadingUI.start();
            }
        }
        public end(): void { 
            if(this.type != "step") {
                if(this.loadingUI) this.loadingUI.end();
            }
        }
        public resetPropress(): void
        { 
//            this.loadingUI.resetProgress();
        }
    }
}
