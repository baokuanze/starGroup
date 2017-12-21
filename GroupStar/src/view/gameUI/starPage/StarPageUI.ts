module starPage {
	/**
	 *
	 * @author 
	 *
	 */
	export class StarPageUI extends eui.Component{
    	private lbl1:eui.Label;
    	private lbl2:eui.Label;
        private groupData:eui.Group;
        private scroll1:eui.Scroller;
        private btnSerach:eui.Image;
        private btnSend:StarPageTip
        private bo:boolean=false;
        private index:number=0;
        private arr:Array<StarPageItem>=[];
//        private starPageTip:
		public constructor() {
    		super();
            this.skinName ="src/view/gameUI/starPage/StarPageUISkin.exml";
            this.btnSend=new StarPageTip();
		}
		public childrenCreated():void{
            if(Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
            }
		    this.scroll1.height=egret.MainContext.instance.stage.stageHeight-160;
            this.btnSerach.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.controllerManager.newStarController.showSerach();
                GameApp.Manager.viewManager.starPageManager.hide();
            },this);
            this.scroll1.addEventListener(eui.UIEvent.CHANGE,this.change,this);
		}
        public change(): void {
            var last:StarPageItem=this.index==0?this.arr[0]:this.arr[(this.index)*9-9];
            var next: StarPageItem = (this.index + 1) * 9>=this.arr.length?this.arr[this.arr.length-1]:this.arr[(this.index+1)*9];
            if(this.index<this.arr.length/9-1){
//                console.log(this.scroll1.viewport.scrollV + " "+ (last.y ) + " " + (next.y - this.scroll1.height));
                if(this.scroll1.viewport.scrollV>=next.y-this.scroll1.height){
                    this.index++;
                    this.dis();
                }
            }
            if(this.index>0){
                if(this.scroll1.viewport.scrollV < last.y ){
                    this.index--;
                    this.dis();
                }
            }
        }
		public setData(obj:Object):void{//225;370
    		if(!this.bo){
            		this.bo=true;
            		this.index=0;
            		var list:Array<Object>=obj["stars_list"];
            	
            		var _x:number=20,_y:number=0;
            		var n:number=0;
//            		list=list.concat(list,list,list,list,list);
//                console.log("加载长度:" + list.length);
    		    for(var i in list){
    		        var item:StarPageItem=new StarPageItem();
    		        this.groupData.addChild(item);
    		        item.x=20+(n%3)*(225+18);
    		        item.y=_y*(370+20);
    		        n++;
    		        if(n%3==0){
    		            _y++;
    		        }
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.headTap,this);
                    this.arr.push(item);
    		    }
                for(var j = list.length - 1;j >= 0;j--) {
                    var item: StarPageItem = <StarPageItem>this.groupData.getElementAt(j);
                    item.setData(list[j]);
                }
                this.btnSend.y = this.groupData.getElementAt(this.groupData.numElements-1).y + (370 + 20)+50;
                this.btnSend.x=0;
                this.groupData.addChild(this.btnSend);
                this.dis();
            }
		}
		private dis():void{
//		    var min:number=this.index>0?(this.index-1):0;
//		    var max:number=this.index==0?1:this.index;
    		var min:number=this.index==0?0:this.index*9-9;
    		var max:number=(this.index+1)*9;
            console.log("index:" + this.index + " 显示 min:" + min + " max:" + max);
		    for(var i:number=0;i<this.arr.length;i++){
		        var item:StarPageItem=this.arr[i];
                if(i >= min && i < max){
		            this.groupData.addChild(item);
		        }else{
		            if(item.parent){
		                item.parent.removeChild(item);
		            }
		        }
		    }
		}
        private headTap(e:egret.TouchEvent): void {
            var item:StarPageItem=e.currentTarget;
            GameApp.Manager.dataManager.bid = item.bid;
            console.log("选择:" + item.bid);
            GameApp.Manager.dataManager.topEnter = 2;
            GameApp.Manager.viewManager.starPageManager.hide();
            GameApp.Manager.controllerManager.start();
        }
		public clear():void{
    		this.btnSend.clear();
//		    while(this.groupData.numElements>0){
//		        var item:StarPageItem=<StarPageItem>this.groupData.getElementAt(this.groupData.numElements-1);
//		        if(item.parent){
//		            item.parent.removeChild(item);
//		        }
//		    }
		}
	}
}
