import { ISimpleEvent, SimpleEventDispatcher } from "strongly-typed-events";
import {Node} from "typescript";

export class AuthorSupportPopup{

    private css:string = '#support-popup{color: white;background-color: black;box-shadow: 0 0 6px 0 black;border-bottom: 1px gray solid;}#support-popup-close-btn{position: absolute;top: 0;right: 0;margin: 5px;color: whitesmoke;background-color: grey;width: 15px;height: 15px;text-align: center;line-height: 11px;border-radius: 2px;border: solid white 1px;opacity: 0.9;-webkit-user-select: none; /* Chrome all / Safari all */-moz-user-select: none;   /* Firefox all */-ms-user-select: none;  /* IE 10+ */user-select: none;  /* Likely future */}#support-popup-close-btn:hover{opacity: 1;background-color: red;}#support-popup-title{padding: 5px;font-size: 20px;}#support-popup-message{margin: 5px;background-color: whitesmoke;color: black;padding: 10px;border-radius: 10px;text-align: center;}#support-popup-controls{display: inline-flex;padding: 5px;margin-bottom: 5px;height: 35px;width: 100%;}#support-amounts-label{margin-right: 5px;}label{margin-right: 5px;text-align: center;line-height: 25px;}select{margin-right: 10px;}#paypal-button{position: absolute;margin: 2px;right: 0;}#paypal-button-image{height:100%;}';
    private html:string = '<div id="support-popup-title"></div><div id="support-popup-close-btn">X</div><div id="support-popup-message"></div><div id="support-popup-controls"><label for="support-amounts">Select an amount:</label><select id="support-amounts"><option value="-1">Not now</option><option value="25">0-25%</option><option selected="selected" value="50">25-50%</option><option value="75">50-75%</option><option value="100">75-100%</option></select><label for="support-lengths">Ask me again:</label><select id="support-lengths"><option value="-1">Never</option><option value="0">1 days</option><option selected="selected" value="1">2 days</option><option value="2">4 days</option><option value="3">8 days</option></select><input type="button" id="support-amount-submit" value="OK"/><form id="paypal-button" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="P7HBMRMFJAWXJ"><input id="paypal-button-image" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form></div>';

    private cssElement:HTMLElement;
    private htmlElement:HTMLElement;

    constructor(){
        this.initializeElements();
    }

    private initializeElements():void{

        this.cssElement = document.createElement('style');
        this.cssElement.innerHTML = this.css;

        this.htmlElement = document.createElement('div');
        this.htmlElement.id = "support-popup";
        this.htmlElement.innerHTML = this.html;

        (this.htmlElement.querySelector("#support-amount-submit") as HTMLElement).onclick = this.handleSubmit;
        (this.htmlElement.querySelector("#support-popup-close-btn") as HTMLElement).onclick = this.handleClose;
    }


    public onClose:any = null;
    public onSubmit:any = null;

    private handleClose = () => {
        if(typeof this.onClose === 'function'){
            this.onClose();
        }
    };

    private handleSubmit = () =>{
        if(typeof this.onSubmit === 'function'){
            this.onSubmit();
        }
    };

    public setTitleHtml(html:string):void{
        this.htmlElement.querySelector("#support-popup-title").innerHTML = html;
    };
    public setMessageHtml(html:string):void{
        this.htmlElement.querySelector("#support-popup-message").innerHTML = html;
    };

    public get cpuOption():number{
        return parseInt((document.getElementById('support-amounts') as any).value);
    };
    public get contractOption():number {
        return parseInt((document.getElementById('support-lengths') as any).value);
    };


    public show(title:string, message:string):void{
        if (document.getElementById("support-popup") !== null) {
            let popupEle = document.getElementById("support-popup");
            popupEle.parentNode.removeChild(popupEle);
        }
        this.setTitleHtml(title);
        this.setMessageHtml(message);
        document.head.appendChild(this.cssElement);
        document.body.insertBefore(this.htmlElement, document.body.firstChild);
    }

    public hide():void{
        if (document.getElementById("support-popup") !== null) {
            let popupEle = document.getElementById("support-popup");
            popupEle.parentNode.removeChild(popupEle);
        }
    }

}