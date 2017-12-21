module buyTicketActive {
	/**
	 *
	 * @author 
	 *
	 */
	export class BuyTicket extends eui.Component{
        private btn_buyTicket:eui.Image;
        private lb_buy:eui.Label;
        private srco:eui.Scroller;
        private lb_fans:eui.Label;
        private lb_role1:eui.Label;
        private lb_role2:eui.Label;
        private lb_role0: eui.Label;
        private lb_role3: eui.Label;
        private btn_newCommom:eui.Rect;
        private btn_HotCommon:eui.Rect;
        private lb_newCommon:eui.Label;
        private lb_hotCommon:eui.Label;
        private group_commonData:eui.Group;
        private group_commonHotData:eui.Group;
        private btnTalk:eui.Image;
        private txtInput:eui.EditableText;
        private group_pushTalk:eui.Group;
        private img_paiseIcon:eui.Image;
        private arr: Array<eui.Component> = [];
        private send: boolean = false;
        private currentGroup:number = 0;
        private type:number = 1;
        private btn_close:eui.Image;
        private btnHelp:eui.Rect;
        private groupHelp:eui.Group;
        private lb6:eui.Label;
        private lb7: eui.Label;
        private lb8: eui.Label;
        private lb9: eui.Label;
        private lb10: eui.Label;
        private lb11: eui.Label;
        private lb12: eui.Label;
        
        private group_changeButtom0:eui.Group;
        private lb_newCommon0:eui.Label;
        private lb_hotCommon0:eui.Label;
        private btn_newCommom0:eui.Rect;
        private btn_HotCommon0:eui.Rect;
        private btn_push:boolean = true;
        private lb_number:eui.Label;
        private lb_number0:eui.Label;
		public constructor() {
    		super();
            this.skinName = "src/view/gameUI/buyTicketActive/BuyTicketSkin.exml";
		}
        public childrenCreated(): void {
            if(Tools.getInstance().isIphone()){
                this.lb_buy.fontFamily = "Heiti SC";
                this.lb_fans.fontFamily = "Heiti SC";
                this.lb_role1.fontFamily = "Heiti SC";
                this.lb_role2.fontFamily = "Heiti SC";
                this.lb_role0.fontFamily = "Heiti SC";
                this.lb_role3.fontFamily = "Heiti SC";
                this.lb_newCommon.fontFamily = "Heiti SC";
                this.lb_hotCommon.fontFamily = "Heiti SC";
                this.lb_newCommon0.fontFamily = "Heiti SC";
                this.lb_hotCommon0.fontFamily = "Heiti SC";
                this.lb6.fontFamily = "Heiti SC";
                this.lb7.fontFamily = "Heiti SC";
                this.lb8.fontFamily = "Heiti SC";
                this.lb9.fontFamily = "Heiti SC";
                this.lb10.fontFamily = "Heiti SC";
                this.lb11.fontFamily = "Heiti SC";
                this.lb12.fontFamily = "Heiti SC";
                this.lb_number.fontFamily = "Heiti SC";
                this.lb_number0.fontFamily = "Heiti SC";
            }
            this.lb_hotCommon.size = 32;
            this.lb_hotCommon.textColor = 0x2da2ec;
            this.lb_hotCommon0.size = 32;
            this.lb_hotCommon0.textColor = 0x2da2ec;
            
            this.srco.addEventListener(eui.UIEvent.CHANGE,this.change,this);
            
            RES.getResByUrl('http://cdn.xintiao100.com/star2.0/images/game_icon.png',this.load_personIcon,this,RES.ResourceItem.TYPE_IMAGE);
            this.btn_buyTicket.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid+""+ "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanLink",{"user_id":GameApp.Manager.dataManager.uid,sign: sign },function(obj: Object) {
                    if(obj["st"] == 1) {
                        location.href = obj["data"]['url'];
                    }
                },true,this)
            },this);
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_BEGIN,function(){
                var self: BuyTicket = this;
                self.groupHelp.visible = true;
                    GameApp.Manager.stage.addEventListener(egret.TouchEvent.TOUCH_END,function(){
                        var self: BuyTicket = this;
                        self.groupHelp.visible = false;
                    },self);                  
                },this);
           // 最新应援
            this.btn_newCommom.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                    var self: BuyTicket = this;
                    self.lb_newCommon.size = 32;
                    self.lb_newCommon.textColor = 0x2da2ec;
                    self.lb_hotCommon.size = 30;
                    self.lb_hotCommon.textColor = 0x989898;
                    
                    self.lb_newCommon0.size = 32;
                    self.lb_newCommon0.textColor = 0x2da2ec;
                    self.lb_hotCommon0.size = 30;
                    self.lb_hotCommon0.textColor = 0x989898;
                    
                    self.lb_number.textColor = 0x2da2ec;
                    self.lb_number0.textColor = 0x2da2ec;
                    
                    while(self.group_commonHotData.numElements > 0) {
                        var ite: buyTicketActive.CommentStyle = <buyTicketActive.CommentStyle>self.group_commonHotData.getElementAt(self.group_commonHotData.numElements - 1);;
                        buyTicketActive.CommentStyle.reclaim(ite);
                        if(ite.parent) {
                            ite.parent.removeChild(ite);
                        }
                    }
                    if(self.group_commonData.numElements == 0){
                        self.arr = [];
                        self.currentGroup = 0;
                        self.type = 0;
                        self.send = false;
                        var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + self.type + self.currentGroup + "&");
                        Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanComments",{ "user_id": GameApp.Manager.dataManager.uid,type: self.type,index: self.currentGroup,sign: sign },function(obj: Object) {
                        if(obj["st"] == 1) {
                            self.setData(obj);
                        }
                        },true,this)
                    }
