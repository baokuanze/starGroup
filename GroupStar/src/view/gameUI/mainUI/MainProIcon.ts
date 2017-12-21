module mainUI {
	/**
	 *
	 * @author 
	 *
	 */
    export class MainProIcon extends eui.Group {
        private track: eui.Image;
        private thumb: eui.Image;
        public now: number = 0;
        public total: number = 100;
        private val: number = 0;
        public constructor(track:string,thumb) {
            super();
            this.track = new eui.Image(track);
            this.thumb = new eui.Image(thumb);
            this.addChild(this.track);
            this.addChild(this.thumb);
            this.thumb.mask = new egret.Rectangle(0,0,0,0);
            this.validateNow();
        }
        public setData(v:number): void {
//            this.now = now; this.total = total;
            this.val = v;
//            if(this.now > this.total) {
//                this.now = this.total;
//            }
            this.setMask();
        }
        public setMask(): void {
            var c: number = this.val/100 * this.thumb.height;
            this.thumb.mask = new egret.Rectangle(0,this.thumb.height-c,this.thumb.width,c);
        }
    }
}
