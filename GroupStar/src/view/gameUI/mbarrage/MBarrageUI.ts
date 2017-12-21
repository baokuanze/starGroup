module mbarrage {
	/**
	 *
	 * @author 
	 *
	 */
	export class MBarrageUI extends eui.Component{
    	private arrObj:Array<Object>=[];
    	private tipObj:Object;
    	private canTip:boolean=false;
    	private arr:Array<MBarrageItem>=[];
    	private groupData:eui.Group;
        private groupTip:eui.Group;
    	private scroll1:eui.Scroller;
    	private lblTip:eui.Label;
        private lblTip1: eui.Label;
        private lblTip_1: eui.Label;
        private lblTip1_1: eui.Label;
        private btn_Tip:eui.Rect;
        private bmpTip:eui.Image;
    	private canUpdate:boolean=true;
    	private touch:boolean=false;
    	private maxlength:number=10;
    	private jiange:number=50;
        private bmpBack:eui.Rect;
        private isleave:boolean=false;
        public constructor() {
    		super();
            this.skinName = "src/view/gameUI/mbarrage/MBarrageUISkin.exml";
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lblTip.fontFamily = "Heiti SC";
                this.lblTip1.fontFamily = "Heiti SC";
                this.lblTip_1.fontFamily = "Heiti SC";
                this.lblTip1_1.fontFamily = "Heiti SC";
            }
		    this.y=egret.MainContext.instance.stage.stageHeight-420;
//		    this.scroll1.viewport.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.viweport_touch_begin,this);
//            this.scroll1.viewport.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.viweport_touch_move,this);
//            this.groupData.addEventListener(egret.TouchEvent.TOUCH_END,this.viweport_touch_end,this);
//            this.scroll1.viewport.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.viweport_release_outside,this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE_END,this.viweport_touch_end,this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE,this.viweport_touch_begin,this);
            this.bmpTip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bmpTip_tap,this);
            this.btn_Tip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.btnTip_tap,this);
//            this.groupData.addEventListener(egret.TouchEvent.TOUCH_END,function(){'touchend'},this);
		}
		private bmpTip_tap(e:egret.Event):void{
    		if(this.tipObj["type"]==3){
                GameApp.Manager.viewManager.gameMainUI.mainUI.disZC(this.tipObj,{ head_img: this.tipObj["head_img"]});
            }
		    e.stopPropagation();
		}
        private btnTip_tap(e:egret.Event):void{
//            if(!Tools.getInstance().isIphone()) {
            if(this.tipObj && this.tipObj["group_openid"]!=GameApp.Manager.dataManager.group_openid){
                    system.GroupJoin.join(this.tipObj["group_openid"]);
                }
//            }
        }
        private viweport_touch_begin():void{
            if(!this.touch){
                console.log('viweport_touch_begin');
                this.touch=true;
                this.canUpdate=false;
                egret.Tween.removeTweens(this.scroll1.viewport);
                egret.Tween.removeTweens(this);
            }
        }
