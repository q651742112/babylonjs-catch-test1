import {SceneLoader, Engine, Scene, Database, Observable, Tools, CubeTexture, Vector3, Color4, Color3} from "babylonjs"


interface ILauncher {
    assetUrl: string,
    container: string;
}


export class Launcher {

    public assetUrl: string;
    public canvas: HTMLCanvasElement;

    public engine: Engine;

    public scene: Scene;

    public onSceneLoaded: Observable<{ scene: Scene }> = new Observable<{ scene: Scene }>();


    constructor(params: ILauncher) {
        this.assetUrl = params.assetUrl;
        this.canvas = <HTMLCanvasElement>document.getElementById(<string>params.container);
    }

    public launch() {
        this.engine = new Engine(this.canvas);
        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        // Setting up support for caching
        // this.engine.enableOfflineSupport = true;
        // Database.IDBStorageEnabled = true;
        let rootUrl = Tools.GetFolderPath(this.assetUrl);
        let fileName = Tools.GetFilename(this.assetUrl);
        SceneLoader.LoadAsync(rootUrl, fileName).then((scene) => {
            this.onSceneLoaded.notifyObservers({scene: scene});
            scene.whenReadyAsync().then(() => {
                scene.createDefaultCamera(true);
                scene.activeCamera.attachControl();
                scene.createDefaultLight();
                this.engine.runRenderLoop(() => {
                    scene.render();
                });
            });
        })
    }

}
