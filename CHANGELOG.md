# Changelog

## 0.2.2

- Moved all status bar buttons to the left side of the status bar, positioned last (rightmost of the left cluster).

## 0.2.1

- Reordered status bar buttons to match VS Code's physical layout: Activity Bar → Sidebar → Secondary Bar → Panel → Status Bar → Full Screen.

## 0.2.0

- Added individual status bar toggle buttons for Primary Sidebar, Panel, Secondary Bar, Activity Bar, Status Bar, and Full Screen — colour-coded blue, grouped at the far right.
- Eye / Auto-Hide button now opens a checkbox QuickPick to select which views participate in auto-hide. Deselecting all effectively disables auto-hide without touching any setting.
- Auto-Hide button colour reflects active state (green = active, muted = inactive).
- Reduced focus auto-hide debounce default from 120 ms to 0 ms (near-instant).
- Removed redundant "Hide Workbench Chrome" and "Open Daily Note" status bar items (commands remain accessible via palette).
- Trimmed command palette entries to the two most useful: Toggle Sidebar and Toggle Panel.
- Removed obsolete `showHideChrome` and `showDailyNote` status bar config settings.

## 0.1.1

- Rebased project scaffold onto strict official `yo code` generated baseline.
- Retained and re-integrated modular toolkit architecture.
- Preserved workbench, focus auto-hide, editor, workspace, and notes utility toolkits.

## 0.1.0

- Initial bootstrap for VS Code Dev Toolkit.
- Added workbench commands toolkit.
- Added focus auto-hide toolkit.
- Added editor utilities toolkit.
- Added workspace utilities toolkit.
- Added notes utilities toolkit.
- Added marketplace icon and README badges.
- Added release convention guide and release-readiness workflow.
- Added Azure pipeline and extension development scaffolding.
