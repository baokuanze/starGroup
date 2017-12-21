var barrage;
(function (barrage) {
    /**
     *
     * @author 弹幕管理类
     *
     */
    var BarrageMananger = (function () {
        function BarrageMananger(mainUI) {
            this.itemArr = [];
            this.pointArr = [
                { id: 1, x: 20, y: 360, bo: true },
                { id: 2, x: 20, y: 240, bo: true },
                { id: 3, x: 20, y: 120, bo: true },
                { id: 4, x: 20, y: 0, bo: true }
            ];
            this.mainUI = mainUI;
        }
        var d = __define,c=BarrageMananger,p=c.prototype;
        p.add = function (obj) {
            if (obj["click"] > 0 && obj["id"] != 1) {
                var item = this.getItemByUidGiftId(obj["uid"], obj["id"]);
                if (item) {
                    item.resetData(obj);
                }
                else {
                    var point = this.getPoint();
                    if (point) {
                        point["bo"] = false;
                        item = barrage.BarrageItem.produce();
                        if (GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI && GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI.parent) {
                            GameApp.Manager.viewManager.liveChatRoomManager.liveChatRoomUI.addChild(item);
                            item.y = point["y"] + 250;
                        }
                        else {
                            this.mainUI.addChild(item);
                            item.y = point["y"];
                        }
                        item.setData(obj);
                        item.pid = point["id"];
                        item.addEventListener("END", this.itemEnd, this);
                        this.itemArr.push(item);
                    }
                }
            }
        };
        p.itemEnd = function (e) {
            var item = e.data;
            var point = this.getPointById(item.pid);
            point["bo"] = true;
            for (var i = this.itemArr.length - 1; i >= 0; i--) {
                if (item == this.itemArr[i]) {
                    this.itemArr.splice(i, 1);
                    break;
                }
            }
            if (item.parent) {
                item.parent.removeChild(item);
            }
            barrage.BarrageItem.reclaim(item);
        };
        p.getItemByUidGiftId = function (uid, giftid) {
            var ret;
            for (var i in this.itemArr) {
                var item = this.itemArr[i];
                if (item.state != 3) {
                    if (item.uid == uid && item.giftId == giftid) {
                        ret = item;
                        break;
                    }
                }
            }
            return ret;
        };
        p.getPoint = function () {
            var ret = null;
            for (var i in this.pointArr) {
                var obj = this.pointArr[i];
                if (obj["bo"] == true) {
                    ret = obj;
                    break;
                }
            }
            return ret;
        };
        p.getPointById = function (pid) {
            var ret = null;
            for (var i in this.pointArr) {
                var obj = this.pointArr[i];
                if (obj["id"] == pid) {
                    ret = obj;
                    break;
                }
            }
            return ret;
        };
        return BarrageMananger;
    }());
    barrage.BarrageMananger = BarrageMananger;
    egret.registerClass(BarrageMananger,'barrage.BarrageMananger');
})(barrage || (barrage = {}));