//                    console.log(self.group_commonHotData.numElements,self.group_commonData.numElements,"length");
                },this);
                
            // 最新应援
            this.btn_newCommom0.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                var self: BuyTicket = this;
                self.lb_newCommon.size = 32;
                self.lb_newCommon.textColor = 0x2da2ec;
                self.lb_hotCommon.size = 30;
                self.lb_hotCommon.textColor = 0x989898;

                self.lb_newCommon0.size = 32;
                self.lb_newCommon0.textColor = 0x2da2ec;
                self.lb_hotCommon0.size = 30;
                self.lb_hotCommon0.textColor = 0x989898;
                
                self.lb_number.textColor = 0x2da2ec;
                self.lb_number0.textColor = 0x2da2ec;
                self.group_changeButtom0.visible = false;

                while(self.group_commonHotData.numElements > 0) {
                    var ite: buyTicketActive.CommentStyle = <buyTicketActive.CommentStyle>self.group_commonHotData.getElementAt(self.group_commonHotData.numElements - 1);;
                    buyTicketActive.CommentStyle.reclaim(ite);
                    if(ite.parent) {
                        ite.parent.removeChild(ite);
                    }
                }
                if(self.group_commonData.numElements == 0) {
                    self.arr = [];
                    self.currentGroup = 0;
                    self.type = 0;
                    self.send = false;
                    var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + self.type + self.currentGroup + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanComments",{ "user_id": GameApp.Manager.dataManager.uid,type: self.type,index: self.currentGroup,sign: sign },function(obj: Object) {
                        if(obj["st"] == 1) {
                            self.setData(obj);
                        }
                    },true,this)
                }
                console.log(self.group_commonHotData.numElements,self.group_commonData.numElements,"length");
            },this);
                
                
                // 最热应援
            this.btn_HotCommon.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                    var self: BuyTicket = this;
                    self.lb_hotCommon.size = 32;
                    self.lb_hotCommon.textColor = 0x2da2ec;
                    self.lb_newCommon.size = 30;
                    self.lb_newCommon.textColor = 0x989898;
                    
                    self.lb_hotCommon0.size = 32;
                    self.lb_hotCommon0.textColor = 0x2da2ec;
                    self.lb_newCommon0.size = 30;
                    self.lb_newCommon0.textColor = 0x989898;
                    self.lb_number.textColor = 0x989898;
                    self.lb_number0.textColor = 0x989898;
                    
                    self.type = 1;
                    while(self.group_commonData.numElements > 0) {
                        var ite: buyTicketActive.CommentStyle = <buyTicketActive.CommentStyle>self.group_commonData.getElementAt(self.group_commonData.numElements - 1);;
                        buyTicketActive.CommentStyle.reclaim(ite);
                        if(ite.parent) {
                            ite.parent.removeChild(ite);
                        }
                    }
                    if(self.group_commonHotData.numElements == 0) {
                        self.arr = [];
                        self.currentGroup = 0;
                        self.send = false;
                        var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + self.type + self.currentGroup + "&");
                        Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanComments",{ "user_id": GameApp.Manager.dataManager.uid,type: self.type,index: self.currentGroup,sign: sign },function(obj: Object) {
                            if(obj["st"] == 1) {
                                self.setDataHot(obj);
                            }
                        },true,this)
                    }
