var garbageCollection;
(function (garbageCollection) {
    /**
     *
     * @author
     *
     */
    var GarbageCollectionController = (function () {
        function GarbageCollectionController() {
        }
        var d = __define,c=GarbageCollectionController,p=c.prototype;
        p.show = function (uid, bid, type) {
            GameApp.Manager.viewManager.garbageCollectionManager.show(uid, bid, type);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.garbageCollectionManager.hide();
        };
        return GarbageCollectionController;
    }());
    garbageCollection.GarbageCollectionController = GarbageCollectionController;
    egret.registerClass(GarbageCollectionController,'garbageCollection.GarbageCollectionController');
})(garbageCollection || (garbageCollection = {}));
