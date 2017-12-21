var data;
(function (data) {
    /**
     *
     * @author
     *
     */
    var Sounds = (function () {
        function Sounds() {
            //        private sound: egret.Sound;
            this.soundArr = [];
            this.soundNameArr = ["click_mp3", "love_mp3", "record_mp3", "guardian_mp3", "clearegg_mp3", "rengdan_mp3"];
        }
        var d = __define,c=Sounds,p=c.prototype;
        Sounds.getInstance = function () {
            if (!this._intance) {
                this._intance = new Sounds();
                this._intance.init();
            }
            return this._intance;
        };
        p.init = function () {
            //            for ( var i = 0; i < this.soundNameArr.length; i++ )
            //            { 
            //                var sound = new egret.Sound();
            //                sound = RES.getRes(this.soundNameArr[i]);
            //                sound.addEventListener( egret.SoundEvent.SOUND_COMPLETE, function () { 
            //                    sound.load();
            //                    },this);
            //                this.soundArr.push( sound );
            //            }
            //            this.sound.addEventListener(egret.SoundEvent.SOUND_COMPLETE, this.rePlay,this);
            //            this.sound.addEventListener(egret.SoundEvent.SOUND_COMPLETE, this.rePlay.bind(this),this);
        };
        //        private rePlay(): void {
        //            this.sound.load();
        //        }
        p.clickSound = function (index) {
            if (index === void 0) { index = 0; }
            var sound = new egret.Sound();
            sound = RES.getRes(this.soundNameArr[index]);
            //            this.soundArr[index].play();
            //            sound.addEventListener( egret.SoundEvent.SOUND_COMPLETE, function () { 
            //                sound = null;
            //                }, this );
            //            sound.play();
        };
        return Sounds;
    }());
    data.Sounds = Sounds;
    egret.registerClass(Sounds,'data.Sounds');
})(data || (data = {}));