//                    console.log(self.group_commonHotData.numElements,self.group_commonData.numElements,"length");
                },this);
                
            // 最热应援
            this.btn_HotCommon0.addEventListener(egret.TouchEvent.TOUCH_TAP,function() {
                var self: BuyTicket = this;
                self.lb_hotCommon.size = 32;
                self.lb_hotCommon.textColor = 0x2da2ec;
                self.lb_newCommon.size = 30;
                self.lb_newCommon.textColor = 0x989898;

                self.lb_hotCommon0.size = 32;
                self.lb_hotCommon0.textColor = 0x2da2ec;
                self.lb_newCommon0.size = 30;
                self.lb_newCommon0.textColor = 0x989898;
                
                self.lb_number.textColor = 0x989898;
                self.lb_number0.textColor = 0x989898;
                
                self.group_changeButtom0.visible = false;
                self.type = 1;
                while(self.group_commonData.numElements > 0) {
                    var ite: buyTicketActive.CommentStyle = <buyTicketActive.CommentStyle>self.group_commonData.getElementAt(self.group_commonData.numElements - 1);;
                    buyTicketActive.CommentStyle.reclaim(ite);
                    if(ite.parent) {
                        ite.parent.removeChild(ite);
                    }
                }
                if(self.group_commonHotData.numElements == 0) {
                    self.arr = [];
                    self.currentGroup = 0;
                    self.send = false;
                    var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + self.type + self.currentGroup + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanComments",{ "user_id": GameApp.Manager.dataManager.uid,type: self.type,index: self.currentGroup,sign: sign },function(obj: Object) {
                        if(obj["st"] == 1) {
                            self.setDataHot(obj);
                        }
                    },true,this)
                }
//                console.log(self.group_commonHotData.numElements,self.group_commonData.numElements,"length");
            },this);
                
            
            this.txtInput.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var self: BuyTicket = this;
                    if(self.txtInput.text =="发送应援"){
                        self.txtInput.text = "";
                    }
                },this);
            this.btnTalk.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                var self: BuyTicket = this;
                if(self.txtInput.text == "发送应援" || self.txtInput.text == ""){
                    return;
                }
                var comment = self.txtInput.text;
                if(self.btn_push){
                    self.btn_push = false;
                    var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + "" + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + comment + "&");
                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/addHaiquanComment",{ 'user_id': GameApp.Manager.dataManager.uid,"bid": GameApp.Manager.dataManager.bid,'group_openid': GameApp.Manager.dataManager.group_openid,'comment': comment,sign: sign },function(obj: Object) {
                        if(obj["st"] == 1) {
                            if(obj['data']["add_lucky_star"]) {
                                GameApp.Manager.dataManager.lucystar += obj['data']["add_lucky_star"];
                                if(obj['data']["add_lucky_star"] > 0) {
                                    system.TipText.produce().open('钻石+3');
                                }
                            }
                            self.txtInput.text = "";
                            //                            if(self.type == 1){
                            //                            }else{
                            ////                                self.addNewCommon(self.txtInput.text);
                            //                            }
                            var timeOut = setTimeout(function() {
                                clearTimeout(timeOut);

                                self.lb_newCommon.size = 32;
                                self.lb_newCommon.textColor = 0x2da2ec;
                                self.lb_hotCommon.size = 30;
                                self.lb_hotCommon.textColor = 0x989898;

                                self.lb_newCommon0.size = 32;
                                self.lb_newCommon0.textColor = 0x2da2ec;
                                self.lb_hotCommon0.size = 30;
                                self.lb_hotCommon0.textColor = 0x989898;
                                //最新
                                while(self.group_commonData.numElements > 0) {
                                    var ite: buyTicketActive.CommentStyle = <buyTicketActive.CommentStyle>self.group_commonData.getElementAt(self.group_commonData.numElements - 1);;
                                    buyTicketActive.CommentStyle.reclaim(ite);
                                    if(ite.parent) {
                                        ite.parent.removeChild(ite);
                                    }
                                }
                                //最热
                                while(self.group_commonHotData.numElements > 0) {
                                    var ite: buyTicketActive.CommentStyle = <buyTicketActive.CommentStyle>self.group_commonHotData.getElementAt(self.group_commonHotData.numElements - 1);;
                                    buyTicketActive.CommentStyle.reclaim(ite);
                                    if(ite.parent) {
                                        ite.parent.removeChild(ite);
                                    }
                                }

                                self.currentGroup = 0;
                                self.send = false;
                                if(self.group_commonData.numElements == 0) {
                                    self.arr = [];
                                    self.currentGroup = 0;
                                    self.type = 0;
                                    self.send = false;
                                    var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + self.type + self.currentGroup + "&");
                                    Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanComments",{ "user_id": GameApp.Manager.dataManager.uid,type: self.type,index: self.currentGroup,sign: sign },function(obj: Object) {
                                        if(obj["st"] == 1) {
                                            self.setData(obj);
                                            self.btn_push = true;
                                        }
                                    },true,this)
                                }
                            },50)
                        }
                    },true,this)
                }
                },this);
            this.srco.height = egret.MainContext.instance.stage.stageHeight - 226-116;
            this.group_pushTalk.y = egret.MainContext.instance.stage.stageHeight - 116;
            this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
                GameApp.Manager.controllerManager.buyTicketActiveController.hide();
                GameApp.Manager.controllerManager.gameMainController.show();
            },this)
        }
        public setData(obj:Object){
            this.srco.viewport.scrollV = 0;
            this.add(obj,this.group_commonData);
            this.lb_number.text = "(" + obj['data']['count'] + ')';
            this.lb_number0.text = "(" + obj['data']['count'] + ')';
        }
        public load_personIcon(source:egret.Texture){
            this.img_paiseIcon.texture = source;
        }
        public setDataHot(_obj: Object) {
            this.srco.viewport.scrollV = 0;
            this.add(_obj,this.group_commonHotData)
            this.lb_number.text = "(" + _obj['data']['count'] + ')';
            this.lb_number0.text = "(" + _obj['data']['count'] + ')';
        }
        
        public add(_obj: Object,groupType:eui.Group): void {
            var arrL: number = this.arr.length;
            for(var i: number = 0;i < _obj['data']['list'].length; i++) {
                var obj1: Object = _obj["data"]['list'][i];
                var item1:CommentStyle = buyTicketActive.CommentStyle.produce();
                groupType.addChild(item1);
                this.arr.push(item1);
            }
            for(var i: number = this.arr.length - 1;i >= arrL;i--) {
                var obj1: Object = _obj["data"]['list'][i - arrL];
//                console.log(i);
                var item: CommentStyle = <CommentStyle>this.arr[i];
                item.setData(obj1);
            }
            
            this.lb_number.text = "(" + _obj['data']['count'] + ')';
            this.lb_number0.text = "(" + _obj['data']['count'] + ')';
        }
        
        public change(): void {
            if(this.srco.viewport.scrollV > 377){
                this.group_changeButtom0.visible = true;
            }else {
                this.group_changeButtom0.visible = false;
            }
            if(this.srco.viewport && this.arr.length > 0) {
                var len = this.arr.length;
//                console.log(this.srco.viewport.scrollV,"scrolV",this.arr[len - 1].y,"y",this.arr[0].y,"0y",this.srco.height,"height");
                if(this.srco.viewport.scrollV >= this.arr[len-1].y - this.srco.height + 690) {
                    this.ajaxPost();
                }
            }
        }
        
        public ajaxPost(): void {
            if(!this.send) {
                this.send = true;
                var self = this;
                this.currentGroup++;
                var sign: string = new md5().hex_md5(GameApp.Manager.dataManager.uid + this.type + this.currentGroup + "&");
                Util.sendJson1(GameApp.Manager.dataManager.IP + "/getHaiquanComments",{ user_id: GameApp.Manager.dataManager.uid,type:this.type,index: this.currentGroup,sign: sign },function(obj: Object) {
                    if(obj['st'] == 1) {
                        if(self.type == 1){
                            self.add(obj,self.group_commonHotData);
                        }else if(self.type == 0){
                            self.add(obj,self.group_commonData);
                        }
                        if(obj['data'].length < 30){
                            self.send = true;
                        }else{
                            self.send = false;
                        }
                    }
                },true,this);
            }
        }
        
