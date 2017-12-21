var garbageCollection;
(function (garbageCollection) {
    /**
     *
     * @author
     *
     */
    var GarbageCollectionManager = (function (_super) {
        __extends(GarbageCollectionManager, _super);
        function GarbageCollectionManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=GarbageCollectionManager,p=c.prototype;
        p.show = function (uid, bid, type) {
            this.uid = uid;
            this.bid = bid;
            this.type = type;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            var self = this;
            if (!this.garbageCollection) {
                this.garbageCollection = new garbageCollection.GarbageCollection();
            }
            GameApp.Manager.viewManager.garbageStage.addChild(this.garbageCollection);
            GameApp.Manager.viewManager.garbageStage.visible = true;
            var sign = new md5().hex_md5("" + GameApp.Manager.dataManager.uid + this.uid + this.bid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getUserStarWorks", { user_id: GameApp.Manager.dataManager.uid, target_user_id: this.uid, bid: this.bid, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    this.garbageCollection.setData(obj, this.bid, this.uid, this.type);
                }
            }, true, this);
        };
        p.hide = function () {
            if (this.garbageCollection.parent) {
                this.garbageCollection.parent.removeChild(this.garbageCollection);
                this.garbageCollection.clear();
            }
            GameApp.Manager.viewManager.garbageStage.visible = false;
        };
        p.loading = function () {
            var self = this;
            this.initUI();
        };
        p.load_end = function () {
            this.loaded = true;
            this.initUI();
        };
        return GarbageCollectionManager;
    }(common.BaseView));
    garbageCollection.GarbageCollectionManager = GarbageCollectionManager;
    egret.registerClass(GarbageCollectionManager,'garbageCollection.GarbageCollectionManager');
})(garbageCollection || (garbageCollection = {}));
