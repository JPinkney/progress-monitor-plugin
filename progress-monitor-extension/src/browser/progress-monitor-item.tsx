/********************************************************************************
 * Copyright (C) 2018 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import * as React from "react";
import { ReactWidget } from "@theia/core/lib/browser/widgets/react-widget";

export const PROGRESS_MONITOR_WIDGET_KIND = 'progressMonitorView';

import '../../src/browser/style/style.css';
import { Emitter } from "@theia/core";
import { ProgressReport } from "../common";

/**
 * This class is going to be the base of all the status bars
 */
export class ProgressMonitorItem extends ReactWidget {

    private monitor: ProgressReport;

    constructor(monitor: ProgressReport) {
        super();
        this.monitor = monitor;
    }

    private readonly progressCompleteEmitter = new Emitter<ProgressMonitorItem>();
    readonly onProgressComplete = this.progressCompleteEmitter.event;

    protected render(): React.ReactNode {

        const statusBarStyle = {
            width: ((this.monitor.workDone / this.monitor.totalWork) * 100) + "%",
            height: "60%",
            background: "blue"
        }

        return (
            <div className="progress-monitor-item">
                <h4>{this.monitor.task}</h4>
                <div style={statusBarStyle}></div>
                <p>{this.monitor.subTask}</p>
            </div>
        );
    }

    public updateProgress(monitor: ProgressReport) {
        this.monitor = monitor;

        if (this.monitor.complete) {
            this.progressCompleteEmitter.fire(this);
        }

        this.update();
    }

}
