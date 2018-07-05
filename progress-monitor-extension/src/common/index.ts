import { NotificationType } from "vscode-jsonrpc";

export interface ProgressReport {
	id: string;
	task: string;
	subTask: string;
	status: string;
	workDone: number;
	totalWork: number;
	complete: boolean;
}

export namespace ProgressReportNotification {
	export const type = new NotificationType<ProgressReport,void >('language/progressReport');
}