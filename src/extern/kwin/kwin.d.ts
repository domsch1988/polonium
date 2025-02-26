declare namespace KWin {
    class Toplevel {
        readonly popupWindow: boolean;
        readonly frameGeometry: Qt.QRect;
        readonly desktop: number;
        frameGeometryChanged: Signal<(client: AbstractClient, oldGeometry: Qt.QRect) => void>;
        screenChanged: Signal<() => void>;
    }
    class AbstractClient extends Toplevel {
        readonly resizeable: boolean;
        readonly moveable: boolean;
        readonly transient: boolean;
        readonly specialWindow: boolean;
        tile: Tile | null;
        keepAbove: boolean;
        keepBelow: boolean;
        noBorder: boolean;
        fullScreen: boolean;
        minimized: boolean;
        activities: Array<string>;
        resourceClass: Qt.QByteArray;
        // frameGeometry is read/write for abstractclient
        frameGeometry: Qt.QRect;
        screen: number;
        // custom tiling stuff that isnt in base kwin but we need it
        // has been tiled at least once
        hasBeenTiled: boolean | undefined;
        // was just tiled
        wasTiled: boolean | undefined;
        // stuff to keep tabs on changes between locations
        oldActivities: Array<string> | undefined;
        oldDesktop: number | undefined;
        oldScreen: number | undefined;
        //signals
        desktopPresenceChanged: Signal<(client: AbstractClient, desktop: number) => void>;
        desktopChanged: Signal<() => void>;
        activitiesChanged: Signal<(client: AbstractClient) => void>;
    }
    class Tile {
        tiles: Array<Tile>;
        windows: Array<AbstractClient>;
        absoluteGeometry: Qt.QRect;
        relativeGeometry: Qt.QRect;
        oldRelativeGeometry: Qt.QRect | undefined;
        // null for root tile
        parent: Tile | null;
        padding: number;
        split(direction: LayoutDirection): void;
        remove(): void;
    }
    enum LayoutDirection {
        Floating,
        Horizontal,
        Vertical,
    }
    class RootTile extends Tile {
        parent: null;
        layoutModified: Signal<() => void>;
        // extra thing used in engine
        connected: boolean | undefined;
    }
    class TileManager {
        rootTile: RootTile;
        bestTileForPosition(x: number, y: number): Tile | null;
    }

    class WorkspaceWrapper {
        activeClient: AbstractClient | null;
        activeScreen: number;
        currentActivity: string;
        currentDesktop: number;
        desktops: number;
        tilingForScreen(desktop: number): KWin.TileManager;
        supportInformation(): string;
        clientList(): Array<AbstractClient>;
        // doesnt actually exist in api, i made it up
        lastActiveClient: AbstractClient | null | undefined;
        // signals
        clientAdded: Signal<(client: AbstractClient) => void>;
        clientRemoved: Signal<(client: AbstractClient) => void>;
        clientActivated: Signal<(client: AbstractClient) => void>;
        clientMinimized: Signal<(client: AbstractClient) => void>;
        clientUnminimized: Signal<(client: AbstractClient) => void>;
        // idk what user does
        clientFullScreenSet: Signal<(client: AbstractClient, fullscreen: boolean, user: any) => void>;
        // signals for workspace
        currentDesktopChanged: Signal<(desktop: number, client: AbstractClient) => void>;
        currentActivityChanged: Signal<(activity: string) => void>;
    }
    class Options {
        configChanged: Signal<() => void>;
    }
}
