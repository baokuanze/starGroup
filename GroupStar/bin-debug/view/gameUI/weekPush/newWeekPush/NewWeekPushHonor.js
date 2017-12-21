var newWeekPush;
(function (newWeekPush) {
    /**
     *
     * @author
     *
     */
    var NewWeekPushHonor = (function (_super) {
        __extends(NewWeekPushHonor, _super);
        function NewWeekPushHonor() {
            _super.call(this);
            this.skinName = "src/view/gameUI/weekPush/newWeekPush/NewWeekPushHonorSkin.exml";
        }
        var d = __define,c=NewWeekPushHonor,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_topName.fontFamily = "Heiti SC";
                this.lable_topCount.fontFamily = "Heiti SC";
                this.lable_Team.fontFamily = "Heiti SC";
            }
        };
        p.setData = function (obj, str) {
            console.log(obj, "obj");
            if (str == "sign_best") {
                this.lable_topName.text = "人气签到群";
            }
            if (str == "mass_best") {
                this.lable_topName.text = "铁杆集结群";
            }
            if (str == "crowdfunding_best") {
                this.lable_topName.text = "主力众筹群";
            }
            this.lable_topCount.text = window["hexToDec"](obj["honor_info"][str]["num"]) + "次";
            RES.getResByUrl(obj["honor_info"][str]["group_face"], this.addGroupIcon, this, RES.ResourceItem.TYPE_IMAGE);
            this.lable_Team.text = this.getStringLen(window["hexToDec"](obj["honor_info"][str]["group_name"]));
        };
        p.getStringLen = function (str) {
            var len = 0;
            var newStr = '';
            for (var i = 0; i < str.length; i++) {
                var length = str.charCodeAt(i);
                if (length >= 0 && length <= 128) {
                    len += 1;
                }
                else {
                    len += 2;
                }
                if (len < 16) {
                    newStr += str[i];
                }
                else {
                    newStr += '...';
                    return newStr;
                }
            }
            return newStr;
        };
        p.addGroupIcon = function (source) {
            this.img_starIcon.texture = source;
        };
        return NewWeekPushHonor;
    }(eui.Component));
    newWeekPush.NewWeekPushHonor = NewWeekPushHonor;
    egret.registerClass(NewWeekPushHonor,'newWeekPush.NewWeekPushHonor');
})(newWeekPush || (newWeekPush = {}));
