var rankGroup;
(function (rankGroup) {
    /**
     *
     * @author 群排行
     *
     */
    var RankGroupUI = (function (_super) {
        __extends(RankGroupUI, _super);
        function RankGroupUI() {
            _super.call(this);
            this.arr = [];
            this.arr1 = [];
            this.arr2 = [];
            this.skinName = "src/view/gameUI/rankGroup/RankGroupUISkin.exml";
        }
        var d = __define,c=RankGroupUI,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
            }
            this.scroll1.height = this.stage.stageHeight - 95;
            this.rtnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            //		    this.groupData.cacheAsBitmap=true;
        };
        p.setData = function (arr) {
            //            arr.push(arr[0]); arr.push(arr[0]); arr.push(arr[0]); arr.push(arr[0]);
            var _y = 0;
            for (var i = 0; i < arr.length; i++) {
                switch (i) {
                    case 0:
                        var item = rankGroup.RankGroupItem.produce();
                        this.groupData.addChild(item);
                        this.arr.push(item);
                        item.setData(arr[i], i + 1);
                        item.y = _y;
                        _y += (2 + 300);
                        break;
                    case 1:
                        var item1 = rankGroup.RankGroupItem1.produce();
                        this.groupData.addChild(item1);
                        this.arr1.push(item1);
                        item1.setData(arr[i], i + 1);
                        item1.y = _y;
                        _y += (2 + 234);
                        break;
                    case 2:
                        var item1 = rankGroup.RankGroupItem1.produce();
                        this.groupData.addChild(item1);
                        this.arr1.push(item1);
                        item1.setData(arr[i], i + 1);
                        item1.y = _y;
                        _y += (2 + 234);
                        break;
                    default:
                        var item2 = rankGroup.RankGroupItem2.produce();
                        this.groupData.addChild(item2);
                        this.arr2.push(item2);
                        item2.setData(arr[i], i + 1);
                        item2.y = _y;
                        _y += (2 + 133);
                        break;
                }
            }
        };
        p.clear = function () {
            while (this.arr.length > 0) {
                var item = this.arr.pop();
                rankGroup.RankGroupItem.reclaim(item);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while (this.arr1.length > 0) {
                var item1 = this.arr1.pop();
                rankGroup.RankGroupItem1.reclaim(item1);
                if (item1.parent) {
                    item1.parent.removeChild(item1);
                }
            }
            while (this.arr2.length > 0) {
                var item2 = this.arr2.pop();
                rankGroup.RankGroupItem2.reclaim(item2);
                if (item2.parent) {
                    item2.parent.removeChild(item2);
                }
            }
        };
        p.close = function () {
            GameApp.Manager.controllerManager.rankGroupController.hide();
            GameApp.Manager.controllerManager.taskController.show();
        };
        return RankGroupUI;
    }(eui.Component));
    rankGroup.RankGroupUI = RankGroupUI;
    egret.registerClass(RankGroupUI,'rankGroup.RankGroupUI');
})(rankGroup || (rankGroup = {}));
