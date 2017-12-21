var system;
(function (system) {
    /**
     *
     * @author
     *
     */
    var Share = (function () {
        function Share() {
        }
        var d = __define,c=Share,p=c.prototype;
        Share.share = function (obj, callback) {
            window["openGroup"].share({
                appid: obj["appid"],
                // 当前用户的openid
                openid: obj["openid"],
                // 要分享的群的openid
                group_openid: obj["group_openid"],
                // 分享消息的title
                title: obj["title"],
                // 分享消息的更具体信息
                desc: obj["desc"],
                // 分享出去打开的链接
                share_url: obj["share_url"],
                // 分享消息展示的图片
                image_url: obj["image_url"],
                debug: obj["debug"],
                // 分享成功的回调函数
                onSuccess: function () {
                    callback.call(this, 1);
                    console.log('success', arguments);
                    //GameApp.Manager.viewManager.labelAnimation("分享成功"+arguments);
                },
                // 点取消的回调函数
                onCancel: function () {
                    callback.call(this, 2);
                    console.log('cancel', arguments);
                    //                    GameApp.Manager.viewManager.labelAnimation("取消分享" + arguments);
                },
                // 出错的回调函数，包括分享失败
                onError: function () {
                    var str = "";
                    for (var i in arguments) {
                        str += "key: " + i + ":" + arguments[i];
                    }
                    callback.call(this, 3);
                    console.log('error', str);
                    //                    GameApp.Manager.viewManager.labelAnimation("分享失败" + arguments);
                }
            });
        };
        return Share;
    }());
    system.Share = Share;
    egret.registerClass(Share,'system.Share');
})(system || (system = {}));
