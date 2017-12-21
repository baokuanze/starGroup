var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskTip = (function (_super) {
        __extends(TaskTip, _super);
        function TaskTip() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/TaskTipSkin.exml";
        }
        var d = __define,c=TaskTip,p=c.prototype;
        p.show = function (num) {
            if (num === void 0) { num = 10; }
            this.alpha = 1;
            this.lbl2.text = "钻石" + num;
            egret.Tween.get(this).wait(1500).to({ alpha: 0 }, 500).call(this.close);
        };
        p.close = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return TaskTip;
    }(eui.Component));
    task.TaskTip = TaskTip;
    egret.registerClass(TaskTip,'task.TaskTip');
})(task || (task = {}));
