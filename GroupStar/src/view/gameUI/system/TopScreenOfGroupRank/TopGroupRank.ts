module TopScreenOfGroupRank {
	/**
	 *
	 * @author 
	 *
	 */
	export class TopGroupRank extends eui.Component {
        private scro1:eui.Scroller;
        public img_focus:eui.Image; //最上边的图片
        public lable_focusTitlt:eui.Label;  //一周新作伴
        public lable_workTitle:eui.Label; //作品标题
        private group_top:eui.Group;  // 来确定位置
        private lable_myStar:eui.Label;
        private img_icon:eui.Image;// 图片的Ico
        private lable_starName:eui.Label;
        private lable_hot:eui.Label;
        private lable_RankStar:eui.Label;
        private group_comeToMyStar:eui.Group;
        private group_GroupRank:eui.Group;
        private lable_go:eui.Label;
        private scHeight:number = 0;
        private group_starNews:eui.Group;
    	
        private arr: Array<TopScreenOfGroupRank.TopRank> = []
        public index: number;
        private disNum: number = 10;
        private lable_rankNumber:eui.Label;
        private img_rankIMg:eui.Image;
        private lable_focusTitlt0:eui.Label;
        private lable_workTitle0:eui.Label;
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/system/TopScreenOfGroupRank/TopGroupRankSkin.exml";
		}
		
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_focusTitlt.fontFamily = "Heiti SC";
                this.lable_workTitle.fontFamily = "Heiti SC";
                this.lable_myStar.fontFamily = "Heiti SC";
                this.lable_starName.fontFamily = "Heiti SC";
                this.lable_hot.fontFamily = "Heiti SC";
                this.lable_RankStar.fontFamily = "Heiti SC";
                this.lable_go.fontFamily = "Heiti SC";
                this.lable_focusTitlt0.fontFamily = "Heiti SC";
                this.lable_workTitle0.fontFamily = "Heiti SC";
            }
            this.scro1.height = this.stage.stageHeight;
            this.scro1.addEventListener(eui.UIEvent.CHANGE,this.change,this)
            this.group_comeToMyStar.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.controllerManager.topGroupRankController.hide();
            },this);
            
            this.group_top.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                GameApp.Manager.controllerManager.headLinesController.show(1,0,3);
                GameApp.Manager.controllerManager.topGroupRankController.hide();
            },this);
        }
        
        public setData(obj:Object):void{
            RES.getResByUrl(obj["headlineData"]["poster"],this.setHeadLine,this,RES.ResourceItem.TYPE_IMAGE);
            this.lable_workTitle.text = window["hexToDec"](obj["headlineData"]["title"]);
            this.lable_workTitle0.text = window["hexToDec"](obj["headlineData"]["title"]);
            
            console.log(this.group_top.height,"heigth");
            RES.getResByUrl(obj["selfStarData"]["head_img"],this.setIconImg,this,RES.ResourceItem.TYPE_IMAGE);
            this.lable_starName.text = window["hexToDec"](obj["selfStarData"]["star_name"]);
            this.lable_hot.text = window["hexToDec"](obj["selfStarData"]["hot"]);
            this.index = 0;
            
            if(obj["selfStarData"]["rank"] == 1){
                this.img_rankIMg.source = "fistpag_1";
            } else if(obj["selfStarData"]["rank"] == 2){
                this.img_rankIMg.source = "fistpag_2";
            } else if(obj["selfStarData"]["rank"] == 3){
                this.img_rankIMg.source = "fistpag_3";
            }else{
                this.img_rankIMg.source = "fistpag_4";
            }
            
            if(obj["selfStarData"]["rank"]>= 10){
                this.lable_rankNumber.size = 24;
            }
            this.lable_rankNumber.text = obj["selfStarData"]["rank"] + "";
            this.scHeight = this.group_top.height + this.group_comeToMyStar.height;
            
            for(var i: number = 0;i < obj["starRankData"].length;i++){
                var it = obj["starRankData"][i];
                var toprank = TopScreenOfGroupRank.TopRank.produce();
                toprank.x = 0; toprank.y = i * toprank.height;
                this.group_GroupRank.addChild(toprank);
                this.arr.push(toprank);
            }
            var len = obj["starRankData"].length
            for(var j = obj["starRankData"].length - 1;j >= 0;j--) {
                var item: TopScreenOfGroupRank.TopRank = <TopScreenOfGroupRank.TopRank>this.group_GroupRank.getElementAt(j);
                item.setData(obj["starRankData"][j], j+1);
            }
            this.dis();
        }
        
        public change(): void {
            if(this.scro1.viewport && this.arr.length > 0) {
                var last: TopScreenOfGroupRank.TopRank = this.index == 0 ? this.arr[0] : this.arr[(this.index) * this.disNum - this.disNum];
                var next: TopScreenOfGroupRank.TopRank = (this.index + 1) * this.disNum >= this.arr.length ? this.arr[this.arr.length - 1] : this.arr[(this.index + 1) * this.disNum];
                if(this.index < this.arr.length / this.disNum - 1) {
                    if(this.scro1.viewport.scrollV >= next.y - 752) {
                        this.index++;
                        this.dis();
                    }
                }
                if(this.index > 0) {
                    if(this.scro1.viewport.scrollV < last.y +752) {
                        this.index--;
                        this.dis();
                    }
                }
            }
        }
        private dis(): void {
            var min: number = this.index == 0 ? 0 : this.index * this.disNum - this.disNum;
            var max: number = (this.index + 1) * this.disNum;
            for(var i: number = 0;i < this.arr.length;i++) {
                var item: TopScreenOfGroupRank.TopRank = this.arr[i];
                if(i < max) {
                    this.group_GroupRank.addChild(item);
                }
                else {
                    if(item.parent) {
                        item.parent.removeChild(item);
                    }
                }
            }
        }
        
        
        
        public setHeadLine(source:egret.Texture):void{
            this.img_focus.texture = source;
            this.img_focus.width = 750;
            var bite = 750 /source["textureWidth"];
            this.img_focus.height = source["textureHeight"]*bite;
        }
        
        public setIconImg(source: egret.Texture): void {
            this.img_icon.texture = source;
        }
        
        public clear():void{
            this.img_focus.source = null;
            this.img_focus.texture = null;
            this.img_icon.source = null;
            this.scro1.viewport.scrollV = 0;
            this.img_rankIMg.source = null;
            this.arr = [];
            
            while(this.group_GroupRank.numElements >0){
                var item: TopScreenOfGroupRank.TopRank = <TopScreenOfGroupRank.TopRank>this.group_GroupRank.getElementAt(this.group_GroupRank.numElements - 1);
                TopScreenOfGroupRank.TopRank.reclaim(item);
                if(item.parent){
                    item.parent.removeChild(item);
                }
            }
        }
	}
}
