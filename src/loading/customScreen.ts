import {Nullable,ISceneLoaderProgressEvent} from "babylonjs";
import {ILoadingScreen} from "babylonjs";
import {Html} from "../utils/html";
import {EventName} from "../global/eventName";

export class CustomScreen implements ILoadingScreen {
    private _loadingDiv:Nullable<HTMLDivElement>;
    private _loadingTextDiv:HTMLDivElement;
    public static DefaultLogoUrl="";
    public static DefaultSpinnerUrl = "";
    loadingUIBackgroundColor: string;
    loadingUIText: string;
    /**
     * Creates a new default loading screen
     */
    constructor(){

    }
    /**
     * 显示加载页面
     */
    public displayLoadingUI():void{
        this._loadingDiv=document.querySelector('#babylonjsLoadingDiv');
        if(!this._loadingDiv){
            this._loadingDiv=document.createElement('div');
            this._loadingDiv.id="babylonjsLoadingDiv";
            this._loadingDiv.style.opacity="0";
            this._loadingDiv.style.background="#eee";
            this._loadingDiv.style.width="100%";
            this._loadingDiv.style.height="100vh";
            this._loadingDiv.style.position="fixed";
            this._loadingDiv.style.top="50%";
            this._loadingDiv.style.left="50%";
            this._loadingDiv.style.transform="translate(-50%,-50%)";
            //Loading content
            let cubeBox=document.createElement('div');
            cubeBox.classList.add('cubeBox');
            cubeBox.style.position="absolute";
            cubeBox.style.top="50%";
            cubeBox.style.left="50%";
            cubeBox.style.transform="translate(-50%,-50%)";
            let cube1=document.createElement('div');
            cube1.classList.add('cube1');
            let cube2=document.createElement('div');
            cube2.classList.add('cube2');
            let ospan=document.createElement('span');
            ospan.innerHTML="加载中..."
            cubeBox.appendChild(cube1);
            cubeBox.appendChild(cube2);
            cubeBox.appendChild(ospan);
            this._loadingDiv.appendChild(cubeBox);
            let style=document.createElement('style');
            style.type="text/css";
            let styleCon=
                `#babylonjsLoadingDiv .cube1,#babylonjsLoadingDiv .cube2 {\
            background-color: #ff6427;
            width:30px;
            height:30px;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-animation: cubemove 1.8s infinite ease-in-out;
            animation: cubemove 1.8s infinite ease-in-out;
            }\
            #babylonjsLoadingDiv .cube2 {\
                t-webkit-animation-delay: -0.9s;
                animation-delay: -0.9s;
            }\
            #babylonjsLoadingDiv span{\
                color:#ff6427;
                font-size: 16px;
                margin-top: 80px;
                display: block;
            }\
            @-webkit-keyframes cubemove {\
                25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
                50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
                75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
                100% { -webkit-transform: rotate(-360deg) }
            }\
            @keyframes cubemove {\
                25% {transform: translateX(42px) rotate(-90deg) scale(0.5);}
                50% {transform: translateX(42px) translateY(42px) rotate(-179deg);}
                75% {transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);}
                100% {transform: rotate(-360deg);}
            }`;
            style.innerHTML = styleCon;
            document.getElementsByTagName('head')[0].appendChild(style);
            document.body.appendChild(this._loadingDiv);
        }
        Html.triggerHtmlEvent(this._loadingDiv, EventName.LOADING_SCREEN_DISPLAY);
        Html.fadeIn(this._loadingDiv);


    }

    /**
     * 隐藏加载页面
     */
    public hideLoadingUI() {
        Html.triggerHtmlEvent(this._loadingDiv, EventName.LOADING_SCREEN_FINISHED);
        Html.fadeOut(this._loadingDiv);
    }
}