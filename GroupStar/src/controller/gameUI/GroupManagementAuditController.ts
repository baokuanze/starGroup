module groupManagementAudit {
	/**
	 *
	 * @author 
	 *
	 */
	export class GroupManagementAuditController {
        public constructor() {
        }
        public show(str:string,str1:string): void {
            GameApp.Manager.viewManager.groupManagerAudit.show(str,str1);
        }

        public hide(): void {
            GameApp.Manager.viewManager.groupManagerAudit.hide();
        }
	}
}
