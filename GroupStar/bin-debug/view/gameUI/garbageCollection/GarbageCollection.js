var garbageCollection;
(function (garbageCollection) {
    /**
     *
     * @author  //收集界面
     *
     */
    var GarbageCollection = (function (_super) {
        __extends(GarbageCollection, _super);
        //全部黑情况
        function GarbageCollection() {
            _super.call(this);
            this.itemArr = [];
            this.n = 0; //看自己情况
            this.jilu = 0;
            this.isLookMore = false;
            this.musicHeiArr = [];
            this.itemTvArr = [];
            this.v = 0;
            this.jiluTv = 0;
            this.tvHeiArr = [];
            this.movieHeiArr = [];
            this.itemMovieArr = [];
            this.jiluMovie = 0;
            this.o = 0;
            this.uid = 0;
            this.totalOffY = 0;
            this.skinName = "src/view/gameUI/garbageCollection/GarbageCollectionSkin.exml";
        }
        var d = __define,c=GarbageCollection,p=c.prototype;
        p.childrenCreated = function () {
            if (Tools.getInstance().isIphone()) {
                this.lable_title.fontFamily = "Heiti SC";
                this.lable_number.fontFamily = "Heiti SC";
                this.lable_TvNumber.fontFamily = "Heiti SC";
                this.lable_MovieNumber.fontFamily = "Heiti SC";
                this.lable_lookMoreMusic.fontFamily = "Heiti SC";
                this.lable_lookMoreTv.fontFamily = "Heiti SC";
                this.lable_lookMoreMovie.fontFamily = "Heiti SC";
                this.lable_NoWorks.fontFamily = "Heiti SC";
            }
            this.btn_Fx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.CloseItem, this);
            this.groupkMoreMusic.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lookMoreMusicWorks, this);
            this.groupkMoreTv.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lookMoreTVWorks, this);
            this.groupkMoreMovie.addEventListener(egret.TouchEvent.TOUCH_TAP, this.lookMoreMovieWorks, this);
        };
        p.lookMoreMusicWorks = function (e) {
            var length1 = this.itemArr.length;
            this.n = this.n - 1;
            //           console.log(this.jilu,"jilu",length1,'length',this.musicHeiArr.length,"heiLength");
            for (var i = this.jilu; i < this.musicHeiArr.length; i++) {
                var itmHeit = new garbageCollection.WorksItem();
                itmHeit.setData(this.musicHeiArr[i], 0);
                this.itemArr.push(itmHeit);
                this.group_musicItem.addChild(itmHeit);
                itmHeit.x = this.itemArr[length1 - 1 + i - this.jilu].x + this.itemArr[length1 - 1 + i - this.jilu].width + 20;
                itmHeit.y = this.n * 55;
                //                console.log(itmHeit.x,itmHeit.y,"xy")
                if (itmHeit.x + itmHeit.width > 690) {
                    this.n += 1;
                    itmHeit.x = 0;
                    itmHeit.y = this.n * 55;
                }
            }
            this.groupkMoreMusic.visible = false;
            if (this.obj["starWorks"]["2"] && !this.obj["starWorks"]["3"]) {
                this.group_TV.y = this.group_music.y + this.group_music.height + 85 + 40;
            }
            else if (!this.obj["starWorks"]["2"] && this.obj["starWorks"]["3"]) {
                this.group_Movie.y = this.group_music.y + this.group_music.height + 85 + 40;
            }
            else if (this.obj["starWorks"]["2"] && this.obj["starWorks"]["3"]) {
                this.group_TV.y = this.group_music.y + this.group_music.height + 85 + 40;
                this.group_Movie.y = this.group_TV.y + this.group_TV.height + 85;
            }
            else if (!this.obj["starWorks"]["2"] && !this.obj["starWorks"]["3"]) {
            }
        };
        p.lookMoreTVWorks = function (e) {
            var hength1 = this.itemTvArr.length;
            this.v = this.v - 1;
            //           console.log(this.jiluTv,"juluTv",this.tvHeiArr.length,"length",this.v,"v");
            for (var i = this.jiluTv; i < this.tvHeiArr.length; i++) {
                var itmHeit = new garbageCollection.WorksItem();
                itmHeit.setData(this.tvHeiArr[i], 0);
                this.itemTvArr.push(itmHeit);
                this.group_TvItem.addChild(itmHeit);
                itmHeit.x = this.itemTvArr[hength1 - 1 + i - this.jiluTv].x + this.itemTvArr[hength1 - 1 + i - this.jiluTv].width + 20;
                itmHeit.y = this.v * 55;
                if (itmHeit.x + itmHeit.width > 690) {
                    this.v += 1;
                    itmHeit.x = 0;
                    itmHeit.y = this.v * 55;
                }
            }
            if (this.obj["starWorks"]["3"]) {
                this.group_Movie.y = this.group_TV.y + this.group_TV.height + 85 + 40;
            }
            else {
            }
            this.groupkMoreTv.y = this.group_TvItem.y + this.group_TvItem.height + 5;
            this.groupkMoreTv.visible = false;
        };
        p.lookMoreMovieWorks = function (e) {
            var hength1 = this.itemMovieArr.length; // 已经发了多少个
            this.o = this.o - 1;
            //           console.log(this.o,this.jiluMovie,"o");
            for (var i = this.jiluMovie; i < this.movieHeiArr.length; i++) {
                var itmHeit = new garbageCollection.WorksItem();
                itmHeit.setData(this.movieHeiArr[i], 0);
                this.itemMovieArr.push(itmHeit);
                this.group_MovieItem.addChild(itmHeit);
                itmHeit.x = this.itemMovieArr[hength1 - 1 + i - this.jiluMovie].x + this.itemMovieArr[hength1 - 1 + i - this.jiluMovie].width + 20;
                itmHeit.y = this.o * 55;
                if (itmHeit.x + itmHeit.width > 690) {
                    this.o += 1;
                    itmHeit.x = 0;
                    itmHeit.y = this.o * 55;
                }
            }
            this.groupkMoreMovie.visible = false;
            this.groupkMoreMovie.y = this.group_MovieItem.y + this.group_MovieItem.height + 5;
        };
        //分享；
        p.share = function (e) {
            var sign = new md5().hex_md5(GameApp.Manager.dataManager.uid + GameApp.Manager.dataManager.bid + GameApp.Manager.dataManager.group_openid + "&");
            Util.sendJson1(GameApp.Manager.dataManager.IP + "/shareUserStarWorks", { user_id: GameApp.Manager.dataManager.uid, bid: GameApp.Manager.dataManager.bid, group_openid: GameApp.Manager.dataManager.group_openid, sign: sign }, function (obj) {
                system.Share.share(obj, function (n) {
                    if (n == 1)
                        system.TipText.produce().open("发送成功");
                });
            }, true, this);
        };
        p.setData = function (obj, bid, uid, type) {
            this.uid = uid;
            this.type = type;
            this.obj = obj;
            if (this.uid == GameApp.Manager.dataManager.uid) {
                this.btn_Fx.visible = true;
            }
            this.scro.height = this.stage.stageHeight;
            var starname = window["hexToDec"](obj["star_name"]);
            this.lable_title.textFlow = (new egret.HtmlTextParser).parser(window["hexToDec"](obj["user_name"]) + " " + "<font color= #f5b316>" + "点亮的 " + "</font>" + starname + "的作品");
            var cirback = Tools.getInstance().getCricleMask(this.img_ico.x + 144 / 2, this.img_ico.y + 144 / 2, this.img_ico.width, this.img_ico.parent);
            this.img_ico.mask = cirback;
            RES.getResByUrl(obj["user_pic"], this.addHeadImg, this, RES.ResourceItem.TYPE_IMAGE);
            RES.getResByUrl(obj["star_img"], this.addBgImg, this, RES.ResourceItem.TYPE_IMAGE);
            //不是自己的话
            if (this.uid != GameApp.Manager.dataManager.uid) {
                if ((obj["starWorks"]["1"] && obj["starWorks"]["1"]["get"].length > 0) || (obj["starWorks"]["2"] && obj["starWorks"]["2"]["get"].length > 0) || (obj["starWorks"]["3"] && obj["starWorks"]["3"]["get"].length > 0)) {
                    this.addLightWorks(obj);
                }
                else {
                    this.lable_NoWorks.visible = true;
                }
            }
            else {
                var offY = 0;
                if (obj["starWorks"]["1"]) {
                    var anNumber = obj["starWorks"]["1"]["not_get"] ? obj["starWorks"]["1"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["1"]["get"].length;
                    this.lable_number.text = obj["starWorks"]["1"]["get"].length + "/" + totalNumber;
                    this.group_music.visible = true;
                    this.addWorks(obj["starWorks"]["1"]["get"], 0, this.itemArr, obj["starWorks"]["1"]["not_get"] ? obj["starWorks"]["1"]["not_get"] : [], this.group_musicItem, this.groupkMoreMusic, 0, 1); //看自己情况  
                    this.musicHeiArr = obj["starWorks"]["1"]["not_get"];
                    offY += this.group_music.y + this.group_music.height + 40;
                }
                if (obj["starWorks"]["2"]) {
                    this.group_TV.visible = true;
                    var anNumber = obj["starWorks"]["2"]["not_get"] ? obj["starWorks"]["2"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["2"]["get"].length;
                    this.lable_TvNumber.text = obj["starWorks"]["2"]["get"].length + "/" + totalNumber;
                    this.addWorks(obj["starWorks"]["2"]["get"], 0, this.itemTvArr, obj["starWorks"]["2"]["not_get"] ? obj["starWorks"]["2"]["not_get"] : [], this.group_TvItem, this.groupkMoreTv, 0, 2); //看自己情况
                    this.group_TV.y = offY || 428;
                    if (offY == 0) {
                        offY += this.group_TV.y + this.group_TV.height + 40;
                    }
                    else {
                        offY += this.group_TV.height + 40;
                    }
                    this.tvHeiArr = obj["starWorks"]["2"]["not_get"];
                }
                if (obj["starWorks"]["3"]) {
                    this.group_Movie.visible = true;
                    var anNumber = obj["starWorks"]["3"]["not_get"] ? obj["starWorks"]["3"]["not_get"].length : 0;
                    var totalNumber = anNumber + obj["starWorks"]["3"]["get"].length;
                    this.lable_MovieNumber.text = obj["starWorks"]["3"]["get"].length + "/" + totalNumber;
                    this.group_Movie.y = offY || 428;
                    this.addWorks(obj["starWorks"]["3"]["get"], 0, this.itemMovieArr, obj["starWorks"]["3"]["not_get"] ? obj["starWorks"]["3"]["not_get"] : [], this.group_MovieItem, this.groupkMoreMovie, 0, 3); //看自己情况
                    this.movieHeiArr = obj["starWorks"]["3"]["not_get"];
                }
            }
        };
        p.addLightWorks = function (obj) {
            //            console.log("看别的明星");
            var offX = 0;
            var offY = 0;
            if (obj["starWorks"]["1"] && obj["starWorks"]["1"]["get"].length != 0) {
                this.group_music.visible = true;
                var anNumber = obj["starWorks"]["1"]["not_get"] ? obj["starWorks"]["1"]["not_get"].length : 0;
                var totalNumber = anNumber + obj["starWorks"]["1"]["get"].length;
                this.lable_number.text = obj["starWorks"]["1"]["get"].length + "/" + totalNumber;
                this.addWorks(obj["starWorks"]["1"]["get"], 0, this.itemArr, [], this.group_musicItem, this.groupkMoreMusic, 0, 1); //看自己情况
                this.groupkMoreMusic.visible = false;
                this.musicHeiArr = obj["starWorks"]["1"]["not_get"];
                offY += this.group_music.y + this.group_music.height + 60;
            }
            //            console.log("2-1")
            if (obj["starWorks"]["2"] && obj["starWorks"]["2"]["get"].length != 0) {
                //                console.log("2-2")
                this.group_TV.visible = true;
                var anNumber = obj["starWorks"]["2"]["not_get"] ? obj["starWorks"]["2"]["not_get"].length : 0;
                var totalNumber = anNumber + obj["starWorks"]["2"]["get"].length;
                this.lable_TvNumber.text = obj["starWorks"]["2"]["get"].length + "/" + totalNumber;
                this.addWorks(obj["starWorks"]["2"]["get"], 0, this.itemTvArr, [], this.group_TvItem, this.groupkMoreTv, 0, 2); //看自己情况
                this.groupkMoreTv.visible = false;
                this.tvHeiArr = obj["starWorks"]["2"]["not_get"];
                this.group_TV.y = offY || 428;
                if (offY == 0) {
                    offY += this.group_TV.y + this.group_TV.height + 60;
                }
                else {
                    offY += this.group_TV.height + 60;
                }
            }
            if (obj["starWorks"]["3"] && obj["starWorks"]["3"]["get"].length != 0) {
                //                    console.log("3");
                this.group_Movie.visible = true;
                var anNumber = obj["starWorks"]["3"]["not_get"] ? obj["starWorks"]["3"]["not_get"].length : 0;
                var totalNumber = anNumber + obj["starWorks"]["3"]["get"].length;
                this.lable_MovieNumber.text = obj["starWorks"]["3"]["get"].length + "/" + totalNumber;
                this.group_Movie.y = offY || 428;
                this.addWorks(obj["starWorks"]["3"]["get"], 0, this.itemMovieArr, [], this.group_MovieItem, this.groupkMoreMovie, 0, 3); //看自己情况
                this.groupkMoreMovie.visible = false;
                this.movieHeiArr = obj["starWorks"]["3"]["not_get"];
            }
        };
        p.addWorks = function (title, n, itemArr, hei, group_Item, lable_lookMore, julu, type) {
            var length11 = title.length;
            //亮的数组
            for (var i = 0; i < title.length; i++) {
                var itm = new garbageCollection.WorksItem();
                itm.setData(title[i]["name"], title[i]["colour"]);
                itemArr.push(itm);
                if (i == 0) {
                    itm.x = 0;
                    itm.y = 0;
                }
                else {
                    itm.x = itemArr[i - 1].x + itemArr[i - 1].width + 20;
                    itm.y = n * 55;
                    if (itm.x + itm.width > 690) {
                        n += 1;
                        //  console.log(n,"第几个")
                        itm.x = 0;
                        itm.y = n * 55;
                    }
                }
                group_Item.addChild(itm);
                lable_lookMore.y = group_Item.y + group_Item.height + 10;
            }
            //没有亮的时候。n = 0 length11 = 0;
            if (n <= 3) {
                //                console.log("TVheilength",hei.length)
                for (var j = 0; j < hei.length; j++) {
                    var itmHeit = new garbageCollection.WorksItem();
                    itmHeit.setData(hei[j], 0);
                    itemArr.push(itmHeit);
                    // console.log("TVheilength",hei.length)
                    if (length11 == 0) {
                        if (j == 0) {
                            itmHeit.x = 0;
                            itmHeit.y = 0;
                        }
                        else {
                            itmHeit.x = itemArr[j - 1].x + itemArr[j - 1].width + 20;
                            itmHeit.y = n * 55;
                            if (itmHeit.x + itmHeit.width > 690) {
                                n += 1;
                                if (n > 4) {
                                    julu = j;
                                    lable_lookMore.visible = true;
                                    break;
                                }
                                else if (n <= 4) {
                                    itmHeit.x = 0;
                                    itmHeit.y = n * 55;
                                    lable_lookMore.visible = false;
                                }
                            }
                        }
                        group_Item.addChild(itmHeit);
                        lable_lookMore.y = group_Item.y + group_Item.height + 10;
                    }
                    else {
                        //                        console.log("TVheilength",hei.length)
                        itmHeit.x = itemArr[length11 - 1 + j].x + itemArr[length11 - 1 + j].width + 20;
                        itmHeit.y = n * 55;
                        //                        console.log(itmHeit.x,itmHeit.y,'heixy')
                        if (itmHeit.x + itmHeit.width > 690) {
                            n += 1;
                            //                        console.log(n,"uuiiiii")
                            if (n > 4) {
                                julu = j;
                                //                            this.isLookMore = true;
                                if (j == hei.length - 1) {
                                    lable_lookMore.visible = false;
                                }
                                else {
                                    lable_lookMore.visible = true;
                                }
                                //                            console.log(this.jilu,",<3");
                                break;
                            }
                            else if (n <= 4) {
                                itmHeit.x = 0;
                                itmHeit.y = n * 55;
                                lable_lookMore.visible = false;
                            }
                        }
                        group_Item.addChild(itmHeit);
                        lable_lookMore.y = group_Item.y + group_Item.height + 10;
                    }
                }
            }
            else {
                //                console.log(this.jilu,"n333333333");
                var temp = 0;
                for (var t = 0; t < hei.length; t++) {
                    var itmHeit = new garbageCollection.WorksItem();
                    itmHeit.setData(hei[t], 0);
                    // console.log(hei[t],t);
                    itemArr.push(itmHeit);
                    itmHeit.x = itemArr[length11 - 1 + t].x + itemArr[length11 - 1 + t].width + 20;
                    itmHeit.y = n * 55;
                    if (itmHeit.x + itmHeit.width > 690) {
                        n += 1;
                        temp += 1;
                        if (temp > 2) {
                            julu = t;
                            if (j == hei.length - 1) {
                                lable_lookMore.visible = false;
                            }
                            else {
                                lable_lookMore.visible = true;
                            }
                            //                            console.log(this.jilu,">3");
                            break;
                        }
                        else {
                            itmHeit.x = 0;
                            itmHeit.y = n * 55;
                        }
                    }
                    group_Item.addChild(itmHeit);
                    lable_lookMore.y = group_Item.y + group_Item.height + 10;
                }
            }
            if (type == 1) {
                this.n = n;
                this.jilu = julu;
            }
            else if (type == 2) {
                this.v = n;
                this.jiluTv = julu;
            }
            else if (type == 3) {
                this.o = n;
                this.jiluMovie = julu;
            }
        };
        p.addHeadImg = function (source) {
            this.img_ico.texture = source;
        };
        p.addBgImg = function (source) {
            this.img_bg.alpha = 0.1;
            this.img_bg.texture = source;
        };
        p.clear = function () {
            this.scro.viewport.scrollV = 0;
            this.itemArr = [];
            this.n = 0;
            this.jilu = 0;
            this.isLookMore = false;
            this.lable_number.text = "0/0";
            this.itemTvArr = [];
            this.v = 0;
            this.jiluTv = 0;
            this.lable_TvNumber.text = "0/0";
            this.itemMovieArr = [];
            this.o = 0;
            this.jiluMovie = 0;
            this.lable_MovieNumber.text = "0/0";
            this.group_music.visible = false;
            this.group_music.y = 428;
            this.group_TV.visible = false;
            this.group_TV.y = 428;
            this.group_Movie.visible = false;
            this.group_Movie.y = 428;
            this.groupkMoreMusic.visible = false;
            this.groupkMoreTv.visible = false;
            this.groupkMoreMovie.visible = false;
            this.lable_NoWorks.visible = false;
            this.img_bg.texture = null;
            this.img_ico.texture = null;
            this.btn_Fx.visible = false;
            while (this.group_musicItem.numElements > 0) {
                var item = this.group_musicItem.getElementAt(this.group_musicItem.numElements - 1);
                if (item.parent) {
                    item.parent.removeChild(item);
                }
            }
            while (this.group_TvItem.numElements > 0) {
                var tvItem = this.group_TvItem.getElementAt(this.group_TvItem.numElements - 1);
                if (tvItem.parent) {
                    tvItem.parent.removeChild(tvItem);
                }
            }
            while (this.group_MovieItem.numElements > 0) {
                var moveItem = this.group_MovieItem.getElementAt(this.group_MovieItem.numElements - 1);
                if (moveItem.parent) {
                    moveItem.parent.removeChild(moveItem);
                }
            }
            if (this.type == 2) {
                GameApp.Manager.controllerManager.gameMainController.show();
            }
            else if (this.type == 1) {
            }
            this.type = 1;
            GameApp.Manager.viewManager.garbageStage.removeChild(this);
        };
        p.CloseItem = function (e) {
            GameApp.Manager.controllerManager.gabageController.hide();
        };
        return GarbageCollection;
    }(eui.Component));
    garbageCollection.GarbageCollection = GarbageCollection;
    egret.registerClass(GarbageCollection,'garbageCollection.GarbageCollection');
})(garbageCollection || (garbageCollection = {}));
