var live;
(function (live) {
    /**
     *
     * @author
     *
     */
    var LiveTalkChatItem = (function (_super) {
        __extends(LiveTalkChatItem, _super);
        function LiveTalkChatItem() {
            _super.call(this);
            this.type = 1;
            this._w = 0;
            this.gift_id = 0;
            this.intimate_level = 0;
            this.group_openid = 0;
            this.skinName = "src/view/gameUI/liveChatRoom/LiveChatItemSkin.exml";
        }
        var d = __define,c=LiveTalkChatItem,p=c.prototype;
        /**生產*/
        LiveTalkChatItem.produce = function (mtype, index) {
            if (mtype === void 0) { mtype = "1"; }
            if (index === void 0) { index = 0; }
            if (LiveTalkChatItem.cacheDict[mtype] == null) {
                LiveTalkChatItem.cacheDict[mtype] = [];
            }
            var dict = LiveTalkChatItem.cacheDict[mtype];
            var theFighter;
            if (dict.length > 0) {
                theFighter = dict.pop();
            }
            else {
                theFighter = new LiveTalkChatItem();
            }
            return theFighter;
        };
        /**回收*/
        LiveTalkChatItem.reclaim = function (obj, mtype) {
            if (mtype === void 0) { mtype = "1"; }
            if (LiveTalkChatItem.cacheDict[mtype] == null) {
                LiveTalkChatItem.cacheDict[mtype] = [];
            }
            var dict = LiveTalkChatItem.cacheDict[mtype];
            if (dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        };
        p.childrenCreated = function () {
            if (this.lblTalk.parent) {
                this.lblTalk.parent.removeChild(this.lblTalk);
            }
            if (this.lblTalk1.parent) {
                this.lblTalk1.parent.removeChild(this.lblTalk1);
            }
            if (this.lblDesc.parent) {
                this.lblDesc.parent.removeChild(this.lblDesc);
            }
            if (this.lblDesc1.parent) {
                this.lblDesc1.parent.removeChild(this.lblDesc1);
            }
            if (this.lblName.parent) {
                this.lblName.parent.removeChild(this.lblName);
            }
            if (this.lblName1.parent) {
                this.lblName1.parent.removeChild(this.lblName1);
            }
            this.bmpIcon.visible = false;
            this.bmpBuluo.visible = false;
            if (Tools.getInstance().isIphone()) {
                this.lblTitle.fontFamily = "Heiti SC";
                this.lblDesc.fontFamily = "Heiti SC";
                this.lblDesc1.fontFamily = "Heiti SC";
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                switch (this.type) {
                    case 1:
                    case 6:
                    case 7:
                        //                        userPanel.UserPanel.getInstance().open(this.uid,GameApp.Manager.dataManager.bid_save,this.group_openid + "");
                        break;
                }
                e.stopPropagation();
            }, this);
        };
        p.getHeight = function () {
            var ret = 0;
            switch (this.type) {
                case 1:
                    ret = 32;
                    break;
                case 19:
                    ret = this.lblTalk.textHeight;
                    break;
            }
            return ret;
        };
        p.setData = function (obj) {
            switch (obj["type"]) {
                case 1:
                    this.gift(obj);
                    break;
                case 19:
                    this.talk(obj);
                    break;
            }
        };
        p.gift = function (obj) {
            this.addChild(this.lblName1);
            this.addChild(this.lblName);
            this.addChild(this.lblDesc1);
            this.addChild(this.lblDesc);
            this.uid = obj["uid"];
            this.gift_id = obj["id"];
            this.intimate_level = obj["intimate_level"];
            this.type = obj["type"];
            this.group_openid = obj["group_openid"] ? obj["group_openid"] : 0;
            var newName = "";
            switch (this.type) {
                case 1:
                    this.lblName.x = 96;
                    this.lblName1.x = 97;
                    this.bmpIcon.visible = true;
                    this.lblTitle.visible = true;
                    this.bmpTitleBack.visible = true;
                    this.bmpBuluo.visible = false;
                    this.bmpIcon.source = "p_gift" + this.gift_id;
                    this.bmpTitleBack.source = data.DataManager.getintimateIcon(this.intimate_level);
                    this.lblTitle.text = data.DataManager.getintimateLevel(this.intimate_level) + "";
                    newName = window["hexToDec"](obj["user_name"]);
                    var addlen = 0;
                    this.lblDesc.textFlow = (new egret.HtmlTextParser).parser("<font color=#FF6479>送出了" +
                        data.DataManager.getGiftName(this.gift_id) + "</font>");
                    this.lblDesc1.textFlow = (new egret.HtmlTextParser).parser("<font color=#000000>送出了" +
                        data.DataManager.getGiftName(this.gift_id) + "</font>");
                    if (Tools.getInstance().isIphone()) {
                        this.lblName.text = newName;
                        this.lblName1.text = newName;
                        this.validateNow();
                        addlen = window["Emoji"]["emojiLength"](newName) * 20;
                        this.lblDesc.x = this.lblName.x + this.lblName.textWidth + addlen + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    }
                    else {
                        this.lblName.textFlow = (new egret.HtmlTextParser).parser(window["Emoji"]["emojiReplace"](newName));
                        this.lblName1.text = this.lblName.text;
                        this.validateNow();
                        this.lblDesc.x = this.lblName.x +
                            this.lblName.textWidth + 5;
                        this.lblDesc1.x = this.lblDesc.x + 1;
                    }
                    this.bmpIcon.x = this.lblDesc.textWidth + this.lblDesc.x + 10;
                    break;
            }
        };
        p.talk = function (obj) {
            this.addChild(this.lblTalk1);
            this.addChild(this.lblTalk);
            this.uid = obj["uid"];
            this.gift_id = obj["id"];
            this.intimate_level = obj["intimate_level"];
            this.type = obj["type"];
            this.group_openid = obj["group_openid"] ? obj["group_openid"] : 0;
            var newName = "";
            this.lblName.x = 96;
            this.lblName1.x = 97;
            this.bmpIcon.visible = false;
            this.lblTitle.visible = true;
            this.bmpTitleBack.visible = true;
            this.bmpBuluo.visible = false;
            this.bmpTitleBack.source = data.DataManager.getintimateIcon(this.intimate_level);
            this.lblTitle.text = data.DataManager.getintimateLevel(this.intimate_level) + "";
            newName = window["hexToDec"](obj["user_name"]);
            var addlen = 0;
            if (Tools.getInstance().isIphone()) {
                var num = window["Emoji"]["emojiLength"](newName);
                this.lblTalk.textFlow = (new egret.HtmlTextParser).parser(newName + this.addKongge(num) + ": " + "<font color=#ffffff>" +
                    window["hexToDec"](obj["message"]) + "</font>");
                this.lblTalk1.textFlow = (new egret.HtmlTextParser).parser(newName + this.addKongge(num) + ": " + "<font color=#000000>" +
                    window["hexToDec"](obj["message"]) + "</font>");
                this.validateNow();
            }
            else {
                this.lblTalk.textFlow = (new egret.HtmlTextParser).parser(newName + ": <font color=#ffffff>" + window["Emoji"]["emojiReplace"](window["hexToDec"](obj["message"])) + "</font>");
                this.lblTalk1.textFlow = (new egret.HtmlTextParser).parser(newName + ": <font color=#000000>" + window["Emoji"]["emojiReplace"](window["hexToDec"](obj["message"])) + "</font>");
                this.validateNow();
            }
            this.height = this.lblTalk.textHeight + 2;
        };
        p.addKongge = function (num) {
            var ret = "";
            switch (num) {
                case 1:
                    ret = "  ";
                    break;
                case 2:
                    ret = "    ";
                    break;
                case 3:
                    ret = "      ";
                    break;
                case 4:
                    ret = "        ";
                    break;
                case 5:
                    ret = "          ";
                    break;
                case 6:
                    ret = "            ";
                    break;
                case 7:
                    ret = "              ";
                    break;
                case 8:
                    ret = "                ";
                    break;
            }
            return ret;
        };
        p.getStringLen = function (str) {
            return str;
        };
        p.clear = function () {
            if (this.lblTalk.parent) {
                this.lblTalk.parent.removeChild(this.lblTalk);
            }
            if (this.lblTalk1.parent) {
                this.lblTalk1.parent.removeChild(this.lblTalk1);
            }
            if (this.lblDesc.parent) {
                this.lblDesc.parent.removeChild(this.lblDesc);
            }
            if (this.lblDesc1.parent) {
                this.lblDesc1.parent.removeChild(this.lblDesc1);
            }
            if (this.lblName.parent) {
                this.lblName.parent.removeChild(this.lblName);
            }
            if (this.lblName1.parent) {
                this.lblName1.parent.removeChild(this.lblName1);
            }
            this.height = 32;
            this.bmpIcon.visible = true;
            this.lblTitle.visible = true;
            this.bmpTitleBack.visible = true;
            this.bmpBuluo.visible = false;
            this.lblTitle.text = "";
            this.lblDesc.text = "";
            this.lblDesc1.text = "";
            this.bmpIcon.source = null;
        };
        LiveTalkChatItem.cacheDict = {};
        return LiveTalkChatItem;
    }(eui.Component));
    live.LiveTalkChatItem = LiveTalkChatItem;
    egret.registerClass(LiveTalkChatItem,'live.LiveTalkChatItem');
})(live || (live = {}));
