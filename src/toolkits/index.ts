import { Toolkit } from '../core/toolkit';
import { editorUtilitiesToolkit } from './editorUtilities/editorUtilitiesToolkit';
import { focusAutoHideToolkit } from './focusAutoHide/focusAutoHideToolkit';
import { notesUtilitiesToolkit } from './notesUtilities/notesUtilitiesToolkit';
import { workbenchToolkit } from './workbench/workbenchToolkit';
import { workspaceUtilitiesToolkit } from './workspaceUtilities/workspaceUtilitiesToolkit';

export const toolkits: readonly Toolkit[] = [
    workbenchToolkit,
    focusAutoHideToolkit,
    editorUtilitiesToolkit,
    workspaceUtilitiesToolkit,
    notesUtilitiesToolkit,
];