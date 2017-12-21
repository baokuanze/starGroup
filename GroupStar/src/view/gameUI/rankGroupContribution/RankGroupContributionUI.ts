module rankGroupContribution {
	/**
	 *
	 * @author 
	 *
	 */
	export class RankGroupContributionUI extends eui.Component {
        private btnClose: eui.Image;
        private scroll1: eui.Scroller;
        private groupData: eui.Group;
        private groupBottom:eui.Group;
        private txt1: eui.Label;
        private lbl1:eui.Label;
        private gxrankArr:Array<RankGroupItem>=[];
        private gxrank1Arr: Array<RankGroupItem1> = [];
        public bo:boolean=false;
        public type:number;
        
        private currentGroup: number = 0; //当前数据默认第一组
        private disNum: number = 10;
        private index: number = 0;
        private arr: Array<eui.Component> = [];
        private send:boolean=false;
       
        private static xunGroupArr:Array<Object> = [];
        private static obj: Object;
        private xuanGroup:groupXuan.GroupXuan;
        private xuanGroup1: groupXuan.GroupXuan;
        private timer:egret.Timer;
        private next:number;
        private r:number;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/rankGroupContribution/RankGroupContributionUISkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.txt1.fontFamily = "Heiti SC"; 
            }
            this.scroll1.height = egret.MainContext.instance.stage.stageHeight  - 100;
            this.groupBottom.y=egret.MainContext.instance.stage.stageHeight-152;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE,this.change,this);
		}
		
        public static groupsArr(obj:Object):void{
            rankGroupContribution.RankGroupContributionUI.xunGroupArr = obj["valid"];
		}
		
		public static addxuanGroups(obj:Object):void{
            rankGroupContribution.RankGroupContributionUI.xunGroupArr.push(obj);
		}
		
        public change(): void {
            if(this.scroll1.viewport && this.arr.length > 0) {
                var last: eui.Component = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
                var next: eui.Component = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];
              
//                console.log(this.scroll1.viewport.scrollV + " " + (last.y) + " " + (next.y - this.scroll1.height));
                if(this.scroll1.viewport.scrollV >= next.y - this.scroll1.height) {
                    if(this.index < this.arr.length / this.disNum - 1) {
                        this.index++;
                        this.dis();
                    }else{
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
            if(!this.send){
                this.send=true;
                var self = this;
                this.currentGroup++;
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.bid_save + "&");
                Util.sendJson1("http://sf.xintiao100.com" + "/getGroupContributionRankList",{ bid: GameApp.Manager.dataManager.bid_save,index: this.currentGroup,sign: sign },function(obj: Object) {
                    self.send=false; 
                    if(obj['st'] == 1) {
                        self.add(obj);
                    }
                },true,this);
            }
        }
        private dis(): void {
            var min: number = this.index == 0 ? 0 : this.index * this.disNum - this.disNum;
            var max: number = (this.index + 1) * this.disNum;
//           console.log("index:" + this.index + " 显示 min:" + min + " max:" + max);
            for(var i: number = 0;i < this.arr.length;i++) {
                var item: eui.Component = this.arr[i];
                if(i >= min && i < max) {
                    this.groupData.addChild(item);
//                    console.log('add' + i);
                } else {
                    if(item.parent) {
                        item.parent.removeChild(item);
//                        console.log('删除' + i);
                    }
                }
            }
        }
		public setData(_obj:Object):void{
                var self: RankGroupContributionUI = this;
                var obj: Object = _obj["data"];
                this.add(_obj);
                
                var len = rankGroupContribution.RankGroupContributionUI.xunGroupArr.length;
                if(len> 0){
                    self.r = self.r || 2;
                    self.next = self.next || 0;
                    if(!self.xuanGroup && !self.xuanGroup1){
                        self.xuanGroup = new groupXuan.GroupXuan();
                        self.xuanGroup.x = 0; self.xuanGroup.y = 100;
                        self.scroll1.y = 260;
                        self.xuanGroup.setData(rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next]);
                        self.addChild(self.xuanGroup);
                        self.next += 1;
                        if(self.next >= len) {
                            self.next = 0;
                        }
                    }
                    
                    self.timer = new egret.Timer(3000,0);
                    self.timer.addEventListener(egret.TimerEvent.TIMER, function(){
                        var len1 = rankGroupContribution.RankGroupContributionUI.xunGroupArr.length;
                        if(len1 > 0){
                            var time = new Date().getTime();
                            if(rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next] && time > rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next]['end_time']) {
                                rankGroupContribution.RankGroupContributionUI.xunGroupArr.splice(self.next,1);
                            } else {
                                if(len1 != 1) {
                                    if(self.r == 2) {
                                        self.xuanGroup1 = new groupXuan.GroupXuan();
                                        self.xuanGroup1.x = 750;
                                        self.xuanGroup1.y = 100;
                                        self.xuanGroup1.setData(rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next]);
                                        self.addChild(self.xuanGroup1);
                                        self.next += 1;
                                        if(self.next >= len1) {
                                            self.next = 0;
                                        }
                                        egret.Tween.get(self.xuanGroup).to({ x: -750 },1000).call(function() {
                                            if(self.xuanGroup.parent) {
                                                self.xuanGroup.parent.removeChild(self.xuanGroup);
                                                self.xuanGroup = null;
                                            }
                                        });
                                        egret.Tween.get(self.xuanGroup1).to({ x: 0 },1000).call(function() { });
                                        self.r = 1;
                                    } else {
                                        self.xuanGroup = new groupXuan.GroupXuan();
                                        self.xuanGroup.x = 750;
                                        self.xuanGroup.y = 100;
                                        self.xuanGroup.setData(rankGroupContribution.RankGroupContributionUI.xunGroupArr[self.next]);
                                        self.addChild(self.xuanGroup);
                                        self.next += 1;
                                        if(self.next >= len1) {
                                            self.next = 0;
                                        }
                                        egret.Tween.get(self.xuanGroup1).to({ x: -750 },1000).call(function() {
                                            if(self.xuanGroup1.parent) {
                                                self.xuanGroup1.parent.removeChild(self.xuanGroup1);
                                                self.xuanGroup1 = null;
                                            }
                                        });
                                        egret.Tween.get(self.xuanGroup).to({ x: 0 },1000).call(function() { });
                                        self.r = 2;
                                    }
                                }
                            }
                        }else{
                            self.timer.stop();
                            if(self.r == 2){
                                if(self.xuanGroup.parent){
                                    self.xuanGroup.parent.removeChild(self.xuanGroup);
                                }
                            }else{
                                if(self.xuanGroup1.parent){
                                    self.xuanGroup1.parent.removeChild(self.xuanGroup1);
                                }
                            }
                            self.scroll1.y = 100;
                        }
                    },self);
                    self.timer.start();
                }else{
                    self.scroll1.y = 100;
                }
		}
		
		
		
		public add(_obj:Object):void{
            var obj: Object = _obj["data"];
//            console.log('add:',obj);
            var arrL:number=this.arr.length;
            for(var i: number = 0;i < obj["list"].length;i++) {
                var obj1: Object = obj["list"][i];
                if(obj1["group_openid"]==GameApp.Manager.dataManager.group_openid){
                    var item1: RankGroupItem1 = RankGroupItem1.produce();
                    this.groupData.addChild(item1);
                    item1.y = (arrL * 125) + i * (125);
//                    item1.setData(obj1);
                    this.arr.push(item1);
                    this.gxrank1Arr.push(item1);
                }else{
                    var item: RankGroupItem = RankGroupItem.produce();
                    this.groupData.addChild(item);
                    item.y = (arrL * 125) + i * (125);
//                    item.setData(obj1);
                    this.arr.push(item);
                    this.gxrankArr.push(item);
                }
            }
            for(var i: number = this.arr.length - 1;i >= arrL;i--) {
                var obj1: Object = obj["list"][i-arrL];
                console.log(i);
                if(obj1["group_openid"] == GameApp.Manager.dataManager.group_openid) {
                    var item1: RankGroupItem1 =<RankGroupItem1>this.arr[i];
                    item1.setData(obj1);
                } else {
                    var item: RankGroupItem = <RankGroupItem>this.arr[i];
                    item.setData(obj1);
                }
            }
            this.dis();
		}
		public clear():void{
            while(this.gxrankArr.length > 0) {
                var item: RankGroupItem = this.gxrankArr.pop();
                RankGroupItem.reclaim(item);
                if(item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while(this.gxrank1Arr.length > 0) {
                var item1: RankGroupItem1 = this.gxrank1Arr.pop();
                RankGroupItem1.reclaim(item1);
                if(item1.parent) {
                    item1.parent.removeChild(item1);
                }
            }
            this.gxrankArr=[];
            this.gxrank1Arr=[];
            this.arr=[];
            this.currentGroup=0;
            this.groupData.scrollV=0;
            this.index=0;
		}
		public close():void{
    		if(this.type==0){
                GameApp.Manager.controllerManager.gameMainController.show();
    		}else{
                GameApp.Manager.controllerManager.taskController.show();
    		}
    		if(this.timer){
                this.timer.stop();
    		}
            GameApp.Manager.controllerManager.rankGroupContributionController.hide();
		}
	}
}
