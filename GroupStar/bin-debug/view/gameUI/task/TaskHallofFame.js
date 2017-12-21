var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskHallofFame = (function (_super) {
        __extends(TaskHallofFame, _super);
        function TaskHallofFame() {
            _super.call(this);
            this.uid = 0;
            this.skinName = "src/view/gameUI/task/TaskHallofFameSkin.exml";
        }
        var d = __define,c=TaskHallofFame,p=c.prototype;
        /**生產*/
        TaskHallofFame.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (TaskHallofFame.cacheDict[mtype] == null) {
                TaskHallofFame.cacheDict[mtype] = [];
            }
            var dict = TaskHallofFame.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new TaskHallofFame();
            }
            return theFighter;
        };
        /**回收*/
        TaskHallofFame.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (TaskHallofFame.cacheDict[mtype] == null) {
                TaskHallofFame.cacheDict[mtype] = [];
            }
            var dict = TaskHallofFame.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        };
        p.tap = function (e) {
            userPanel.UserPanel.getInstance().open(this.uid, GameApp.Manager.dataManager.bid_save, GameApp.Manager.dataManager.group_openid + "");
            e.stopPropagation();
        };
        p.setData = function (obj, rank) {
            if (rank === void 0) { rank = -1; }
            this.uid = obj["user_id"];
            if (rank > 0) {
                this.bmpRank.source = "p1_r" + rank;
                this.bmpRank.visible = true;
            }
            else {
                this.bmpRank.visible = false;
            }
            RES.getResByUrl(obj["user_pic"], this.load_end, this, RES.ResourceItem.TYPE_IMAGE);
        };
        p.load_end = function (s) {
            this.bmpIcon.source = s;
        };
        p.clear = function () {
            this.bmpIcon.source = null;
        };
        TaskHallofFame.cacheDict = {};
        return TaskHallofFame;
    }(eui.Component));
    task.TaskHallofFame = TaskHallofFame;
    egret.registerClass(TaskHallofFame,'task.TaskHallofFame');
})(task || (task = {}));
