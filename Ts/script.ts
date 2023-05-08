var home_ads_loading_icon : HTMLElement = document.querySelector('#home-ads-loading-icon');
var modifyCurrentAd : Ad = null;

function init(){
    initConnexion();
    initViews();
    initListeners();
    ViewManager.setCurrentView('home');
}
function initConnexion(){
    ConnexionManager.tryLoginFromLocalStorage();
    displayHeaderEmail();
}
function initViews(){
    let views = [
        new View('home', onDisplayHome, () => {}),
        new View('login', null, () => {}),
        new View('sign-up', null, () => {}),
        new View('create-ad', onDisplayCreateAd, () => {}),
        new View('modify-ad', null, () => {}),
    ];

    let view_manager = new ViewManager(views);
    window.addEventListener('hashchange', ViewManager.onHashChange);
}
function initListeners(){  
    document.querySelector('#home-create-ad').addEventListener('click', () => {
        if (!ConnexionManager.connected) return;
        ViewManager.setCurrentView('create-ad');
    });
    document.querySelector('#login-submit').addEventListener('click', submitLogin);
    document.querySelector('#signup-submit').addEventListener('click', submitSignUp);
    document.querySelector('#create-ad-submit').addEventListener('click', submitCreateAd);
    document.querySelector('#modify-ad-submit').addEventListener('click',submitModifyAd);
    document.querySelector('#modify-ad-delete-submit').addEventListener('click',submitDeleteAd);
}



/*------------ HOME ------------*/
function onDisplayHome(){
    loadAds();
    displayHeaderEmail();
    displayAccountButton();
    displayCreateAdButton();
}
function loadAds(){
    let parent : HTMLDivElement = document.querySelector('#ads-container');
    parent.innerHTML = '';
    home_ads_loading_icon.style.display = 'block';

    AdProcessor.getAsync(ConnexionManager.connected ? ConnexionManager.token : '')
        .then((ads) => {
            parent.innerHTML = '';

            ads.forEach(ad => {
                new AdCardElement(ad, parent, onHomeAdEditClick);
            });

            home_ads_loading_icon.style.display = 'none';
        })
        .catch((e) => {
            console.log(e.message);
        });
}
function onHomeAdEditClick(adCardElement : AdCardElement){
    let ad = adCardElement.ad;
    let title_element : HTMLInputElement = document.querySelector('#modify-ad-title');
    let description_element : HTMLInputElement = document.querySelector('#modify-ad-desc');
    let price_element : HTMLInputElement = document.querySelector('#modify-ad-price');
    let currency_element : HTMLSelectElement = document.querySelector('#modify-ad-currency');
    modifyCurrentAd = ad;
    console.log(ad.idAd);

    title_element.value = ad.title;
    description_element.value = ad.description;
    price_element.value = ad.price.amount.toString();
    currency_element.value = ad.price.currency;

    ViewManager.setCurrentView('modify-ad');
}
function displayHeaderEmail(){
    let element : HTMLSpanElement = document.querySelector('#home-header-email');
    element.innerHTML = ConnexionManager.connected ? ConnexionManager.email : 'se connecter';
}
function displayAccountButton(){
    let element : HTMLSpanElement = document.querySelector('#account-button');
    element.onclick = () => {
        if (ConnexionManager.connected){
            ConnexionManager.disconnect();
            ViewManager.setCurrentView('home');
        }
        else{
            ViewManager.setCurrentView('login');
        }
    };

    element.innerHTML = '';
    let icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add(ConnexionManager.connected ? 'fa-sign-out-alt' : 'fa-sign-in-alt');
    element.appendChild(icon);
}
function displayCreateAdButton(){
    const button : HTMLButtonElement = document.querySelector('#home-create-ad');

    if (!ConnexionManager.connected){
        button.classList.add('disabled');
    }
    else{
        button.classList.remove('disabled');
    }
}
/*------------ LOGIN ------------*/
function onDisplayLogin(){

}
async function submitLogin(){
    let email_element : HTMLInputElement =document.querySelector('#login-email');
    let password_element : HTMLInputElement =document.querySelector('#login-password');
    let email = email_element.value;
    let password = password_element.value;
    let account = new Account(email, password);
    let result_token : string = null;

    clearLoginError();

    try{
        await AccountProcessor.loginAsync(account)
            .then((token) => {
                result_token = token;
            })
            .catch((e) => {
                throw e.message;
            });
    }
    catch (e){
        displayLoginError(e);
        console.log(e.message);
        return;
    }

    ConnexionManager.connect(email, result_token, true);
    ViewManager.setCurrentView('home');
}
function clearLoginError(){
    let container = document.querySelector('#login-error-container');
    container.innerHTML = '';
}
function displayLoginError(error:string){
    let container = document.querySelector('#login-error-container');
    let error_element = document.createElement('span');
    error_element.classList.add('login-error');
    error = ErrorTraductor.traduce(error);
    error_element.innerHTML = error;
    container.appendChild(error_element);
}

