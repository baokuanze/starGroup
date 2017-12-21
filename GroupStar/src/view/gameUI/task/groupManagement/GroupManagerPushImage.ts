module groupManagement {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagerPushImage extends eui.Component{
    	
    	public addImage:string;
    	public addSmallImg:string;
        public btn_add:eui.Image;
        public index:number = 0;
        
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/groupManagement/GroupManagerPushImageSkin.exml";
		}
		
        public childrenCreated(): void {
            this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changerImagePic,this);
        }
        
        public changerImagePic(e: egret.Event): void {
            selectImage(this.selectedHandler,this,250);//读取大图
        }
        public setImage(str:string):void{
            RES.getResByUrl(str,this.setPic,this,RES.ResourceItem.TYPE_IMAGE);
        }
        
        private setPic(source:egret.Texture):void{
            this.btn_add.texture = source
            this.btn_add.width = 133;
            this.btn_add.height = 133;
        }
        

        private selectedHandler(thisRef: any,imgURL: string,file: Blob,smallUrl:string): void {
            RES.getResByUrl(imgURL,thisRef.compFunc,thisRef,RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(smallUrl,thisRef.compFunc1,thisRef,RES.ResourceItem.TYPE_IMAGE);
        }
        

        private compFunc(texture: egret.Texture): void {
           //首先创建的为0，点击为0时修改为
            var base64str = texture.toDataURL("image/jpeg");//使用默认texture尺寸
            this.addImage = base64str;
            
            if(this.index == 1){  // 修改
                RES.getResByUrl(base64str,this.changePic1,this,RES.ResourceItem.TYPE_IMAGE);
            }
            if(this.index == 2) {  // 修改
                RES.getResByUrl(base64str,this.changePic3,this,RES.ResourceItem.TYPE_IMAGE);
            }
            if(this.index == 3) {  // 修改
                RES.getResByUrl(base64str,this.changePic1,this,RES.ResourceItem.TYPE_IMAGE);
            }

            if(GameApp.Manager.viewManager.groupManager.hostManager.groupManagementPush.group_addToImg.numElements >4) {
                return;
            } else {
                if(this.index == 0){
                    console.log("添加一项");
                    RES.getResByUrl(base64str,this.changePic2,this,RES.ResourceItem.TYPE_IMAGE); //边创建边修改
                    var addImgitem = new groupManagement.GroupManagerPushImage();
                    GameApp.Manager.viewManager.groupManager.hostManager.groupManagementPush.group_addToImg.addChild(addImgitem);
                    addImgitem.index = 0;
                }
            }
        }

        private compFunc1(texture: egret.Texture): void {
            var base64str = texture.toDataURL("image/jpeg");//使用默认texture尺寸
            this.addSmallImg = base64str;
        }
        
        private changePic1(source: egret.Texture): void {
            this.btn_add.texture = null;
            this.btn_add.texture = source
            this.btn_add.width = 133;
            this.btn_add.height = 133;
            this.index = 2  //修改
        }
        private changePic3(source: egret.Texture): void {
            this.btn_add.texture = null;
            this.btn_add.texture = source
            this.btn_add.width = 133;
            this.btn_add.height = 133;
            this.index = 2
        }
        
        private changePic2(source: egret.Texture): void {
            this.btn_add.texture = null;
            this.btn_add.texture = source
            this.btn_add.width = 133;
            this.btn_add.height = 133;
            this.index = 3
        }
	}
}
