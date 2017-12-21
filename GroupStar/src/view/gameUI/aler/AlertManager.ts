module aler {
	/**
	 *
	 * @author 
	 *
	 */
	export class AlertManager{
        private static _instance: AlertManager;
        public static getInstance(): AlertManager {
            if(!this._instance) {
                this._instance = new AlertManager();
            }
            return this._instance;
        }
        public aler: AlertPanel;
        /**
         * 
         */ 
		public constructor() {
            
		}
		
//        public show(str?: string,  closeHander?: Function, scope?:any, str1?:string,str2?:string): void
//        { 
//            if(!this.aler)this.aler = new AlertPanel();
//            this.aler.show(str,  closeHander,  scope,str1,str2 );
//        }
	}
}
