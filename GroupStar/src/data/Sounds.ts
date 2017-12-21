module data {
	/**
	 *
	 * @author 
	 *
	 */
	export class Sounds {
        public static _intance: Sounds;
//        private sound: egret.Sound;
        private soundArr = [];
        private soundNameArr = ["click_mp3", "love_mp3","record_mp3","guardian_mp3","clearegg_mp3","rengdan_mp3"];
		public constructor() {
		}
        public static getInstance(): Sounds
        {
            if(!this._intance){
                this._intance = new Sounds();
                this._intance.init();
            }
            return this._intance;
        }
        private init():void{
           
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
        }
//        private rePlay(): void {
//            this.sound.load();
//        }
        public clickSound(index = 0):void{
            var sound = new egret.Sound();
            sound = RES.getRes(this.soundNameArr[index]);
//            this.soundArr[index].play();
//            sound.addEventListener( egret.SoundEvent.SOUND_COMPLETE, function () { 
//                sound = null;
//                }, this );
//            sound.play();
        }
	}
}
