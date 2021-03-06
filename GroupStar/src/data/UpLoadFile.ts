module data {
	/**
	 *
	 * @author 
	 *
	 */
	export class UpLoadFile {
        private static _intance: UpLoadFile;
        public static getInstance(): UpLoadFile {
            if(!this._intance){
                this._intance=new UpLoadFile();
            }
            return this._intance;
        }
		public constructor() {
		}
        public doSelect(): void {
            if(isWeixin())
                selectImageWX(this.selectedHandler,this);
            else
                selectImage(this.selectedHandler,this,0);
        }
        private selectedHandler(thisRef: any,imgURL: string,file: Blob): void {
            //alert("img selected"+imgURL);
            RES.getResByUrl(imgURL,thisRef.compFunc,thisRef,RES.ResourceItem.TYPE_IMAGE);
            //getImageData(file,thisRef.bytesHandler,thisRef);
        }
            private bytesHandler(thisRef: any,imgBytes: ArrayBuffer): void {
            console.log("大图数据:" + imgBytes);
        }
        private compFunc(texture: egret.Texture): void {
            //alert("compFunc"+texture);
            var imgReview: egret.Bitmap = new egret.Bitmap(texture);
            imgReview.touchEnabled = true;
            imgReview.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.removeImgReview,this);
//            this.addChild(imgReview);
            console.log('选择了:',texture);

            this.uploadImgByTexture(texture);
        }
        private removeImgReview(evt: egret.TouchEvent): void {
            var imgReview: egret.Bitmap = evt.currentTarget;
//            this.removeChild(imgReview);
        } 
	
        /**
         * 根据texture获得base64数据上传给服务器
         * @param texture
         */
        private uploadImgByTexture(texture: egret.Texture) {
            console.log('texture.wid:' + texture.textureWidth + ",hei:" + texture.textureHeight);
        
            //---------------------------------------------------------------------------------------------------------------------------------------
            //第二个参数就是你所希望截取的区域了，默认为texture整个大小
            //var base64Str = texture.toDataURL("image/png",new egret.Rectangle(0,0,texture.textureWidth,texture.textureHeight));
            var base64Str = texture.toDataURL("image/jpeg");//使用默认texture尺寸
//            texture
            //测试正则表达式替换,只是为了测试-------------------------------------------------------------
            //var subStr = base64Str.substr(0,50);
            //var subStr = 'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD';
            //var replStr = subStr.replace(/^data:image\/\w+;base64,/,"");
            //console.log('subStr:' + subStr);
            //console.log('replStr:' + replStr);
            //base64Str = base64Str.replace(/^data:image\/\w+;base64,/,"");//测试前端直接过滤字符
            //-----------------------------------------------------------------------------------------
        
            this.uploadData(base64Str);
            //---------------------------------------------------------------------------------------------------------------------------------------
        }


        /**
         * 把base64上传给服务器
         * @param base64Str 图片的base64数据
         */
        private uploadData(base64Str) {
      
            //格式 key0=value0&key1=value1,多个变量用&连接
//            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + base64Str + "&");
//            var httpVarsStr = "sign="+sign+"&imgData=" + base64Str+"&user_id="+GameApp.Manager.uid+"&bid="+GameApp.Manager.dataManager.bid+"&group_openid="+GameApp.Manager.dataManager.group_openid;
//
//            var request = new egret.HttpRequest();
//            request.responseType = egret.HttpResponseType.TEXT;
//            request.open("http://210.51.190.141:3001/userUploadImage",egret.HttpMethod.GET);
//            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//            request.send(httpVarsStr);//发送post参数
//            request.addEventListener(egret.Event.COMPLETE,this.onDataComplete,this);
//            request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
//            request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
//            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + base64Str + "&");
//            Util.sendJson1(GameApp.Manager.dataManager.IP + "/getTaskList",{
//                user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,imgData:base64Str,sign: sign },function(obj: Object) {
//                
//            },true,this);
            var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid +"&");
            Util.sendJsonp(GameApp.Manager.dataManager.IP + "/userUploadImage",{
                user_id: GameApp.Manager.dataManager.uid,bid: GameApp.Manager.dataManager.bid,group_openid: GameApp.Manager.dataManager.group_openid,imgData:base64Str,sign: sign },function(obj: Object) {
                
            },this);
        }

        private onDataComplete(event: egret.Event) {
            var request = <egret.HttpRequest>event.currentTarget;
            var response: string = String(request.response);
            console.log("onDataComplete data : " + response);//
            system.TipText.produce().open("上传成功,请等待审核");
        }
        private onPostIOError(event: egret.IOErrorEvent): void {
            console.log("post error : " + event);
        }
        private onPostProgress(event: egret.ProgressEvent): void {
            console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        }
	}
}
