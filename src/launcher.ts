import {SceneLoader, Engine, Scene, Database, Observable, Color4} from "babylonjs"
import {CustomScreen} from "./loading/customScreen"

interface ILauncher {

    assetUrl: string,

    assetName: string,

    container: string;
}


export class Launcher {

    public assetUrl: string;
    public assetName: string;
    public canvas: HTMLCanvasElement;

    public engine: Engine;

    public scene: Scene;

    constructor(params: ILauncher) {
        this.assetUrl = params.assetUrl;
        this.assetName = params.assetName;
        this.canvas = <HTMLCanvasElement>document.getElementById(<string>params.container);
    }

    public launch() {
        this.engine = new Engine(this.canvas);
        this.engine.loadingScreen = new CustomScreen();
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        // Setting up support for caching
        this.engine.enableOfflineSupport = true;
        Database.IDBStorageEnabled = true;
        SceneLoader.LoadAsync(this.assetUrl, this.assetName).then((scene) => {
            scene.clearColor = new Color4(0.878, 0.878, 0.906);
            scene.createDefaultCamera(true);
            scene.activeCamera.attachControl();
            scene.createDefaultLight();
            // @ts-ignore
            scene.activeCamera.alpha = 1.1;
            // @ts-ignore
            scene.activeCamera.beta = 1.1;
            scene.activeCamera.fov = 0.5;
            scene.whenReadyAsync().then(() => {
                this.engine.runRenderLoop(() => {
                    scene.render();
                });
            });
        })
    }

}
