module flower {
	/**
	 *
	 * @author 
	 *
	 */
	export class FlowerItem extends eui.Component{
        public fid: number = 0;
        public type: number = 0;
        public canSend:boolean=true;
        public click:number=0;
        public lastcount:number=-1;//赠送剩余次数
        public price: number = 0;
        private bmpBack:eui.Rect;
    	private bmpIcon:eui.Image;
    	private bmpLian:eui.Image;
    	private bmpStar:eui.Image;
    	private lblStar:eui.Label;
        private lblTime:eui.Label;
        private lblIntimate:eui.Label;
        
        private timeVar: any;
        public cd: number = 0;
        private task_time: number = 0;
        private task_timeJilu: number = 0;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/flower/FlowerItemSkin.exml";
            this.touchEnabled=true;
            this.touchChildren=true;
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblStar.fontFamily = "Heiti SC";
                this.lblTime.fontFamily = "Heiti SC";
                this.lblIntimate.fontFamily = "Heiti SC";
            }
		    this.bmpBack.alpha=0;
            this.bmpLian.visible = false;
            this.lblTime.visible=false;
            this.lblStar.visible=false;
		}
        public on(): void {
            this.bmpBack.alpha=.7;
        }
        public off(): void {
            this.bmpBack.alpha = 0;
            this.bmpLian.source="p_lianji";
        }
        public setLight():void{
            this.bmpLian.source = "p_lianji1";
        }
        public setloW():void{
            this.bmpLian.source = "p_lianji";
        }
		public setData(obj:Object):void{
            this.fid = obj["id"];
            this.type = obj["type"];
            this.lblIntimate.text = "热度+" + obj["intimate"];
            this.lblStar.text = obj["price"];
            this.price = obj["price"];
            this.click=obj["click"];
            this.bmpIcon.source ="p_gift"+this.fid+"";
            this.lastcount=obj["last"];
            if(this.click>0){
                this.bmpLian.visible=true;
            }
            this.lblStar.visible = true; this.lblTime.visible = false; 
            switch(this.fid){
                case 1:this.lblStar.visible=false;this.lblTime.visible=true; if(obj["last"] != 0) { this.lblTime.text = "免费"; } else { this.lblTime.text = "今日已送完";}this.bmpStar.visible=false; break;
            }
		}
        public setDJS(ct: number): void {
            if(this.timeVar)
                clearInterval(this.timeVar);
            var self: FlowerItem = this;
            this.canSend = false;
            this.task_time = ct;
            this.task_timeJilu = new Date().getTime();
            this.lblTime.visible = true;
            this.lblTime.text = Tools.getInstance().formatTime2(ct);
            this.cd=ct;
            this.timeVar = setInterval(function() {
                var NowTime = new Date().getTime();
                var t: number = self.task_time - (NowTime - self.task_timeJilu);
                self.cd=t;
                if(t <= 0) {
                    self.djsEnd();
                } else {
                    self.lblTime.text = Tools.getInstance().formatTime2(t);
                }
            },980);
        }
        public djsEnd(): void {
            if(this.timeVar)
                clearInterval(this.timeVar);
            if(this.lastcount!=0){
                this.lblTime.text = "免费";
                flower.FlowerUI.getInstance().btnSend.setState(1);
            }else{
                this.lblTime.text = "今日已送完";
            }
            this.canSend = true;
        }
	}
}
