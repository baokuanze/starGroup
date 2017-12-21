var system;
(function (system) {
    /**
     *
     * @author
     *
     */
    var GroupReward = (function (_super) {
        __extends(GroupReward, _super);
        function GroupReward() {
            _super.call(this);
            this.nt = 0;
            this.nindex = 1;
            this.maxt = 0;
            this.skinName = "src/view/gameUI/system/GroupRewardSkin.exml";
        }
        var d = __define,c=GroupReward,p=c.prototype;
        GroupReward.getInstance = function () {
            if (!this._instance) {
                this._instance = new GroupReward();
            }
            return this._instance;
        };
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lbl1.fontFamily = "Heiti SC";
                this.lbl2.fontFamily = "Heiti SC";
                this.lbl3.fontFamily = "Heiti SC";
                this.lbl4.fontFamily = "Heiti SC";
                this.lbl5.fontFamily = "Heiti SC";
                this.lbl6.fontFamily = "Heiti SC";
                this.lbl7.fontFamily = "Heiti SC";
                this.lbl8.fontFamily = "Heiti SC";
                this.lbl9.fontFamily = "Heiti SC";
                this.lbl10.fontFamily = "Heiti SC";
                this.lable_RechargeCord.fontFamily = "Heiti SC";
                this.group1.visible = false;
                this.lbl9.visible = true;
            }
            else {
                this.lbl9.visible = false;
                this.group1.visible = true;
            }
            this.group2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lingqu, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
            this.group1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                system.GroupJoin.join("2970C88E2D2E0EDE54E8D57E14268B03");
            }, this);
        };
        p.close = function () {
            egret.Ticker.getInstance().unregister(this.tx, this);
            GameApp.Manager.viewManager.clearMask();
            GameApp.Manager.viewManager.TopUIStage.removeChild(this);
            /**
             * 部落幸运星转过来用到
             */
            var timeOut = setTimeout(function () {
                clearTimeout(timeOut);
                if (GameApp.Manager.dataManager.buluo != 0) {
                    var str = '您在部落中有' + GameApp.Manager.dataManager.buluo + '个幸运星，已自动转换为钻石';
                    aler.AlertPanel1.getInstance().show('', str, '', function () {
                    }, this);
                }
            }, 300);
        };
        p.lingqu = function () {
            this.group2.visible = false;
            this.btn1.visible = true;
            system.TipText.produce().open("钻石+" + this.obj["total_reward"]);
        };
        p.show = function (obj) {
            if (!obj)
                return;
            if (!this.obj) {
                this.obj = obj;
                if (!obj["canReward"]) {
                    return;
                }
                var self = this;
                GameApp.Manager.viewManager.maskStage(.4);
                GameApp.Manager.viewManager.TopUIStage.addChild(this);
                this.x = (750 - 726) / 2;
                this.y = (egret.MainContext.instance.stage.stageHeight - 924) / 2;
                this.lbl4.text = "每日签到:" + obj["sign_count"] + "人,奖励" + obj["sign_reward"] + "钻" + ",奖励" + obj["sign_credits"] + "点群积分";
                this.lbl5.text = "集结成功:" + obj["mass_count"] + "次,奖励" + obj["mass_credits"] + "点群积分";
                this.lbl6.text = "完成众筹:" + obj["crowdfunding_count"] + "次,奖励" + obj["crowdfunding_reward"] + "钻" + ",奖励" + obj["crowdfunding_credits"] + "点群积分";
                this.lbl2.text = obj["total_reward"];
                this.lable_RechargeCord.text = "昨日充值:" + "本群昨日充值" + obj["recharge_count"] + "元,奖励" + obj["recharge_credits"] + "点群积分";
                if (obj["canReward"]) {
                    this.group2.visible = true;
                    this.btn1.visible = false;
                }
                else {
                    this.group2.visible = false;
                    this.btn1.visible = true;
                }
                egret.Ticker.getInstance().register(this.tx, this);
                this.bmpTX.source = "p1_jltx1";
                this.maxt = 1000;
            }
        };
        p.tx = function (ct) {
            this.nt += ct;
            if (this.nt >= this.maxt) {
                this.nt = 0;
                this.nindex++;
                this.bmpTX.source = "p1_jltx" + this.nindex;
                if (this.nindex == 7) {
                    this.nindex = 0;
                    this.maxt = 3000;
                }
                else {
                    this.maxt = 100;
                }
            }
        };
        return GroupReward;
    }(eui.Component));
    system.GroupReward = GroupReward;
    egret.registerClass(GroupReward,'system.GroupReward');
})(system || (system = {}));
