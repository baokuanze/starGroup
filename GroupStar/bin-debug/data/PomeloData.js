var data;
(function (data) {
    /**
     *
     * @author
     *
     */
    var PomeloData = (function () {
        function PomeloData() {
        }
        var d = __define,c=PomeloData,p=c.prototype;
        PomeloData.sendFlower = 1; //送花
        PomeloData.sendEgg = 2; //送花
        //        public static getStar: number = 3;//同步星星
        PomeloData.opentx = 6;
        PomeloData.triggerHB = 7; //入驻触发红包
        //        public static getGuard: number = 11;//同步守护
        //        public static hitEggs1: number = 12;//系统派发的心（收集心砸蛋玩法）
        PomeloData.medal3 = 12; //第三个勋章；
        PomeloData.hongbao = 13; //发送红包
        PomeloData.hongbaoClick = 14; //点击红包
        PomeloData.sendjijie = 9;
        PomeloData.receive = 16;
        PomeloData.sendGiftCf = 8;
        PomeloData.getGiftCf = 15;
        PomeloData.addLucyStar = 17;
        PomeloData.sendTalk = 11; //发送聊天
        PomeloData.liveInit = 18;
        PomeloData.receiveTalk = 19; //接受聊天；
        PomeloData.medal3receive = 20; //第三个勋章socket接收的值；
        PomeloData.getAndReceiveAnnounceGroup = 21; //收发群宣群；
        return PomeloData;
    }());
    data.PomeloData = PomeloData;
    egret.registerClass(PomeloData,'data.PomeloData');
})(data || (data = {}));
