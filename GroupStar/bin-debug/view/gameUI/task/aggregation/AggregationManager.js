var task;
(function (task) {
    /**
     *
     * @author
     *
     */
    var AggregationManager = (function (_super) {
        __extends(AggregationManager, _super);
        function AggregationManager(viewManager) {
            _super.call(this, viewManager);
            this.loaded = false;
            this.viewManager = viewManager;
        }
        var d = __define,c=AggregationManager,p=c.prototype;
        p.show = function (type, num) {
            this.type = type;
            this.num = num;
            if (!this.loaded) {
                this.loading();
            }
            else {
                this.initUI();
            }
        };
        p.initUI = function () {
            console.log("进入下一个界面");
            if (!this.aggregation) {
                this.aggregation = new task.AggregationIcon1();
            }
            this.aggregation.type = this.type;
            this.BottomUIStage.addChild(this.aggregation);
            this.aggregation.addUpImg(); //添加大图片；
            if (this.num == 2) {
                this.aggregation.upTriceIcon(); //集结中会调用这个
            }
        };
        p.hide = function () {
            if (this.aggregation.parent) {
                this.BottomUIStage.removeChild(this.aggregation);
                this.aggregation.clear();
            }
        };
        p.loading = function () {
            var self = this;
            this.initUI();
        };
        p.load_end = function () {
            this.loaded = true;
            this.initUI();
        };
        return AggregationManager;
    }(common.BaseView));
    task.AggregationManager = AggregationManager;
    egret.registerClass(AggregationManager,'task.AggregationManager');
})(task || (task = {}));
