module zfdy {
	/**
	 *
	 * @author 
	 *
	 */
	export class Collection extends eui.Component{
    
    	
        public img_Icon:eui.Image;
        public lable_starNameWork:eui.Label;
        public lable_work:eui.Label;
    	public pid:number = -1;
        public img_bg:eui.Image;
        
        private colorArr: Array<number> = [0X565865, 0Xa37565 ,0X87c49b ,0X199be6 ,0Xf58ebd ,0Xf76864,0Xf5b316];
        
        private static cacheDict: Object = {};
        public static produce(mtype: string = "1",index: number = 0): Collection {
            if(Collection.cacheDict[mtype] == null) {
                Collection.cacheDict[mtype] = [];
            }
            var dict: Collection[] = Collection.cacheDict[mtype];
            var theFighter: Collection;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new Collection();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: Collection,mtype: string = "1"): void {
            if(Collection.cacheDict[mtype] == null) {
                Collection.cacheDict[mtype] = [];
            }
            var dict: Collection[] = Collection.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        
    	public constructor() {
    		super();
            this.skinName = "src/view/gameUI/zfdy/CollectionSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.lable_work.fontFamily = "Heiti SC";
                this.lable_starNameWork.fontFamily = "Heiti SC";
            }
        }
        public setData(obj:Object,star_name:string):void{
            if(obj["type"] == 1){
                this.img_Icon.source = "gc_BigMusic";
            } else if(obj['type'] == 2){
                this.img_Icon.source = "gc_BigTv";
            }else if(obj['type'] == 3){
                this.img_Icon.source = 'gc_BigMovie';
            }
         
            var self: Collection = this;
            this.lable_starNameWork.text = star_name;
            if(obj['name'].length > 10){
                var str = window["hexToDec"](obj["name"]);
                var str1 = str.substr(0,10);
                this.lable_work.text = str1;
            }else{
                this.lable_work.text = window["hexToDec"](obj["name"])
            }
            var index = parseInt(obj["colour"]);
            this.lable_work.textColor = this.colorArr[index];
           
            egret.Tween.get(this).to({ scaleX: 1,scaleY: 1 },600,egret.Ease.sineOut);
            egret.Tween.get(this).wait(1400).to({ alpha: 0 },700).call(function() {
                self.dispatchEventWith("END",false,this);
            })
        }
        
        public clear():void{
           this.alpha = 1;
           this.lable_starNameWork.text = "";
           this.lable_work.text = "";
           this.img_Icon.source = "";
        }
	}
}
