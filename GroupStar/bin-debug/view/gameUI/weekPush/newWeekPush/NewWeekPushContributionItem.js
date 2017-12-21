var newWeekPush;
(function (newWeekPush) {
    /**
     *
     * @author
     *
     */
    var NewWeekPushContributionItem = (function (_super) {
        __extends(NewWeekPushContributionItem, _super);
        function NewWeekPushContributionItem() {
            _super.call(this);
            this.skinName = "src/view/gameUI/weekPush/newWeekPush/NewWeekPushContributionItemSkin.exml";
        }
        var d = __define,c=NewWeekPushContributionItem,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_rankNumber.fontFamily = "Heiti SC";
                this.lable_groupName.fontFamily = "Heiti SC";
                this.lable_groupContribution.fontFamily = "Heiti SC";
                this.lable_btnJoinIn.fontFamily = "Heiti SC";
            }
            this.rect_joinIn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                system.GroupJoin.join(this.group_openid);
            }, this);
        };
        p.setData = function (obj, index) {
            if (index % 2 != 0) {
                this.rect_joinIn.fillColor = 0xe8f7fc;
            }
            else {
                this.rect_joinIn.fillColor = 0xffffff;
            }
            this.img_iconUp.source = "wp_no" + index;
            if (index <= 4) {
                this.img_number.source = "fistpag_" + index;
            }
            else {
                this.img_number.source = "fistpag_4";
            }
            this.lable_rankNumber.text = index + "";
            this.lable_groupName.text = window["hexToDec"](obj["group_name"]);
            this.lable_groupContribution.text = "贡献: " + window["hexToDec"](obj["contribution"]);
            RES.getResByUrl(obj["group_face"], this.addStarIcon, this, RES.ResourceItem.TYPE_IMAGE);
            this.group_openid = obj["group_openid"];
        };
        p.addStarIcon = function (source) {
            this.img_icon.texture = source;
        };
        return NewWeekPushContributionItem;
    }(eui.Component));
    newWeekPush.NewWeekPushContributionItem = NewWeekPushContributionItem;
    egret.registerClass(NewWeekPushContributionItem,'newWeekPush.NewWeekPushContributionItem');
})(newWeekPush || (newWeekPush = {}));
