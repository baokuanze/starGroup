module live {
	/**
	 *
	 * @author 
	 *
	 */
	export class LiveTalkChat extends eui.Component{
        public static _instance: LiveTalkChat;
        public static getInstance(): LiveTalkChat {
            if(!this._instance) {
                this._instance = new LiveTalkChat();
            }
            return this._instance;
        }
    	private scroll1:eui.Scroller;
    	private groupData:eui.Group;
        private arrObj: Array<Object> = [];
        private arr: Array<LiveTalkChatItem> = [];
        private canUpdate: boolean = true;
        private touch: boolean = false;
        private maxlength: number = 50;
        private bmpBack: eui.Rect;
        private isleave: boolean = false;
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/liveChatRoom/LiveTalkChatSkin.exml";
		}
		public childrenCreated():void{
            this.y = egret.MainContext.instance.stage.stageHeight - 420;
            this.scroll1.addEventListener(eui.UIEvent.CHANGE_END,this.viweport_touch_end,this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE,this.viweport_touch_begin,this);
		}
        private viweport_touch_begin(): void {
            if(!this.touch) {
                console.log('viweport_touch_begin');
                this.touch = true;
                this.canUpdate = false;
                egret.Tween.removeTweens(this.scroll1.viewport);
                egret.Tween.removeTweens(this);
            }
        }
        private viweport_touch_end(): void {
            if(this.touch) {
                this.touch = false;
                console.log('viweport_touch_end');
                egret.Tween.removeTweens(this);
                egret.Tween.get(this).wait(2000).call(function() {
                    this.touchend();
                },this);
            }
        }
        private touchend(): void {
            //                this.canUpdate=true;
            if(this.arrObj.length > this.maxlength) {
                for(var i in this.arr) {
                    var del: LiveTalkChatItem = this.arr[i];
                    LiveTalkChatItem.reclaim(del);
                    if(del.parent) {
                        del.parent.removeChild(del);
                    }
                }
                this.arr = [];
                for(var j: number = this.arrObj.length - this.maxlength;j < this.arrObj.length;j++) {
                    var item: LiveTalkChatItem = LiveTalkChatItem.produce();
                    this.groupData.addChild(item);
                    item.validateNow();
                    item.setData(this.arrObj[j]);
//                    item.y = this.arr.length * this.jiange;
                    if(this.arr.length > 0) {
                        item.y = this.arr[this.arr.length - 1].y + this.arr[this.arr.length - 1].getHeight() + 20//this.arr.length * this.jiange;
                    } else {
                        item.y = 0;
                    }
                    this.arr.push(item);
                }
                this.arrObj = [];
                var sv: number = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
                egret.Tween.get(this.scroll1.viewport).to({ scrollV:sv},300).call(function() { this.canUpdate = true; },this);
            } else if(this.arrObj.length > 0) {
                while(this.arrObj.length > 0) {
                    this.addItem(this.arrObj.shift(),false);
                }
                this.validateNow();
                var sv: number = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
                egret.Tween.get(this.scroll1.viewport).to({ scrollV: sv},300).call(function() { this.canUpdate = true; },this);
            } else {
                this.canUpdate = true;
            }
        }
        public update(ct: number): void {
            if(this.canUpdate && !this.isleave) {//
                if(this.arrObj.length > 0) {
                    console.log('additem');
                    this.canUpdate = false;
                    this.addItem(this.arrObj.shift());
                }
            }
        }
        public leave(): void {
            this.isleave = true;
        }
        public come(): void {
            if(this.isleave) {
                this.isleave = false;
                if(this.arrObj.length > 0) {
                    if(this.arrObj.length > this.maxlength) {
                        this.arrObj = this.arrObj.slice(this.arrObj.length - this.maxlength,this.arrObj.length - 1);
                    }
                    while(this.arrObj.length > 0) {
                        this.addItem(this.arrObj.shift(),false);
                    }
                    this.validateNow();
                    //egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 5) * this.jiange },300).call(function() { this.canUpdate = true; },this);
                    var sv: number = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
                    this.scroll1.viewport.scrollV =sv>=0?sv:0;//(this.arr.length - 4) * this.jiange;
                    this.canUpdate = true;
                }
            }
        }
        private addItem(obj: Object,tween: boolean = true): void {
            if(this.arr.length == this.maxlength) {
                var del: LiveTalkChatItem = this.arr.shift();
                LiveTalkChatItem.reclaim(del);
                if(del.parent) {
                    del.parent.removeChild(del);
                }
                for(var i: number = 0;i < this.arr.length;i++) {
                    var up: LiveTalkChatItem = this.arr[i];
//                    up.y = i * this.jiange;
                    if(i==0){
                        up.y=0;
                    }else{
                        up.y = this.arr[i - 1].y+ this.arr[i - 1].getHeight()+20;
                    }
                    console.log('大于10的y:'+i+" "+up.y);
                }
                if(tween) {
//                    this.scroll1.viewport.scrollV = (this.arr.length - 4) * this.jiange;
                    this.setSv();
                }
            }
            var item: LiveTalkChatItem = LiveTalkChatItem.produce();
            this.groupData.addChild(item);
            item.setData(obj);
            //            console.log("addItem:" + obj["name"]);
            this.setY(item);
            this.arr.push(item);
            if(tween) {
                this.validateNow();
                var sv: number = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
                if(sv>=0){
                    egret.Tween.get(this.scroll1.viewport).to({ scrollV:sv},100).call(function() { this.canUpdate = true; },this);
                }else{
                    this.scroll1.viewport.scrollV = 0;
                    this.canUpdate = true;
                }
//                if(this.arr.length >= 4) {
//                    egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 4) * this.jiange },100).call(function() { this.canUpdate = true; },this);
//                } else {
//                    this.scroll1.viewport.scrollV = 0;
//                    this.canUpdate = true;
//                }
            }
        }
        public setY(item:LiveTalkChatItem):void{
            if(this.arr.length > 0) {
                item.y = this.arr[this.arr.length - 1].y + this.arr[this.arr.length - 1].getHeight() + 20//this.arr.length * this.jiange;
            } else {
                item.y = 0;
            }
        }
        public setSv():void{
            var sv: number = this.scroll1.viewport.contentHeight - this.scroll1.viewport.height;
            this.scroll1.viewport.scrollV = sv >= 0 ? sv : 0;//(this.arr.length - 4) * this.jiange;
        }
        public static receiveTalk(obj: Object): void {
            console.log('聊天:',obj);
            if(this._instance)
                this._instance.add(obj);
        }
        public add(obj: Object): void {
            //    		console.log("addMBarrge:",obj);
            if(!this.isleave){
                switch(obj["type"]) {
                    case 1: case 19:
                        this.arrObj.push(obj);
                    break;
                }
            }
        }
        public adds(arr:Array<Object>):void{
            this.clear();
            for(var i in arr){
                this.addItem(arr[i],false);
            }
            this.validateNow();
            this.setSv();
        }
        private setPoint(): void {
            for(var i: number = 0;i < this.arr.length;i++) {
                var item: LiveTalkChatItem = this.arr[i];
                //		        item.y=-(this.arr.length-i)*55;
                //		        item.y
            }
        }
        public clear(): void {
            for(var i: number = 0;i < this.arr.length;i++) {
                var item: LiveTalkChatItem = this.arr[i];
                if(item.parent) {
                    item.parent.removeChild(this);
                }
                LiveTalkChatItem.reclaim(item);
            }
            this.groupData.removeChildren();
            this.arrObj = []; this.arr = [];
            this.touch = false;
            this.canUpdate = true;
        }
	}
}
