module buyTicketActive {
	/**
	 *
	 * @author 
	 *
	 */
	export class AlertContent extends eui.Component{
        private lb1:eui.Label;
        private lb0: eui.Label;
        private lb2: eui.Label;
        private lb3: eui.Label;
        private groupAwards:eui.Group;
        
		public constructor() {
    		super();
            this.skinName = 'src/view/gameUI/buyTicketActive/AlertContentSkin.exml';
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lb0.fontFamily = "Heiti SC";
                this.lb1.fontFamily = "Heiti SC";
                this.lb2.fontFamily = "Heiti SC";
                this.lb3.fontFamily = "Heiti SC";
            }
        }
        public setData(){
            var self: AlertContent = this;
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid +GameApp.Manager.dataManager.bid+ "" + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanResult",{ "user_id": GameApp.Manager.dataManager.uid,'bid': GameApp.Manager.dataManager.bid,sign: sign },function(obj: Object) {
                console.log(obj);
                if(obj["st"] == 1) {
                    for(var i=0;i<obj['data'].length;i++){
                        var award = new buyTicketActive.AwardPerson();
                        award.setData(obj['data'][i]);
                        self.groupAwards.addChild(award);
                    }
                    self.lb3.y = self.groupAwards.y + self.groupAwards.height +40;
                    self.lb3.textFlow = (new egret.HtmlTextParser).parser("请获奖粉友联系" + "<font color= #36a1ff>官方QQ：3409474914(加好友请备注：领取活动奖品)</font>" + "，领取钻石礼包，以及填写邮寄地址以便寄送签名照。" + "<font color= #36a1ff>截止至11月30日</font>" +"，没有加该QQ的获奖粉友视为自动放弃奖励。奖品我们将在统计完成后统一发放，敬请期待！");
                }
            },true,this)
        }
        public clear(){
            while(this.groupAwards.numElements>0){
                var item: buyTicketActive.AwardPerson = <buyTicketActive.AwardPerson>this.groupAwards.getElementAt(this.groupAwards.numElements - 1);
                if(item.parent){
                    item.parent.removeChild(item);
                }
            }
        }
	}
}
