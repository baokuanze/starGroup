module system {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupJoin {
		public constructor() {
		}
        public static join(target_group_openid:string):void{
//            if(!Tools.getInstance().isIphone()) {
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.group_openid + target_group_openid + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/joinGroup",{ "user_id": GameApp.Manager.dataManager.uid,"group_openid": GameApp.Manager.dataManager.group_openid,"target_group_openid": target_group_openid,sign: sign },function(obj: Object) {
                    if(obj["st"] == 1) {
//                        system.TipText.produce().open('调用openGroup');
                        window["openGroup"].join({
                            appid: obj["appid"],
                            openid: obj["openid"],
                            openkey: obj["openkey"],
                            source_group_openid: obj["source_group_openid"], // 当前群的openid
                            group_openid: obj["group_openid"] // 要打开资料卡的群的 openid
                        });
                    }
                },true,this)
//            }
		}
	}
}
