module fansRecruit {
	/**
	 *
	 * @author 
	 *
	 */
    export class FansRecruitManager extends common.BaseView{
        private viewManager: view.ViewManager;
        public fansRecruitUI: FansRecruitUI;
        public obj: Object;
        public testObj: Object;
        public constructor(viewManager: view.ViewManager) {
            super(viewManager);
        }
        public show(): void {
            this.test();
            if(!this.fansRecruitUI) {
                this.fansRecruitUI = new FansRecruitUI();
                this.BottomUIStage.addChild(this.fansRecruitUI);

                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid_save+ '1' + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/starFansGroups",{ user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid_save,page: '1',sign: sign },function(obj: Object) {
                    if(obj["st"]==1){
                        this.fansRecruitUI.setData(obj);    
                    }
                    
                },true,this);
                 
                //this.fansRecruitUI.setData(this.testObj);
            }
        }
        public hide(): void {
            if(this.fansRecruitUI) {
                this.fansRecruitUI.parent.removeChild(this.fansRecruitUI);
                this.fansRecruitUI = null;
            }
        }
        public test():void{
            this.testObj = {
                "st": 1,
                "groups": [
                    {
                        "group_name": "\\u6d4b试\\u006c\\u0076\\u0033\\u9ad8",
                        "group_face": "http://p.qlogo.cn/gh_open/Jyh05icwdOIAJzIEe3qLONbaHiaUM5t2nm/100",
                        "poi_name": "\\u5317\\u4eac",
                        "level": 2,
                        "notice": "\\u7fa4\\u4e3b\\u5f88\\u61d2\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e",
                        "member_num": 0
                    },
                    
                    {
                        "group_name": "\\u767e\\u5cb3\\u0026\\u0061\\u006d\\u0070\\u003b\\u817e\\u8baf\\u660e\\u661f\\u9879\\u76ee",
                        "group_face": "http://p.qlogo.cn/gh_open/Jyh05icwdOIAJzIEe3qLONbaHiaUM5t2nm/100",
                        "poi_name": "\\u5317\\u4eac",
                        "level": 1,
                        "notice": "\\u7fa4\\u4e3b\\u5f88\\u61d2\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e",
                        "member_num": 6
                    },
                    {
                        "group_name": "\\u6d4b\\u8bd5\\u006c\\u0076\\u0035",
                        "group_face": "http://p.qlogo.cn/gh_open/Jyh05icwdOIAJzIEe3qLONbaHiaUM5t2nm/100",
                        "poi_name": "\\u5317\\u4eac",
                        "level": 1,
                        "notice": "\\u7fa4\\u4e3b\\u5f88\\u61d2\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e",
                        "member_num": 0
                    },
                    {
                        "group_name": "\\u6d4b\\u8bd5\\u006c\\u0076\\u0033\\u4f4e",
                        "group_face": "http://p.qlogo.cn/gh_open/Jyh05icwdOIAJzIEe3qLONbaHiaUM5t2nm/100",
                        "poi_name": "\\u5317\\u4eac",
                        "level": 1,
                        "notice": "\\u7fa4\\u4e3b\\u5f88\\u61d2\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e",
                        "member_num": 0
                    },
                    {
                        "group_name": "\\u6d4b\\u8bd5\\u006c\\u0076\\u0035",
                        "group_face": "http://p.qlogo.cn/gh_open/Jyh05icwdOIAJzIEe3qLONbaHiaUM5t2nm/100",
                        "poi_name": "\\u5317\\u4eac",
                        "level": 1,
                        "notice": "\\u7fa4\\u4e3b\\u5f88\\u61d2\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e",
                        "member_num": 0
                    },
                    {
                        "group_name": "\\u6d4b\\u8bd5\\u006c\\u0076\\u0033\\u4f4e",
                        "group_face": "http://p.qlogo.cn/gh_open/Jyh05icwdOIAJzIEe3qLONbaHiaUM5t2nm/100",
                        "poi_name": "\\u5317\\u4eac",
                        "level": 1,
                        "notice": "\\u7fa4\\u4e3b\\u5f88\\u61d2\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e",
                        "member_num": 0
                    },
                    {
                        "group_name": "\\u6d4b\\u8bd5\\u006c\\u0076\\u0035",
                        "group_face": "http://p.qlogo.cn/gh_open/Jyh05icwdOIAJzIEe3qLONbaHiaUM5t2nm/100",
                        "poi_name": "\\u5317\\u4eac",
                        "level": 1,
                        "notice": "\\u7fa4\\u4e3b\\u5f88\\u61d2\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e",
                        "member_num": 0
                    },
                    {
                        "group_name": "\\u6d4b\\u8bd5\\u006c\\u0076\\u0033\\u4f4e",
                        "group_face": "http://p.qlogo.cn/gh_open/Jyh05icwdOIAJzIEe3qLONbaHiaUM5t2nm/100",
                        "poi_name": "\\u5317\\u4eac",
                        "level": 1,
                        "notice": "\\u7fa4\\u4e3b\\u5f88\\u61d2\\uff0c\\u4ec0\\u4e48\\u4e5f\\u6ca1\\u5199\\u007e",
                        "member_num": 0
                    }
                ],
                "page": "1"
            }
	    }
	    }
}
