var home_ads_loading_icon : HTMLElement = document.querySelector('#home-ads-loading-icon')

function init(){
    initConnexion();
    initViews();
    initHome();
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
    ];

    let view_manager = new ViewManager(views);
    window.addEventListener('hashchange', ViewManager.onHashChange);
}
function initHome(){
    document.querySelector('#home-create-ad').addEventListener('click', () => {
        ViewManager.setCurrentView('create-ad');
    });
    document.querySelector('#login-submit').addEventListener('click', submitLogin);
    document.querySelector('#signup-submit').addEventListener('click', submitSignUp);
}



/*------------ HOME ------------*/
function onDisplayHome(){
    loadAds();
    displayHeaderEmail();
}
function loadAds(){
    let parent : HTMLDivElement = document.querySelector('#ads-container');
    parent.innerHTML = '';
    home_ads_loading_icon.style.display = 'block';

    AdProcessor.getAsync(ConnexionManager.connected ? ConnexionManager.token : '')
        .then((ads) => {
            ads.forEach(ad => {
                new AdCardElement(ad, parent, onHomeAdEditClick);
            });

            home_ads_loading_icon.style.display = 'none';
        })
        .catch((e) => {
            console.log(e.message);
        });
}
function onHomeAdEditClick(){

}
function displayHeaderEmail(){
    let element : HTMLSpanElement = document.querySelector('#home-header-email');
    element.innerHTML = ConnexionManager.connected ? ConnexionManager.email : 'se connecter';
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
    error_element.innerHTML = error;
    container.appendChild(error_element);
}


init();