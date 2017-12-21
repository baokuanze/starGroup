var aler;
(function (aler) {
    /**
     *
     * @author
     *
     */
    var AlertManager = (function () {
        /**
         *
         */
        function AlertManager() {
        }
        var d = __define,c=AlertManager,p=c.prototype;
        AlertManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new AlertManager();
            }
            return this._instance;
        };
        return AlertManager;
    }());
    aler.AlertManager = AlertManager;
    egret.registerClass(AlertManager,'aler.AlertManager');
})(aler || (aler = {}));
