var system;
(function (system) {
    /**
     *
     * @author
     *
     */
    var GroupJoin = (function () {
        function GroupJoin() {
        }
        var d = __define,c=GroupJoin,p=c.prototype;
        GroupJoin.join = function (target_group_openid) {
            //            if(!Tools.getInstance().isIphone()) {
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.group_openid + target_group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/joinGroup", { "user_id": GameApp.Manager.dataManager.uid, "group_openid": GameApp.Manager.dataManager.group_openid, "target_group_openid": target_group_openid, sign: sign }, function (obj) {
                if (obj["st"] == 1) {
                    //                        system.TipText.produce().open('调用openGroup');
                    window["openGroup"].join({
                        appid: obj["appid"],
                        openid: obj["openid"],
                        openkey: obj["openkey"],
                        source_group_openid: obj["source_group_openid"],
                        group_openid: obj["group_openid"] // 要打开资料卡的群的 openid
                    });
                }
            }, true, this);
            //            }
        };
        return GroupJoin;
    }());
    system.GroupJoin = GroupJoin;
    egret.registerClass(GroupJoin,'system.GroupJoin');
})(system || (system = {}));
