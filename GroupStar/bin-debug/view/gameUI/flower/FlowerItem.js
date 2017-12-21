var flower;
(function (flower) {
    /**
     *
     * @author
     *
     */
    var FlowerItem = (function (_super) {
        __extends(FlowerItem, _super);
        function FlowerItem() {
            _super.call(this);
            this.fid = 0;
            this.type = 0;
            this.canSend = true;
            this.click = 0;
            this.lastcount = -1; //赠送剩余次数
            this.price = 0;
            this.cd = 0;
            this.task_time = 0;
            this.task_timeJilu = 0;
            this.skinName = "src/view/gameUI/flower/FlowerItemSkin.exml";
            this.touchEnabled = true;
            this.touchChildren = true;
        }
        var d = __define,c=FlowerItem,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lblStar.fontFamily = "Heiti SC";
                this.lblTime.fontFamily = "Heiti SC";
                this.lblIntimate.fontFamily = "Heiti SC";
            }
            this.bmpBack.alpha = 0;
            this.bmpLian.visible = false;
            this.lblTime.visible = false;
            this.lblStar.visible = false;
        };
        p.on = function () {
            this.bmpBack.alpha = .7;
        };
        p.off = function () {
            this.bmpBack.alpha = 0;
            this.bmpLian.source = "p_lianji";
        };
        p.setLight = function () {
            this.bmpLian.source = "p_lianji1";
        };
        p.setloW = function () {
            this.bmpLian.source = "p_lianji";
        };
        p.setData = function (obj) {
            this.fid = obj["id"];
            this.type = obj["type"];
            this.lblIntimate.text = "热度+" + obj["intimate"];
            this.lblStar.text = obj["price"];
            this.price = obj["price"];
            this.click = obj["click"];
            this.bmpIcon.source = "p_gift" + this.fid + "";
            this.lastcount = obj["last"];
            if (this.click > 0) {
                this.bmpLian.visible = true;
            }
            this.lblStar.visible = true;
            this.lblTime.visible = false;
            switch (this.fid) {
                case 1:
                    this.lblStar.visible = false;
                    this.lblTime.visible = true;
                    if (obj["last"] != 0) {
                        this.lblTime.text = "免费";
                    }
                    else {
                        this.lblTime.text = "今日已送完";
                    }
                    this.bmpStar.visible = false;
                    break;
            }
        };
        p.setDJS = function (ct) {
            if (this.timeVar)
                clearInterval(this.timeVar);
            var self = this;
            this.canSend = false;
            this.task_time = ct;
            this.task_timeJilu = new Date().getTime();
            this.lblTime.visible = true;
            this.lblTime.text = Tools.getInstance().formatTime2(ct);
            this.cd = ct;
            this.timeVar = setInterval(function () {
                var NowTime = new Date().getTime();
                var t = self.task_time - (NowTime - self.task_timeJilu);
                self.cd = t;
                if (t <= 0) {
                    self.djsEnd();
                }
                else {
                    self.lblTime.text = Tools.getInstance().formatTime2(t);
                }
            }, 980);
        };
        p.djsEnd = function () {
            if (this.timeVar)
                clearInterval(this.timeVar);
            if (this.lastcount != 0) {
                this.lblTime.text = "免费";
                flower.FlowerUI.getInstance().btnSend.setState(1);
            }
            else {
                this.lblTime.text = "今日已送完";
            }
            this.canSend = true;
        };
        return FlowerItem;
    }(eui.Component));
    flower.FlowerItem = FlowerItem;
    egret.registerClass(FlowerItem,'flower.FlowerItem');
})(flower || (flower = {}));
