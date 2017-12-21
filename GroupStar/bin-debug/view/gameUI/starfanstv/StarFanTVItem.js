var starfanstv;
(function (starfanstv) {
    /**
     *
     * @author
     *
     */
    var StarFanTVItem = (function (_super) {
        __extends(StarFanTVItem, _super);
        function StarFanTVItem() {
            _super.call(this);
            this.TVid = "";
            this.skinName = "src/view/gameUI/starfanstv/StarFansTVItemSkin.exml";
        }
        var d = __define,c=StarFanTVItem,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblTime.fontFamily = "Heiti SC";
                this.lblTitle.fontFamily = "Heiti SC";
            }
        };
        p.createVideo = function () {
            this.video = new egret.Video();
            this.video.x = 0;
            this.video.y = 0;
            this.video.width = 750;
            this.video.height = 300;
            this.video.fullscreen = false;
            //            this.video.poster =  this.obj["front_cover"];
            this.addChildAt(this.video, 0);
            this.video.load(this.obj["video"]);
            //监听视频加载完成
            this.video.once(egret.Event.COMPLETE, this.onLoad, this);
            //监听视频加载失败
            this.video.once(egret.IOErrorEvent.IO_ERROR, this.onLoadErr, this);
        };
        p.setData = function (obj) {
            this.obj = obj;
            this.TVid = obj["id"];
            this.lblTime.text = Tools.getInstance().formatTime3(obj["time"]);
            this.lblTitle.text = window["hexToDec"](obj["title"]);
            RES.getResByUrl(obj["front_cover"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
            this.createVideo();
        };
        p.load_end = function (source) {
            this.bmpBack.source = source;
        };
        p.onLoad = function (e) {
            //监听按钮行为，当按下时调用播放函数。
            this.btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play, this);
        };
        p.onLoadErr = function (e) {
            console.log("video load error happened");
        };
        p.play = function (e) {
            this.video.position = 0;
            this.video.play();
        };
        return StarFanTVItem;
    }(eui.Component));
    starfanstv.StarFanTVItem = StarFanTVItem;
    egret.registerClass(StarFanTVItem,'starfanstv.StarFanTVItem');
})(starfanstv || (starfanstv = {}));
