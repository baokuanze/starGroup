var groupXuan;
(function (groupXuan) {
    /**
     *
     * @author
     *
     */
    var GroupXuan = (function (_super) {
        __extends(GroupXuan, _super);
        function GroupXuan() {
            _super.call(this);
            this.skinName = "src/view/gameUI/rankGroupContribution/groupXuan/GroupXuanSkin.exml";
        }
        var d = __define,c=GroupXuan,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_title.fontFamily = "Heiti SC";
                this.lable_groupName.fontFamily = "Heiti SC";
            }
            this.rect_join.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                system.GroupJoin.join(this.group_openid);
            }, this);
        };
        p.setData = function (obj) {
            this.lable_title.text = window["hexToDec"](obj["message"]);
            this.lable_groupName.text = window["hexToDec"](obj["group_name"]);
            RES.getResByUrl(obj["group_face"], this.addGroupIcon, this, RES.ResourceItem.TYPE_IMAGE);
            this.group_openid = obj["group_openid"];
        };
        //        public onTimeUpdate():void{
        //            var time = new Date().getTime();
        //            if(time >= this.endTime){
        //                this.dispatchEventWith('click',false,this);
        //            }
        //        }
        p.addGroupIcon = function (source) {
            this.img_groupIcon.texture = source;
        };
        return GroupXuan;
    }(eui.Component));
    groupXuan.GroupXuan = GroupXuan;
    egret.registerClass(GroupXuan,'groupXuan.GroupXuan');
})(groupXuan || (groupXuan = {}));