//        private viweport_touch_move():void{
//            console.log('viweport_touch_move');
//            if(!this.touch){
//                this.touch = true;
//                this.canUpdate = false;
//                egret.Tween.removeTweens(this.scroll1.viewport);
//                egret.Tween.removeTweens(this);
//            }
//        }
        private viweport_touch_end(): void {
            if(this.touch){
                this.touch = false;
                console.log('viweport_touch_end');
                egret.Tween.removeTweens(this);
                egret.Tween.get(this).wait(2000).call(function(){
                    this.touchend();
                },this);
            }
        }
        private viweport_release_outside(): void {
            if(this.touch){
                this.touch = false;
                console.log('viweport_release_outside');
                egret.Tween.removeTweens(this);
                egret.Tween.get(this).wait(2000).call(function() {
                    this.touchend();
                },this);
            }
        }
        private touchend():void{
                //                this.canUpdate=true;
            if(this.arrObj.length > this.maxlength) {
                for(var i in this.arr) {
                    var del: MBarrageItem = this.arr[i];
                    MBarrageItem.reclaim(del);
                    if(del.parent) {
                        del.parent.removeChild(del);
                    }
                }
                this.arr = [];
                for(var j: number = this.arrObj.length - this.maxlength ;j < this.arrObj.length;j++) {
                    var item: MBarrageItem = MBarrageItem.produce();
                    this.groupData.addChild(item);
                    item.validateNow();
                    item.setData(this.arrObj[j]);
                    item.y = this.arr.length * this.jiange;
                    this.arr.push(item);
                }
                this.arrObj=[];
                egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 4) * this.jiange },300).call(function() { this.canUpdate = true; },this);
            } else if(this.arrObj.length>0){
                while(this.arrObj.length > 0) {
                    this.addItem(this.arrObj.shift(),false);
                }
                egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 4) * this.jiange },300).call(function() { this.canUpdate = true; },this);
            }else{
                this.canUpdate=true;
            }
        }
		public update(ct:number):void{
//    		console.log("updata----")
            if(this.canUpdate && !this.isleave) {//
    		    if(this.arrObj.length>0){
    		        this.canUpdate=false;
    		        this.addItem(this.arrObj.shift());
		        }
                this.addTip();
		    }
		}
		public leave():void{
		    this.isleave=true;
		}
		public come():void{
    		if(this.isleave){
                this.isleave = false;
                if(this.arrObj.length>0){
                    if(this.arrObj.length>this.maxlength){
                        this.arrObj = this.arrObj.slice(this.arrObj.length - this.maxlength,this.arrObj.length-1);
                    }
                    while(this.arrObj.length > 0) {
                        this.addItem(this.arrObj.shift(),false);
                    }
                    //egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 5) * this.jiange },300).call(function() { this.canUpdate = true; },this);
                    this.scroll1.viewport.scrollV = (this.arr.length - 4) * this.jiange;
                    this.canUpdate = true;
                }
                this.addTip();
            }
		}
		private addItem(obj:Object,tween:boolean=true):void{
            if(this.arr.length == this.maxlength) {
                var del: MBarrageItem = this.arr.shift();
                MBarrageItem.reclaim(del);
                if(del.parent) {
                    del.parent.removeChild(del);
                }
                for(var i: number = 0;i < this.arr.length;i++) {
                    var up: MBarrageItem = this.arr[i];
                    up.y = i * this.jiange;
                }
                if(tween){
                    this.scroll1.viewport.scrollV = (this.arr.length - 4) * this.jiange;
                }
            }
            var item: MBarrageItem = MBarrageItem.produce();
            this.groupData.addChild(item);
            item.setData(obj);
//            console.log("addItem:" + obj["name"]);
            item.y = this.arr.length * this.jiange;
            this.arr.push(item);
            if(tween){
                if(this.arr.length >= 4) {
                    egret.Tween.get(this.scroll1.viewport).to({ scrollV: (this.arr.length - 4) * this.jiange},100).call(function(){this.canUpdate=true;},this);
                } else {
                    this.scroll1.viewport.scrollV = 0;
                    this.canUpdate = true;
                }
            }
		}
		private addTip():void{
		    if(this.canTip){
                console.log("addTip:",this.tipObj);
                var newName: string = window["hexToDec"](this.tipObj["group_name"]);
                var addlen:number = window["Emoji"]["emojiLength"](newName) * 23;
               
                switch(this.tipObj["type"]){
                    case 3:
                        this.lblTip_1.textFlow = (new egret.HtmlTextParser).parser("<font color=#ffffff>众筹成功</font>");
                        this.lblTip1_1.textFlow = (new egret.HtmlTextParser).parser("<font color=#000000>众筹成功</font>");
                        if(Tools.getInstance().isIphone()) {
                            this.lblTip.text = newName;
                            this.lblTip1.text = newName;
                            this.validateNow();
                            addlen = window["Emoji"]["emojiLength"](newName) * 23;
                            this.lblTip_1.x = this.lblTip.x + this.lblTip.textWidth + addlen + 5;
                            this.lblTip1_1.x=this.lblTip_1.x+1
                            this.groupTip.x = this.lblTip_1.x + this.lblTip_1.textWidth + 10;
                        } else {
                            this.lblTip.textFlow = (new egret.HtmlTextParser).parser(window["Emoji"]["emojiReplace"](newName));
                            this.lblTip1.text = this.lblTip.text;
                            this.validateNow();
                            this.lblTip_1.x = this.lblTip.x + this.lblTip.textWidth + addlen + 5;
                            this.lblTip1_1.x = this.lblTip_1.x + 1
                            this.groupTip.x = this.lblTip_1.x + this.lblTip_1.textWidth + 10;
                          
                        }
                        this.bmpTip.source = "zfdy_font"+ this.tipObj["crowdfunding_id"];
                        this.bmpTip.touchEnabled=true;
                    break;
                    case 4:
                        if(Tools.getInstance().isIphone()) {
                            this.lblTip.text = newName;
                            this.lblTip1.text = newName;
                            this.validateNow();
                            addlen = window["Emoji"]["emojiLength"](newName) * 23;
                            this.groupTip.x = this.lblTip.x + this.lblTip.textWidth + addlen + 10;
                        } else {
                            this.lblTip.textFlow = (new egret.HtmlTextParser).parser(window["Emoji"]["emojiReplace"](newName));
                            this.lblTip1.text = this.lblTip.text;
                            this.validateNow();
                            this.groupTip.x = this.lblTip.x + this.lblTip.textWidth + 10;
                            this.lblTip1.x = this.lblTip.x + 1;
                        }
                        this.bmpTip.source = "p1_jjok";
                        this.bmpTip.touchEnabled = false;
                        
                    break;
                }
                this.canTip=false;
		    }
		}
		public add(obj:Object):void{
    		console.log("addMBarrge:",obj);
    		switch(obj["type"]){
                case 3: case 4: 
    		        this.tipObj=obj;
    		        this.canTip=true;
                break;
                default:
                    this.arrObj.push(obj);    
                break;
    		}
    		
		}
		public adds(arr:Array<Object>):void{//初始socket时候传的
            while(arr.length > 0) {
                var obj:Object=arr.shift();
                switch(obj["type"]) {
                    case 3: case 4:
                        this.tipObj = obj;
                        this.canTip=true;
                        break;
                    default:
                        this.addItem(obj,false);
                        break;
                }
            }
            if(this.arr.length>=4){
                this.scroll1.viewport.scrollV = (this.arr.length - 4) * this.jiange;
            }
            this.addTip();
		}
		private setPoint():void{
		    for(var i:number=0;i<this.arr.length;i++){
		        var item:MBarrageItem=this.arr[i];
//		        item.y=-(this.arr.length-i)*55;
//		        item.y
		    }
		}
		public clear():void{
    		this.lblTip.text="";this.lblTip1.text="";this.bmpTip.source=null;
            this.lblTip_1.text = ""; this.lblTip1_1.text = "";
    		this.tipObj=null;
		    for(var i:number=0;i<this.arr.length;i++){
		        var item:MBarrageItem=this.arr[i];
		        if(item.parent){
		            item.parent.removeChild(this);
		        }
		        MBarrageItem.reclaim(item);
		    }
		    this.groupData.removeChildren();
		    this.arrObj=[];this.arr=[];
		    this.touch=false;
		    this.canUpdate=true;
		}
	}
}
