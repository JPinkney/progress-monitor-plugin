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

import { ContainerModule, interfaces } from "inversify";
import { WidgetFactory, bindViewContribution } from "@theia/core/lib/browser";
import { ProgressMonitorWidget, PROGRESS_MONITOR_WIDGET_KIND } from "./progress-monitor-widget";
import { ProgressMonitorContribution } from "./progress-monitor-contribution";
import { ProgressMonitorManager } from "./progress-monitor-manager";

export default new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
    bind(ProgressMonitorWidget).toSelf();

    bind(ProgressMonitorManager).toSelf();

    bind(WidgetFactory).toDynamicValue(context => ({
        id: PROGRESS_MONITOR_WIDGET_KIND,
        createWidget: () => context.container.get<ProgressMonitorWidget>(ProgressMonitorWidget)
    }));

    bindViewContribution(bind, ProgressMonitorContribution);
});
