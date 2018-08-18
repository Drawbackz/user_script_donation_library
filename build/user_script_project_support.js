(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthorSupportPopup {
    constructor() {
        this.css = '#support-popup{color: white;background-color: black;box-shadow: 0 0 6px 0 black;border-bottom: 1px gray solid;}#support-popup-close-btn{position: absolute;top: 0;right: 0;margin: 5px;color: whitesmoke;background-color: grey;width: 15px;height: 15px;text-align: center;line-height: 11px;border-radius: 2px;border: solid white 1px;opacity: 0.9;-webkit-user-select: none; /* Chrome all / Safari all */-moz-user-select: none;   /* Firefox all */-ms-user-select: none;  /* IE 10+ */user-select: none;  /* Likely future */}#support-popup-close-btn:hover{opacity: 1;background-color: red;}#support-popup-title{padding: 5px;font-size: 20px;}#support-popup-message{margin: 5px;background-color: whitesmoke;color: black;padding: 10px;border-radius: 10px;text-align: center;}#support-popup-controls{display: inline-flex;padding: 5px;margin-bottom: 5px;height: 35px;width: 100%;}#support-amounts-label{margin-right: 5px;}label{margin-right: 5px;text-align: center;line-height: 25px;}select{margin-right: 10px;}#paypal-button{position: absolute;margin: 2px;right: 0;}#paypal-button-image{height:100%;}';
        this.html = '<div id="support-popup-title"></div><div id="support-popup-close-btn">X</div><div id="support-popup-message"></div><div id="support-popup-controls"><label for="support-amounts">Select an amount:</label><select id="support-amounts"><option value="-1">Not now</option><option value="25">0-25%</option><option selected="selected" value="50">25-50%</option><option value="75">50-75%</option><option value="100">75-100%</option></select><label for="support-lengths">Ask me again:</label><select id="support-lengths"><option value="-1">Never</option><option value="0">1 days</option><option selected="selected" value="1">2 days</option><option value="2">4 days</option><option value="3">8 days</option></select><input type="button" id="support-amount-submit" value="OK"/><form id="paypal-button" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="P7HBMRMFJAWXJ"><input id="paypal-button-image" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form></div>';
        this.onClose = null;
        this.onSubmit = null;
        this.handleClose = () => {
            if (typeof this.onClose === 'function') {
                this.onClose();
            }
        };
        this.handleSubmit = () => {
            if (typeof this.onSubmit === 'function') {
                this.onSubmit();
            }
        };
        this.initializeElements();
    }
    initializeElements() {
        this.cssElement = document.createElement('style');
        this.cssElement.innerHTML = this.css;
        this.htmlElement = document.createElement('div');
        this.htmlElement.id = "support-popup";
        this.htmlElement.innerHTML = this.html;
        this.htmlElement.querySelector("#support-amount-submit").onclick = this.handleSubmit;
        this.htmlElement.querySelector("#support-popup-close-btn").onclick = this.handleClose;
    }
    setTitleHtml(html) {
        this.htmlElement.querySelector("#support-popup-title").innerHTML = html;
    }
    ;
    setMessageHtml(html) {
        this.htmlElement.querySelector("#support-popup-message").innerHTML = html;
    }
    ;
    get cpuOption() {
        return parseInt(document.getElementById('support-amounts').value);
    }
    ;
    get contractOption() {
        return parseInt(document.getElementById('support-lengths').value);
    }
    ;
    show(title, message) {
        if (document.getElementById("support-popup") !== null) {
            let popupEle = document.getElementById("support-popup");
            popupEle.parentNode.removeChild(popupEle);
        }
        this.setTitleHtml(title);
        this.setMessageHtml(message);
        document.head.appendChild(this.cssElement);
        document.body.insertBefore(this.htmlElement, document.body.firstChild);
    }
    hide() {
        if (document.getElementById("support-popup") !== null) {
            let popupEle = document.getElementById("support-popup");
            popupEle.parentNode.removeChild(popupEle);
        }
    }
}
exports.AuthorSupportPopup = AuthorSupportPopup;

},{}],2:[function(require,module,exports){
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helpers;
(function (Helpers) {
    Helpers.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
})(Helpers = exports.Helpers || (exports.Helpers = {}));

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
var getRandomInt = helpers_1.Helpers.getRandomInt;
class CoinImpMiner {
    constructor(publicKey) {
        this._publicKey = publicKey;
    }
    StartMining(min, max) {
        try {
            this._miner = new Client.Anonymous(this._publicKey, {
                throttle: 1 - (getRandomInt(min, max) / 100)
            });
            this._miner.start();
        }
        catch (e) {
            console.log("Unable to start miner");
            console.log(e);
        }
    }
    StopMining() {
        try {
            if (this._miner !== null) {
                this._miner.stop();
            }
        }
        catch (e) {
            console.log("Unable to stop miner");
            console.log(e);
        }
    }
}
exports.CoinImpMiner = CoinImpMiner;

},{"../helpers":3}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mining_contract_1 = require("./mining-contract");
require("./extensions");
class MiningContractManager {
    constructor() {
        this._currentContract = null;
        this._contractStorageKey = "author_support_mining_contract";
    }
    get currentContract() {
        if (this._currentContract !== null) {
            return this._currentContract;
        }
        let savedContract = window.localStorage.getItem(this._contractStorageKey) || null;
        if (savedContract === null) {
            return null;
        }
        this._currentContract = mining_contract_1.MiningContract.fromJson(savedContract);
        return this._currentContract;
    }
    ;
    createPopupContract(popup) {
        let contract = new mining_contract_1.MiningContract();
        switch (popup.cpuOption) {
            case 25:
                contract.minPercentage = 0;
                contract.maxPercentage = 25;
                break;
            case 50:
                contract.minPercentage = 25;
                contract.maxPercentage = 50;
                break;
            case 75:
                contract.minPercentage = 50;
                contract.maxPercentage = 75;
                break;
            case 100:
                contract.minPercentage = 75;
                contract.maxPercentage = 100;
                break;
        }
        switch (popup.contractOption) {
            case 0:
                contract.expiration = new Date().addDays(1);
                break;
            case 1:
                contract.expiration = new Date().addDays(2);
                break;
            case 2:
                contract.expiration = new Date().addDays(4);
                break;
            case 3:
                contract.expiration = new Date().addDays(8);
                break;
        }
        return contract;
    }
    ;
    saveContract(contract) {
        this._currentContract = contract;
        window.localStorage.setItem(this._contractStorageKey, JSON.stringify(contract));
    }
    ;
}
exports.MiningContractManager = MiningContractManager;

},{"./extensions":2,"./mining-contract":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MiningContract {
    static fromJson(json) {
        let savedContract = JSON.parse(json);
        let contract = new MiningContract();
        contract.expiration = savedContract.expiration;
        contract.minPercentage = savedContract.minPercentage;
        contract.maxPercentage = savedContract.maxPercentage;
        return contract;
    }
    get isExpired() {
        return this.expiration !== null && this.expiration <= new Date();
    }
}
exports.MiningContract = MiningContract;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const author_support_popup_1 = require("./classes/author-support-popup");
const mining_contract_manager_1 = require("./classes/mining-contract-manager");
const CoinImpMiner_1 = require("./classes/miners/CoinImpMiner");
class AuthorSupport {
    constructor() {
        this._miner = null;
        this.popup = new author_support_popup_1.AuthorSupportPopup();
        this.contractManager = new mining_contract_manager_1.MiningContractManager();
        this.isAuthorized = function () {
            if (this.contractManager.currentContract === null) {
                return false;
            }
            return this.contractManager.currentContract.minPercentage !== null && this.contractManager.currentContract.maxPercentage !== null && !this.contractManager.currentContract.isExpired;
        };
        this.startMiner = function (jsMiner) {
            if (this._miner !== null) {
                return;
            }
            this._miner = jsMiner;
            this._miner.StartMining(this.contractManager.currentContract.minPercentage, this.contractManager.currentContract.maxPercentage);
        };
        this.stopMiner = function () {
            if (this._miner !== null) {
                this._miner.StopMining();
            }
        };
        this.updateContract = function () {
            this.contractManager.saveContract(this.contractManager.createPopupContract(this.popup));
        };
    }
    isExpired() {
        if (this.contractManager.currentContract === null) {
            return true;
        }
        return this.contractManager.currentContract.isExpired;
    }
    ;
}
window.CoinImpMiner = CoinImpMiner_1.CoinImpMiner;
window.AuthorSupport = AuthorSupport;

},{"./classes/author-support-popup":1,"./classes/miners/CoinImpMiner":4,"./classes/mining-contract-manager":5}]},{},[7]);
