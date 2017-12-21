var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var TaskIcon = (function (_super) {
        __extends(TaskIcon, _super);
        function TaskIcon() {
            _super.call(this);
            this.skinName = "src/view/gameUI/task/TaskIconSkin.exml";
        }
        var d = __define,c=TaskIcon,p=c.prototype;
        p.childrenCreated = function () {
        };
        p.setText = function (level) {
            this.bmp1.source = "t_icon" + Math.ceil(level / 9);
            this.bmp2.source = "t_fst" + data.DataManager.getGroupLevelByLevel(level);
            //		    this.lbl1.text=data.DataManager.getGroupNameByLevel(level);
            //		    this.rectBack.fillColor=data.DataManager.getGroupColorByLevel(level);
        };
        return TaskIcon;
    }(eui.Button));
    task.TaskIcon = TaskIcon;
    egret.registerClass(TaskIcon,'task.TaskIcon');
})(task || (task = {}));
