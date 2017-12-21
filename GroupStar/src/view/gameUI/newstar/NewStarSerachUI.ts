module newstar {
	/**
	 *
	 * @author 
	 *
	 */
	export class NewStarSerachUI extends eui.Component{
    	private scroll1:eui.Scroller;
    	private groupData:eui.Group;
    	private lbl0:eui.Label;
    	private lbl1:eui.Label;
    	private lbl2:eui.Label;
        private lblStarName:eui.EditableText;
        private groupTip:eui.Group;
        private btnSend:eui.Image;
        private btnBack:eui.Image;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/newstar/NewStarSerachUISkin.exml";
		}
		public childrenCreated():void{
    		var self:NewStarSerachUI=this;
    		this.scroll1.height=this.stage.stageHeight-290-50;
            if(Tools.getInstance().isIphone()) {
                this.lbl0.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lblStarName.fontFamily = "Heiti SC";
            }
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_IN,function() {
                if(self.lblStarName.text == "请输入明星姓名或组合全称") {
                    self.lblStarName.text = "";
                    self.lblStarName.textColor = 0x14b8f6;
                }
            },this);
            this.lblStarName.addEventListener(egret.FocusEvent.FOCUS_OUT,function() {
                if(self.lblStarName.text == "" || self.lblStarName.text =="请输入明星姓名或组合全称") {
                    self.lblStarName.text = "请输入明星姓名或组合全称";
                    self.lblStarName.textColor = 0xbcd5df;
                }else{
                    self.serach(self.lblStarName.text);
                }
            },this);
            this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.controllerManager.newStarController.hideSerach();
                GameApp.Manager.controllerManager.newStarController.show();
            },this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.controllerManager.newStarController.hideSerach();
                GameApp.Manager.viewManager.starPageManager.show();
            },this);
		}
		public serach(_name:string):void{
            var self: NewStarSerachUI = this;
		    if(_name){
                var name: string = window["decToHex"](_name)
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/searchStar",{ user_id: GameApp.Manager.dataManager.uid,name: name,sign: sign },function(obj: Object) {
                    self.clearData();
                    if(obj["st"] == 1) {
                        this.setData(obj);
                    } else {
                        self.groupTip.visible = true;
                        self.lbl1.text = "很遗憾,暂无“" + self.lblStarName.text + "”";
                    }
                },true,this);  
		    }
		}
        public setData(obj: Object): void {
            var list: Array<Object> = obj["stars_list"];
            if(list.length>0){
                this.groupTip.visible = false;
                for(var i in list) {
                    var item: starPage.StarPageItem = new starPage.StarPageItem();
                    this.groupData.addChild(item);
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.headTap,this);
                    //		        item.setData(list[i]);
                }
                for(var j = list.length - 1;j >= 0;j--) {
                    var item: starPage.StarPageItem = <starPage.StarPageItem>this.groupData.getElementAt(j);
                    item.setData(list[j]);
                }
            }else{
                this.groupTip.visible = true;
                this.lbl1.text = "很遗憾,暂无“" + this.lblStarName.text + "”";
            }
        }
        private headTap(e: egret.TouchEvent): void {
            var item: starPage.StarPageItem = e.currentTarget;
            GameApp.Manager.dataManager.bid = item.bid;
            console.log("选择:" + item.bid);
            GameApp.Manager.dataManager.topEnter = 2;   //入驻界面不能有排名
            GameApp.Manager.controllerManager.newStarController.hideSerach();
            GameApp.Manager.controllerManager.start();
        }
		private clearData():void{
            while(this.groupData.numElements > 0) {
                var item: starPage.StarPageItem = <starPage.StarPageItem>this.groupData.getElementAt(this.groupData.numElements - 1);
                if(item.parent) {
                    item.parent.removeChild(item);
                }
            }
		}
		public clear():void{
            this.lblStarName.text ="请输入明星姓名或组合全称";
            this.lblStarName.textColor = 0xbcd5df;
            this.clearData();
            this.groupTip.visible=false;
		}
		public close():void{
		    GameApp.Manager.controllerManager.newStarController.hideSerach();
		    GameApp.Manager.viewManager.starPageManager.show();
		}
	}
}
