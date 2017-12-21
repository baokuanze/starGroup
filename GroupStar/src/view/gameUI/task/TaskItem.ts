module task {
	/**
	 *
	 * @author 
	 *
	 */
    export class TaskItem extends eui.Component{
        private static cacheDict: Object = {}; 
        private itmImgId: eui.Image;
        private itmTtle: eui.Label;
        private itmRwd: eui.Label;
        private btnTxt:eui.Label;
        private taskBtn: eui.Rect;
        /**生產*/
        public static produce(mtype: string = "1",index: number = 0): TaskItem {
            if(TaskItem.cacheDict[mtype] == null) {
                TaskItem.cacheDict[mtype] = [];
            }
            var dict: TaskItem[] = TaskItem.cacheDict[mtype];
            var theFighter: TaskItem;
            if(dict.length > 0) {
                theFighter = dict.pop();
            } else {
                theFighter = new TaskItem();
            }
            return theFighter;
        }
        /**回收*/
        public static reclaim(obj: TaskItem,mtype: string = "1"): void {
            if(TaskItem.cacheDict[mtype] == null) {
                TaskItem.cacheDict[mtype] = [];
            }
            var dict: TaskItem[] = TaskItem.cacheDict[mtype];
            if(dict.indexOf(obj) == -1) {
                dict.push(obj);
                obj.clear();
            }
        }
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/task/TaskItemSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()) {
                this.itmTtle.fontFamily = "Heiti SC";
                this.itmRwd.fontFamily="Heiti SC";
                this.btnTxt.fontFamily="Heiti SC";
            }
        }
        private url: string;
        
        public setData(obj:Object,data:Object,pre):void{
            this.url = obj['img'];
            RES.getResByUrl(this.url,this.load_end,this,RES.ResourceItem.TYPE_IMAGE);
            var itmtitle = window["hexToDec"](obj['name'])+ '(' + window["hexToDec"](obj['desc']) + '<font color=#fe5a4e>'+obj['num']+'</font>' + '/' + obj['need_num'] + ')';
            this.itmTtle.textFlow = (new egret.HtmlTextParser).parser(itmtitle);
            this.itmRwd.text = this.getRwdText(obj);
            
            //签到按钮是否隐藏
            if(obj['type']!=0){
                this.taskBtn.visible = false;
                this.btnTxt.visible = false;
            }else{
                //签到btn事件
                this.signBtn(obj,data,pre);
            }
            
        }
        private signBtn(obj,data,pre):void{
            var self = this;
            
            if(obj['user_num']!=0){
                //self.taskBtn.fillColor = 0x4b4b4b;
                self.taskBtn.visible = false;
                self.btnTxt.text = '已签到';
                self.taskBtn.touchEnabled = false; 
                
            }

            if(data['is_final'] && obj['num']==obj['need_num']){
                self.taskBtn.fillColor = 0x4b4b4b;
                self.taskBtn.visible = false;
                self.btnTxt.text = '已完成';
                self.taskBtn.touchEnabled = false; 
            }
            if(obj['type']==0){
                this.taskBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                    
                    var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.group_openid + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/signIn",{ user_id: GameApp.Manager.dataManager.uid,group_openid: GameApp.Manager.dataManager.group_openid,sign: sign },function(jsdata: Object) {
                        if(jsdata['st'] == 1){
                            if(jsdata["add_lucky_star"]>0){
                                system.TipText.produce().open('钻石+'+jsdata["add_lucky_star"]);
                                GameApp.Manager.dataManager.lucystar = jsdata["lucky_star"];
                            }
                            GameApp.Manager.viewManager.gameMainUI.setLucky();
                            self.taskBtn.touchEnabled = false; 
                            self.taskBtn.fillColor = 0x4b4b4b;
                            self.taskBtn.visible = false;
                            self.btnTxt.text = '已签到';
                            var itmtitle = window["hexToDec"](obj['name']) + '(' + window["hexToDec"](obj['desc']) + '<font color=#fe5a4e>' + (obj['num']+1) + '</font>' + '/' + obj['need_num'] + ')';
                            self.itmTtle.textFlow = (new egret.HtmlTextParser).parser(itmtitle);
                           
                            //如
                            console.log((obj['num'] + 1) , obj['need_num']);
                            if((obj['num'] + 1).toString() == obj['need_num']){
                               
                                if(!data['is_final']){
                                    var itmtitle = window["hexToDec"](obj['name']) + '(' + window["hexToDec"](obj['desc']) + '<font color=#fe5a4e>' + (obj['num'] + 1) + '</font>' + '/' + data['next'].count + ')';
                                    self.itmTtle.textFlow = (new egret.HtmlTextParser).parser(itmtitle);
                                    this.itmRwd.text = this.getRwdText(data['next']);
                                    pre.lb2.text = '等级' + data['groupInfo'].level + '  ' + '经验:' + (data['groupInfo'].exp + obj['group_exp']) + '/' + data['groupInfo'].need_exp;
                                }
                                
                                if(data['groupInfo'].exp + obj['group_exp']>=data['groupInfo'].need_exp){
                                    pre.lb2.text = '等级' + (data['groupInfo'].level+1) + '  ' + '经验:0' + '/' + data['groupInfo'].next_exp;
                                }
                            }
                        }
                    },true,this);
                    
                },this);
            }
        }
        private getRwdText(obj){
            var str = '奖励:';
            if(obj['group_exp']){
                str += '本群经验+'+ obj['group_exp']+' ';
            }
//            if(obj['star_exp']){
//                str += '明星经验+' + obj['star_exp'] + ' ';
//            }
            if(obj['intimate']) {
                str += '亲密度+' + obj['intimate'] + ' ';
            }
            if(obj['lucky_star']) {
                str += '钻石+' + obj['lucky_star'] + ' ';
            }
            if(obj["type"]==0){
                str += '首签+10钻石 ';
            }
            return str;
        }
        private load_end(source: egret.Texture): void {
            this.itmImgId.texture = source;

        }
        public clear():void{
            this.itmImgId.source=null;
            this.itmTtle.text="";
            this.itmRwd.text="";
        }
	}
}
