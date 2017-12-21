module rankUserContribution {
	/**
	 *
	 * @author 
	 *
	 */
    export class RankUserContributionUI extends eui.Component {
        private btnClose: eui.Image;
        private scroll1: eui.Scroller;
        private groupData: eui.Group;
        private groupBottom: eui.Group;
        private txt1: eui.Label;
        private lbl1: eui.Label;
        private gxrankArr: Array<RankUserContributionItem> = [];
        private gxrank1Arr: Array<RankUserContributionItem1> = [];

        private currentGroup: number = 0; //当前数据默认第一组
        private disNum: number = 10;
        private index: number = 0;
        private arr: Array<eui.Component> = [];
        private send: boolean = false;
        
        public bid: string;
        public group_openid: string;
        public constructor() {
            super();
            this.skinName = "src/view/gameUI/rankUserContribution/RankUserContributionUISkin.exml";
        }
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.txt1.fontFamily = "Heiti SC";
            }
            this.scroll1.height = egret.MainContext.instance.stage.stageHeight - 100 ;
            this.groupBottom.y = egret.MainContext.instance.stage.stageHeight - 152;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE,this.change,this);
        }
        public change(): void {
            if(this.scroll1.viewport && this.arr.length > 0) {
                var last: eui.Component = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
                var next: eui.Component = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];

                console.log(this.scroll1.viewport.scrollV + " " + (last.y) + " " + (next.y - this.scroll1.height));
                if(this.scroll1.viewport.scrollV >= next.y - this.scroll1.height) {
                    if(this.index < this.arr.length / this.disNum - 1) {
                        this.index++;
                        this.dis();
                    } else {
                        this.ajaxPost();
                    }
                }

                if(this.scroll1.viewport.scrollV < last.y) {
                    if(this.index > 0) {
                        this.index--;
                        this.dis();
                    }
                }
            }
        }
        public ajaxPost(): void {
            if(!this.send) {
                this.send = true;
                var self = this;
                this.currentGroup++;
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + this.bid + this.group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getGroupUserContributionRankList",{ user_id: GameApp.Manager.dataManager.uid,bid: this.bid,group_openid: this.group_openid,index: this.currentGroup,sign: sign },function(obj: Object) {
                    self.send = false;
                    if(obj['st'] == 1) {
                        self.add(obj);
                    }
                },true,this);
            }
        }
        private dis(): void {
            var min: number = this.index == 0 ? 0 : this.index * this.disNum - this.disNum;
            var max: number = (this.index + 1) * this.disNum;
            console.log("index:" + this.index + " 显示 min:" + min + " max:" + max);
            for(var i: number = 0;i < this.arr.length;i++) {
                var item: eui.Component = this.arr[i];
                if(i >= min && i < max) {
                    this.groupData.addChild(item);
                    console.log('add' + i);
                } else {
                    if(item.parent) {
                        item.parent.removeChild(item);
                        console.log('删除' + i);
                    }
                }
            }
        }
        public setData(_obj: Object): void {
            var obj: Object = _obj["data"];
//            var selfItem: RankUserContributionItem1 = RankUserContributionItem1.produce();
//            this.groupBottom.addChild(selfItem);
//            selfItem.setData(obj["self"]);
//            selfItem.y = 2;
            this.add(_obj);
        }
        public add(_obj: Object): void {
            var obj: Object = _obj["data"];
            console.log('add:',obj);
            var arrL: number = this.arr.length;
            for(var i: number = 0;i < obj["list"].length;i++) {
                var obj1: Object = obj["list"][i];
                var item: RankUserContributionItem = RankUserContributionItem.produce();
                this.groupData.addChild(item);
                item.y = (arrL * 125) + i * (125);
                item.bid=this.bid;
                item.group_openid=this.group_openid;
                item.setData(obj1);
                this.arr.push(item);
                this.gxrankArr.push(item);
            }
            this.dis();
        }
        public clear(): void {
                this.arr=[];
                while(this.gxrankArr.length > 0) {
                    var item: RankUserContributionItem = this.gxrankArr.pop();
                    RankUserContributionItem.reclaim(item);
                    if(item.parent) {
                        item.parent.removeChild(item);
                    }
                }
                this.gxrankArr=[];
        }
        public close(): void {
            GameApp.Manager.controllerManager.rankGroupContributionController.show(-1);
            GameApp.Manager.controllerManager.rankuserContributionController.hide();
        }
    }
}