//        public addNewCommon(text:string){
//            var commomItem = buyTicketActive.CommentStyle.produce();
//            commomItem.setData1(text);
//            this.group_commonData.addChildAt(commomItem,0);
//        }
        public clear(){
            var self:BuyTicket = this;
            this.group_changeButtom0.visible = false;
            this.lb_hotCommon.size = 32;
            this.lb_hotCommon.textColor = 0x2da2ec;
            this.lb_hotCommon0.size = 32;
            this.lb_hotCommon0.textColor = 0x2da2ec;
            
            this.lb_newCommon.size = 30;
            this.lb_newCommon.textColor = 0x989898;
            this.lb_newCommon0.size = 30;
            this.lb_newCommon0.textColor = 0x989898;
            
            self.lb_number.textColor = 0x989898;
            self.lb_number0.textColor = 0x989898;
            
            this.arr = [];
            self.currentGroup = 0;
            self.type = 1;
            self.send = false;
            self.btn_push = true;

            while(self.group_commonHotData.numElements > 0) {
                var ite: buyTicketActive.CommentStyle = <buyTicketActive.CommentStyle>self.group_commonHotData.getElementAt(self.group_commonHotData.numElements - 1);;
                buyTicketActive.CommentStyle.reclaim(ite);
                if(ite.parent) {
                    ite.parent.removeChild(ite);
                }
            }
            while(self.group_commonData.numElements > 0) {
                var ite: buyTicketActive.CommentStyle = <buyTicketActive.CommentStyle>self.group_commonData.getElementAt(self.group_commonData.numElements - 1);;
                buyTicketActive.CommentStyle.reclaim(ite);
                if(ite.parent) {
                    ite.parent.removeChild(ite);
                }
            }
        }
	}
}