/*------------ SIGN UP ------------*/
function onDisplaySignUp(){

}
async function submitSignUp(){
    let email_element : HTMLInputElement =document.querySelector('#signup-email');
    let password_element : HTMLInputElement =document.querySelector('#signup-password');
    let email = email_element.value;
    let password = password_element.value;
    let account = new Account(email, password);
    let result_token : string = null;

    clearSignUpError();

    try{
        await AccountProcessor.createAsync(account)
            .then((token) => {
                result_token = token;
            })
            .catch((e) => {
                throw e.message;
            });
    }
    catch (e){
        displaySignUpError(e);
        console.log(e.message);
        return;
    }

    ConnexionManager.connect(email, result_token, true);
    ViewManager.setCurrentView('home');
}
function clearSignUpError(){
    let container = document.querySelector('#signup-error-container');
    container.innerHTML = '';
}
function displaySignUpError(error:string){
    let container = document.querySelector('#signup-error-container');
    let error_element = document.createElement('span');
    error_element.classList.add('signup-error');
    error = ErrorTraductor.traduce(error);
    error_element.innerHTML = error;
    container.appendChild(error_element);
}

/* --------- CREATE AD --------- */

function onDisplayCreateAd(){
    if (!ConnexionManager.connected) {
        ViewManager.setCurrentView('home');
    }
}

async function submitCreateAd(){
    let title_element : HTMLInputElement=document.querySelector('#create-ad-title');
    let title = title_element.value;
    let description_element : HTMLInputElement=document.querySelector('#create-ad-desc');
    let description = description_element.value;
    let price_element : HTMLInputElement=document.querySelector('#create-ad-price');
    let price_value = Number(price_element.value);
    let price_currency_element : HTMLSelectElement=document.querySelector('#create-ad-currency');
    let currency = price_currency_element.value;
    let token = ConnexionManager.token;

    var price = new Price(price_value,currency);
    var ad = new Ad(title,description,price);

    clearCreateAdError();

    try{
        await AdProcessor.createAsync(ad,token)
        .catch((e) => {
            throw e.message;
        })

        title_element.value = '';
        description_element.value = '';
        price_element.value = '';
        price_currency_element.selectedIndex = 0;
        ViewManager.setCurrentView('home');
    } 
    catch (e){
        displayCreateAdError(e);
        console.log(e.message);
        return;
    }
}

function clearCreateAdError(){
    let container = document.querySelector('#create-ad-error-container');
    container.innerHTML = '';
}

function displayCreateAdError(error : string){
    let container = document.querySelector('#create-ad-error-container');
    let error_element = document.createElement('span');
    error_element.classList.add('create-ad-error');
    error = ErrorTraductor.traduce(error);
    error_element.innerHTML = error;
    container.appendChild(error_element);
}

/* --------- MODIFY --------- */

function onDisplayModify(){
    if (!ConnexionManager.connected) {
        ViewManager.setCurrentView('login');
    }
}

function submitDeleteAd(){
    let token = ConnexionManager.token;
    let id = modifyCurrentAd.idAd;

    try {
        AdProcessor.deleteAsync(token,id)
        .catch((e) => {
            throw e.message;
        });
        ViewManager.setCurrentView('home');
        modifyCurrentAd = null;
    } catch (e) {
        displayModifyDeleteError(e);
        console.log(e.message);
        return;
    }
}

function submitModifyAd(){
    let title_element : HTMLInputElement=document.querySelector('#modify-ad-title');
    let title = title_element.value;
    let description_element : HTMLInputElement=document.querySelector('#modify-ad-desc');
    let description = description_element.value;
    let price_element : HTMLInputElement=document.querySelector('#modify-ad-price');
    let price_value = Number(price_element.value);
    let price_currency_element : HTMLSelectElement=document.querySelector('#modify-ad-currency');
    let currency = price_currency_element.value;
    let token = ConnexionManager.token;

    var price = new Price(price_value,currency);
    var ad = new Ad(title,description,price);
    
    clearModifyDeleteError();

    try{
        AdProcessor.modifyAsync(token,modifyCurrentAd.idAd,ad)
            .then(() => {
                ViewManager.setCurrentView('home');
                modifyCurrentAd = null;
            })
            .catch((e) => {
                displayModifyDeleteError(e.message);
            });
    }
    catch (e){
        
        return;
    }
}

function displayModifyDeleteError(error : string){
    let container = document.querySelector('#modify-ad-error-container');
    let error_element = document.createElement('span');
    error_element.classList.add('modify-ad-error');
    error = ErrorTraductor.traduce(error);
    error_element.innerHTML = error;
    container.appendChild(error_element);
}

function clearModifyDeleteError(){
    let container = document.querySelector('#modify-ad-error-container');
    container.innerHTML = '';
}

init();

