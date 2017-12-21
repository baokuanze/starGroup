var upload;
(function (upload) {
    /**
     *
     * @author
     *
     */
    var UploadController = (function () {
        function UploadController() {
        }
        var d = __define,c=UploadController,p=c.prototype;
        p.show = function () {
            GameApp.Manager.viewManager.uploadManager.show();
        };
        p.hide = function () {
            GameApp.Manager.viewManager.uploadManager.hide();
        };
        return UploadController;
    }());
    upload.UploadController = UploadController;
    egret.registerClass(UploadController,'upload.UploadController');
})(upload || (upload = {}));
