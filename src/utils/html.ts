import * as path from "path";

/**
 * Html相关公共方法
 */
export class Html {
    /**
     * 在html元素上触发一个事件。（没有数据）
     * @param elem html元素
     * @param eventName 事件名称
     */
    public static triggerHtmlEvent(elem: HTMLElement, eventName: string) {
        var event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
        elem.dispatchEvent(event);
    }

    /**
     * 在html元素上触发一个事件。（带数据）
     * @param elem html元素
     * @param eventName 事件名称
     * @param data 数据
     */
    public static triggerHtmlEventWithData(elem: HTMLElement, eventName: string, data: any) {
        var options: CustomEventInit<any>;
        options = {
            detail: data,
            bubbles: true,
            cancelable: true
        }
        var event = new CustomEvent(eventName, options);
        elem.dispatchEvent(event);
    }

    public static fadeIn(elem:HTMLElement){
        elem.style.display="block";
        var otime=setTimeout(function(){
            elem.style.opacity = "1";
            elem.style.transition ="0.5s";
            clearTimeout(otime)
        })
    }

    public static fadeOut(elem:HTMLElement){
            elem.style.opacity = "0";
            elem.style.transition = "1s";
           var otime=setTimeout(function(){
                elem.style.display="none";
                clearTimeout(otime)
            },1000)
    }
    public static setOpacity(elem: HTMLElement, opacity: number) {
        /*
         * elem : The id of the element;
         * opacity: The value of alpha, which is a decimals.0.0 to 1.0
         */
        if (elem.style.filter) {   //IE
            elem.style.filter = 'alpha(opacity:' + opacity * 100 + ')';
        } else {
            elem.style.opacity = opacity.toString();
        }
    }
}
