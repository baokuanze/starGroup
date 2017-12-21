var fansRecruit;
(function (fansRecruit) {
    /**
     *
     * @author
     *
     */
    var FansRecruitUI = (function (_super) {
        __extends(FansRecruitUI, _super);
        function FansRecruitUI() {
            _super.call(this);
            this.currentGroup = 1; //当前数据默认第一组
            this.bo = false;
            this.disNum = 6;
            this.index = 0;
            this.arr = [];
            this.skinName = "src/view/gameUI/fansRecruit/FansRecruitUISkin.exml";
        }
        var d = __define,c=FansRecruitUI,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.chakan.fontFamily = "Heiti SC";
                this.lbl1.fontFamily = "Heiti SC";
            }
            this.scroller.bounces = false;
            this.scroller.height = this.stage.stageHeight - 105;
            this.rtnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.scroller.addEventListener(eui.UIEvent.CHANGE_END, this.change, this);
            this.lbl1.visible = false;
        };
        p.change = function () {
            //console.log(this.scroller.viewport)
            if (this.scroGroup.numElements > 0) {
                var value = this.lastItem.y - this.scroller.height + this.lastItem.height;
                if (this.scroller.viewport && this.scroller.viewport.scrollV >= value) {
                    //console.log('22')
                    //this.setData(this.data);
                    this.ajaxPost();
                }
            }
        };
        p.ajaxPost = function () {
            var self = this;
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid_save + (this.currentGroup + 1) + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/starFansGroups", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid_save, page: (this.currentGroup + 1), sign: sign }, function (obj) {
                if (obj['st'] == 1 && obj['groups'].length > 0) {
                    self.bo = false;
                    self.setData(obj);
                    self.currentGroup++;
                }
            }, true, this);
        };
        p.setData = function (obj) {
            this.data = obj;
            if (obj['groups'].length > 0) {
                for (var i = 0; i < obj['groups'].length; i++) {
                    var item = new fansRecruit.FansRecruitItem();
                    item.setData(obj['groups'][i]);
                    this.scroGroup.addChild(item);
                    item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.item_tap, this);
                    if (i == obj['groups'].length - 1) {
                        this.lastItem = item;
                    }
                }
            }
            else {
                this.lbl1.visible = true;
            }
        };
        p.item_tap = function (e) {
            var item = e.currentTarget;
            system.GroupJoin.join(item.obj["group_openid"]);
        };
        p.close = function () {
            this.lbl1.visible = false;
            //            this.scroGroup.removeChildren();
            for (var i = this.scroGroup.numElements - 1; i >= 0; i--) {
                var item = this.scroGroup.getElementAt(i);
                item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.item_tap, this);
                item.parent.removeChild(item);
            }
            //GameApp.Manager.controllerManager.gameMainController.show();
            GameApp.Manager.controllerManager.fansRecruitController.hide();
        };
        return FansRecruitUI;
    }(eui.Component));
    fansRecruit.FansRecruitUI = FansRecruitUI;
    egret.registerClass(FansRecruitUI,'fansRecruit.FansRecruitUI');
})(fansRecruit || (fansRecruit = {}));
