module common {
	/**
	 *
	 * @author 
	 *
	 */
	export class BaseView {
        protected stage;
        //游戏舞台层
        protected UIStage: eui.UILayer;
        //游戏底层UI层
        protected BottomUIStage: eui.Group;
        //游戏特效层
        protected GameEffect:eui.Group;
        //游戏TopUI层
        protected TopUIStage: eui.Group;
        //游戏作品收集层
        protected garbageUiStage:eui.Group;
        //游戏底层中主游戏层
        protected gameMainUI: mainUI.GameMainUI;
        
		public constructor(viewManager) {
            this.stage = egret.MainContext.instance.stage;
            this.UIStage = viewManager.UIStage;
            this.BottomUIStage = viewManager.BottomUIStage;
            this.GameEffect = viewManager.GameEffect;
            this.TopUIStage = viewManager.TopUIStage;
            this.garbageUiStage = viewManager.garbageStage;
            this.gameMainUI = viewManager.gameMainUI;
		}
	}
}
