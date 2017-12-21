module system {
	/**
	 *
	 * @author 
	 *
	 */
	export class Image1 extends eui.Image {
//        private hand:eui.Image;
        private static cacheDict: Object = {};
        /**生產*/
        public static produce(mtype: string = "1"): Image1 {
            if(Image1.cacheDict[mtype] == null) {
                Image1.cacheDict[mtype] = [];
            }
            var dict: Image1[] = Image1.cacheDict[mtype];
            var theFighter: Image1;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new Image1();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: Image1,mtype: string = "1"): void {
            if(Image1.cacheDict[mtype] == null) {
                Image1.cacheDict[mtype] = [];
            }
            var dict: Image1[] = Image1.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
        public constructor() {
            super();
        }
        public setData(str:string):void{
            if(str =="hand"){
                this.source = "p1_parseLiang"
            }
            if(str == "yuan"){
                this.source = "j_imgButton"
            }
        }
        
        private clear(): void {
            this.source = null;
            this.alpha=1;
        }
	}
}
