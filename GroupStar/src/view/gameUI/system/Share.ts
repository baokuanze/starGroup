module system {
	/**
	 *
	 * @author 
	 *
	 */
	export class Share {
		public constructor() {
		}
        public static share(obj: Object,callback: Function): void {
            window["openGroup"].share({
                appid: obj["appid"], // 选填，若不填则使用url参数appid（必须有）
                // 当前用户的openid
                openid: obj["openid"], // 选填，若不填则使用url参数openid（必须有）
                // 要分享的群的openid
                group_openid: obj["group_openid"], // 选填，若不填则使用url参数group_openid（必须有）
                // 分享消息的title
                title: obj["title"],
                // 分享消息的更具体信息
                desc: obj["desc"],
                // 分享出去打开的链接
                share_url: obj["share_url"],
                // 分享消息展示的图片
                image_url: obj["image_url"],
                debug: obj["debug"], // 可选，测试环境才需要，上线前请一定删掉
                // 分享成功的回调函数
                onSuccess: function() {
                    callback.call(this,1);
                    console.log('success',arguments);
                    //GameApp.Manager.viewManager.labelAnimation("分享成功"+arguments);
                },
                // 点取消的回调函数
                onCancel: function() {
                    callback.call(this,2);
                    console.log('cancel',arguments);
                    
                    //                    GameApp.Manager.viewManager.labelAnimation("取消分享" + arguments);
                },
                // 出错的回调函数，包括分享失败
                onError: function() {
                    var str: string = "";
                    for(var i in arguments) {
                        str += "key: " + i + ":" + arguments[i];
                    }
                    callback.call(this,3);
                     console.log('error',str);
                    //                    GameApp.Manager.viewManager.labelAnimation("分享失败" + arguments);
                }
            });
        }
	}
}
