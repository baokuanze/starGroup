var fansRecruit;
(function (fansRecruit) {
    /**
     *
     * @author
     *
     */
    var FansRecruitItem = (function (_super) {
        __extends(FansRecruitItem, _super);
        function FansRecruitItem() {
            _super.call(this);
            this.skinName = "src/view/gameUI/fansRecruit/FansRecruitItemSkin.exml";
            this.iconNow = new task.TaskIcon();
        }
        var d = __define,c=FansRecruitItem,p=c.prototype;
        p.childrenCreated = function () {
            this.groupData.addChild(this.iconNow);
            if (Tools.getInstance().isIphone()) {
                this.namet.fontFamily = "Heiti SC";
                //                this.level.fontFamily = "Heiti SC";
                this.pnum.fontFamily = "Heiti SC";
                this.gonggao.fontFamily = "Heiti SC";
                this.position.fontFamily = "Heiti SC";
                this.btnJoin.visible = false;
            }
        };
        p.setData = function (obj) {
            this.obj = obj;
            this.getHead(obj['group_face']);
            this.namet.text = window["hexToDec"](obj['group_name']);
            this.pnum.text = obj['member_num'] + '人';
            //            this.level.text = 'LV'+obj['level'];
            this.gonggao.text = '群公告:' + window["hexToDec"](obj['notice']);
            this.position.text = window["hexToDec"](obj['poi_name']);
            var len = 0;
            this.iconNow.setText(obj["level"]);
            //            for(var i = 0;i < this.namet.text.length;i++) {
            //                var length = this.namet.text.charCodeAt(i);
            //                if(length >= 0 && length <= 128) {
            //                    len += 1;
            //                }
            //                else {
            //                    len += 2;
            //                }
            //            }
            //            this.level.x = this.namet.x + len * 18 + 10;
        };
        p.getHead = function (url) {
            var self = this;
            //头像mask
            //            var msk = new egret.Shape();
            //            msk.graphics.clear();
            //            msk.graphics.beginFill(0xff0000);
            //            msk.graphics.drawRoundRect(20,23,135,135,23,23);
            //            msk.graphics.endFill();
            //头像
            RES.getResByUrl(url, function (source) {
                self.bmpIcon.source = source;
                //                var img = new eui.Image(url);
                //                img.width = img.height = 135;
                //                img.x = 20; img.y = 23;
                //                img.mask = msk;
                //                self.container.addChild(img);
                //                self.container.addChild(msk);
            }, this, RES.ResourceItem.TYPE_IMAGE);
        };
        return FansRecruitItem;
    }(eui.Component));
    fansRecruit.FansRecruitItem = FansRecruitItem;
    egret.registerClass(FansRecruitItem,'fansRecruit.FansRecruitItem');
})(fansRecruit || (fansRecruit = {}));
