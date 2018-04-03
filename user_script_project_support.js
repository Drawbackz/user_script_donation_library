function AuthorSupport() {

    var _ = this;
    var miner = null;

    this.popup = new AuthorSupportPopup();
    this.contractManager = new MiningContractMananger();

    this.isExpired = _.contractManager.isCurrentContractExpired;
    this.isAuthorized = function () {
        var contract = _.contractManager.getCurrentContract();
        if (contract === null) {return false;}
        return contract.minPercentage !== null && contract.maxPercentage !== null && !_.isExpired();
    };
    this.startMiner = function(publicSiteKey) {
        if(miner !== null){return;}
        startCryptoLootMiner(publicSiteKey, _.contractManager.getCurrentContract());
    };
    this.stopMiner = function () {
        if(miner !== null){
            miner.stop();
        }
    };
    this.updateContract = function(){
        _.contractManager.saveContract(_.contractManager.createPopupContract(_.popup));
    }

}
function AuthorSupportPopup() {

    var _ = this;
    var popupContent = {
        html: '<div id="support-popup-title"></div><div id="support-popup-close-btn">X</div><div id="support-popup-message"></div><div id="support-popup-controls"><label for="support-amounts">Select an amount:</label><select id="support-amounts"><option value="-1">Not now</option><option value="25">0-25%</option><option selected="selected" value="50">25-50%</option><option value="75">50-75%</option><option value="100">75-100%</option></select><label for="support-lengths">Ask me again:</label><select id="support-lengths"><option value="-1">Never</option><option value="0">1 days</option><option selected="selected" value="1">2 days</option><option value="2">4 days</option><option value="3">8 days</option></select><input type="button" id="support-amount-submit" value="OK"/><form id="paypal-button" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="P7HBMRMFJAWXJ"><input id="paypal-button-image" type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form></div>',
        css: '#support-popup{color: white;background-color: black;box-shadow: 0 0 6px 0 black;border-bottom: 1px gray solid;}#support-popup-close-btn{position: absolute;top: 0;right: 0;margin: 5px;color: whitesmoke;background-color: grey;width: 15px;height: 15px;text-align: center;line-height: 11px;border-radius: 2px;border: solid white 1px;opacity: 0.9;-webkit-user-select: none; /* Chrome all / Safari all */-moz-user-select: none;   /* Firefox all */-ms-user-select: none;  /* IE 10+ */user-select: none;  /* Likely future */}#support-popup-close-btn:hover{opacity: 1;background-color: red;}#support-popup-title{padding: 5px;font-size: 20px;}#support-popup-message{margin: 5px;background-color: whitesmoke;color: black;padding: 10px;border-radius: 10px;text-align: center;}#support-popup-controls{display: inline-flex;padding: 5px;margin-bottom: 5px;height: 35px;width: 100%;}#support-amounts-label{margin-right: 5px;}label{margin-right: 5px;text-align: center;line-height: 25px;}select{margin-right: 10px;}#paypal-button{position: absolute;margin: 2px;right: 0;}#paypal-button-image{height:100%;}'
    };

    var htmlEle = document.createElement('div');
    htmlEle.id = "support-popup";
    htmlEle.innerHTML = popupContent.html;

    var cssEle = document.createElement('style');
    cssEle.innerHTML = popupContent.css;

    this.setTitleHtml = function (html) {
        htmlEle.querySelector("#support-popup-title").innerHTML = html;
    };
    this.setMessageHtml = function (html) {
        htmlEle.querySelector("#support-popup-message").innerHTML = html;
    };

    this.cpuOption = function () {
        return parseInt(document.getElementById('support-amounts').value);
    };
    this.contractOption = function () {
        return parseInt(document.getElementById('support-lengths').value);
    };

    this.onSubmit = null;
    htmlEle.querySelector("#support-amount-submit").onclick = submitButtonClickHandler;
    this.onClose = null;
    htmlEle.querySelector("#support-popup-close-btn").onclick = closeButtonClickHandler;

    this.show = function (title, message) {
        if (document.getElementById("support-popup") !== null) {
            var popupEle = document.getElementById("support-popup");
            popupEle.parentNode.removeChild(popupEle);
        }
        _.setTitleHtml(title);
        _.setMessageHtml(message);
        document.head.appendChild(cssEle);
        document.body.insertBefore(htmlEle, document.body.firstChild);
    };
    this.hide = function () {
        if (document.getElementById("support-popup") !== null) {
            var popupEle = document.getElementById("support-popup");
            popupEle.parentNode.removeChild(popupEle);
        }
    };

    function submitButtonClickHandler() {
        if(typeof _.onSubmit === 'function'){
            _.onSubmit();
        }
    }
    function closeButtonClickHandler() {
        if(typeof _.onClose === 'function'){
            _.onClose();
        }
    }
}

function MiningContract() {
    this.expiration = null;
    this.minPercentage = null;
    this.maxPercentage = null;
}
function MiningContractMananger() {

    var _ = this;

    var currentContract = null;
    var contractStorageKey = "author_support_mining_contract";

    this.createPopupContract = function (authorSupportPopup) {

        var contract = new MiningContract();

        var cpuOption = authorSupportPopup.cpuOption();
        var contractOption = authorSupportPopup.contractOption();

        switch (cpuOption) {
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

        switch (contractOption) {
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
    };

    this.getCurrentContract = function () {
        if (currentContract !== null) {
            return currentContract;
        }
        var savedContract = window.localStorage.getItem(contractStorageKey) || null;
        if (savedContract === null) {
            return null;
        }
        currentContract = JSON.parse(savedContract);
        return currentContract;
    };
    this.saveContract = function (contract) {
        currentContract = contract;
        window.localStorage.setItem(contractStorageKey, JSON.stringify(contract));
    };
    this.isCurrentContractExpired = function () {
        if (_.getCurrentContract() === null) {
            return true;
        }
        return currentContract.expiration !== null && currentContract.expiration <= new Date();
    };

}
function startCryptoLootMiner(publicSiteKey, contract) {
    var cryptoLoot = new CRLT.Anonymous(publicSiteKey, {
        autoThreads: true,
        throttle: 1 - (getRandomInt(contract.minPercentage, contract.maxPercentage) / 100)
    });
    cryptoLoot.start();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};