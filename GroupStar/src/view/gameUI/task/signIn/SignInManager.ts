module signIn {
	/**
	 *
	 * @author 
	 *
	 */
	    export class SignInManager extends common.BaseView {
        private loaded = false;
        public obj: Object;
        public viewManager: view.ViewManager;
        private type: number;
        public signIn:task.SignIn;
        public static updataObj:Object;
        private diaNumber:number;
        private expNumber:number;
        
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
            this.viewManager = viewManager;
        }
        
        public show(type:number): void {
            this.type = type;
            if(!this.loaded) {
                this.loading();
            } else {
                this.initUI();
            }
        }
        
        private initUI(): void {
            var self = this;
            if(!this.signIn){
                this.signIn = new task.SignIn();
            }
            var n = this.signIn.group_signPersonIcon.numElements;
            console.log(n,"n")
            while(this.signIn.group_signPersonIcon.numElements > 0) {
                var iteme: task.SignPersonIcon = <task.SignPersonIcon>this.signIn.group_signPersonIcon.getElementAt(this.signIn.group_signPersonIcon.numElements - 1);
                task.SignPersonIcon.reclaim(iteme);
                if(iteme.parent) {
                    iteme.parent.removeChild(iteme);
                }
            }
            
            this.BottomUIStage.addChild(this.signIn);
            this.signIn.type = this.type;
            this.signIn.setData(SignInManager.updataObj);

            if(SignInManager.updataObj["isSigned"] == true) {
                this.diaNumber = this.signIn.diaNumber ? this.signIn.diaNumber : SignInManager.updataObj["award"];
                this.expNumber = this.signIn.expNumber ? this.signIn.expNumber : SignInManager.updataObj["signInfo"]["each_sign_group_exp"];
                this.signIn.updatePOsAndStay(this.diaNumber,this.expNumber);
            }
            
            if(SignInManager.updataObj["isSigned"] == false){
                socketio.IoConnect.getInstance().sendMessage(10,{},function(data: Object) {
                    console.log(data,"签到返回数据");
                    if(data["st"] == 1) {
                        self.signIn.signOK(data["data"]); 
                        SignInManager.updataObj["isSigned"] = true;
                    }
                },this);
            }
            
        }
        
        public static init(obj:Object):void{
            this.updataObj = obj;
            console.log(obj,"---------初始化");
        }
        
        public static setData(obj:Object):void{
            if(obj["type"]!=6){
                return;
            }
            var self = this;
            var add:boolean = false 
            console.log(obj,"--------跟新的值");
            
            if(!GameApp.Manager.viewManager.sign.signIn){
                console.log("不在的情况");
            }else{
                GameApp.Manager.viewManager.sign.signIn.setUpdateValue(obj);
                console.log("在的情况");
            }
            
            if(obj["group_openid"] != GameApp.Manager.dataManager.group_openid) {

            }else{
            
                this.updataObj["signedUserArray"].push({
                    user_pic: obj["user_pic"],
                    user_id: obj["user_id"] ? obj["user_id"] : obj["uid"]
                });

                if(obj["isSignedLongest"]) {
                    signIn.SignInManager.updataObj["signedLongest"]["user_id"] = obj["user_id"] ? obj["user_id"] : obj["uid"];
                    signIn.SignInManager.updataObj["signedLongest"]["num"] = obj["userSignedNum"];
                    signIn.SignInManager.updataObj["signedLongest"]["user_pic"] = obj["user_pic"];
                    signIn.SignInManager.updataObj["signedLongest"]["user_name"] = obj["user_name"];
                }

                if(obj["isTodaySignedCrit"]) {
                    signIn.SignInManager.updataObj["signedCrit"]["user_id"] = obj["user_id"] ? obj["user_id"] : obj["uid"];
                    signIn.SignInManager.updataObj["signedCrit"]["user_pic"] = obj["user_pic"];
                    signIn.SignInManager.updataObj["signedCrit"]["user_name"] = obj["user_name"];
                }

                if(obj["isTodaySignedFrist"]) {
                    signIn.SignInManager.updataObj["signedFirst"]["user_id"] = obj["user_id"] ? obj["user_id"] : obj["uid"];
                    signIn.SignInManager.updataObj["signedFirst"]["user_pic"] = obj["user_pic"];
                    signIn.SignInManager.updataObj["signedFirst"]["user_name"] = obj["user_name"];
                }
            }
        }
        
        public hide(): void {
            if(this.signIn.parent) {
                this.BottomUIStage.removeChild(this.signIn);
                this.signIn.clear();
            }
        }
        
        private loading(): void {
            var self = this;
//            GameApp.Manager.controllerManager.loader.moduleLoading(["public"],this.load_end,this);
            this.initUI();
        }
        
        private load_end(): void {
            this.loaded = true;
            this.initUI();
        }
	}
}
