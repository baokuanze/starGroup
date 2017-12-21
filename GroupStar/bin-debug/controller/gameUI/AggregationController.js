var aggregation;
(function (aggregation) {
    /**
     *
     * @author
     *
     */
    var AggregationController = (function () {
        function AggregationController() {
        }
        var d = __define,c=AggregationController,p=c.prototype;
        p.show = function (type, num) {
            GameApp.Manager.viewManager.aggregation.show(type, num);
        };
        p.hide = function () {
            GameApp.Manager.viewManager.aggregation.hide();
        };
        return AggregationController;
    }());
    aggregation.AggregationController = AggregationController;
    egret.registerClass(AggregationController,'aggregation.AggregationController');
})(aggregation || (aggregation = {}));
