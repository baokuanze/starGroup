var buyTicketActive;
(function (buyTicketActive) {
    /**
     *
     * @author
     *
     */
    var CommentStyle = (function (_super) {
        __extends(CommentStyle, _super);
        function CommentStyle() {
            _super.call(this);
            this.isPush = true;
            this.skinName = "src/view/gameUI/buyTicketActive/CommentStyleSkin.exml";
        }
        var d = __define,c=CommentStyle,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lb_userName.fontFamily = "Heiti SC";
                this.lb_pushTime.fontFamily = "Heiti SC";
                this.lb_priseNumber.fontFamily = "Heiti SC";
                this.lb_common.fontFamily = "Heiti SC";
            }
            this.btn_prise.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var self = this;
                if (self.isPush) {
                    self.isPush = false;
                    var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + self.comment_id + "" + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/praiseHaiquanComment", { "user_id": GameApp.Manager.dataManager.uid, "bid": GameApp.Manager.dataManager.bid, "comment_id": self.comment_id, sign: sign }, function (obj) {
                        if (obj["st"] == 1) {
                            if (obj['data']["valid"]) {
                                self.img_priseAn.visible = false;
                                self.img_priseLigh.visible = true;
                                self.lb_priseNumber.text = parseInt(self.lb_priseNumber.text) + 1 + "";
                            }
                            else {
                                system.TipText.produce().open('今日已点赞');
                            }
                            if (obj['data']["add_lucky_star"]) {
                                GameApp.Manager.dataManager.lucystar += obj['data']["add_lucky_star"];
                                if (obj['data']["add_lucky_star"] > 0) {
                                    system.TipText.produce().open('钻石+3');
                                }
                            }
                            self.isPush = true;
                        }
                    }, true, this);
                }
            }, this);
        };
        /**生產*/
        CommentStyle.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (CommentStyle.cacheDict[mtype] == null) {
                CommentStyle.cacheDict[mtype] = [];
            }
            var dict = CommentStyle.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new CommentStyle();
            }
            return theFighter;
        };
        /**回收*/
        CommentStyle.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (CommentStyle.cacheDict[mtype] == null) {
                CommentStyle.cacheDict[mtype] = [];
            }
            var dict = CommentStyle.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.setData = function (data) {
            this.lb_userName.text = window["hexToDec"](data["user_name"]);
            this.lb_pushTime.text = Tools.getInstance().getMonth(data['time']);
            this.lb_priseNumber.text = data['praised_num'];
            this.lb_common.text = data['comment'];
            RES.getResByUrl(data['user_pic'], this.load_personIcon, this, RES.ResourceItem.TYPE_IMAGE);
            this.rect_line.y = this.lb_common.y + this.lb_common.height + 30;
            this.comment_id = data['comment_id'];
        };
        p.setData1 = function (text) {
            var time = new Date().getTime();
            this.lb_userName.text = GameApp.Manager.dataManager.user_name;
            this.lb_pushTime.text = Tools.getInstance().getMonth(time);
            this.lb_priseNumber.text = "0";
            this.lb_common.text = text;
            this.rect_line.y = this.lb_common.y + this.lb_common.height + 20;
            this.img_paiseIcon.source = GameApp.Manager.dataManager.user_pic;
        };
        p.load_personIcon = function (source) {
            this.img_paiseIcon.texture = source;
        };
        p.clear = function () {
            this.lb_userName.text = "";
            this.lb_pushTime.text = "";
            this.lb_common.text = "";
            this.img_paiseIcon.source = "";
            this.img_priseAn.visible = true;
            this.img_priseLigh.visible = false;
            this.isPush = true;
        };
        CommentStyle.cacheDict = {};
        return CommentStyle;
    }(eui.Component));
    buyTicketActive.CommentStyle = CommentStyle;
    egret.registerClass(CommentStyle,'buyTicketActive.CommentStyle');
})(buyTicketActive || (buyTicketActive = {}));
