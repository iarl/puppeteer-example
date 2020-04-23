const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const config = require('../config')
const HomePage = require('../Pages/HomePage');
const LoginPage = require('../Pages/LoginPage');
const MyAccountPage = require('../Pages/MyAccountPage');

describe('Login to http://automationpractice.com/index.php', function(){

    let browser;
    let page;

    this.beforeAll(async function(){
        browser = await puppeteer.launch({
            headless: config.headless,
            args:[ '--start-maximized']
            });
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 968});
        //await page.goto(config.baseURL);
    });

    this.afterAll(async () => {
        await browser.close();
    });

    it('The name in header should be equal to "Auto Test" after login', async function(){
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const myAccountPage = new MyAccountPage(page);
        await homePage.open();
        await homePage.clickSignInButton();
        await loginPage.enterLogin('automation@acemail.info');
        await loginPage.enterPassword('password');
        await loginPage.clickSubmitButton();
        const headerText = await myAccountPage.headerUserInfoText();
        expect(headerText).to.be.equal('Auto Test')
    })

    it('The "Password is required" message should be displayed if password field is blank', async function(){
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.open();
        await homePage.clearCookies();
        await homePage.clickSignInButton();
        await loginPage.enterLogin('automation@acemail.info');
        await loginPage.enterPassword('');
        await loginPage.clickSubmitButton();
        const errorMessageText = await loginPage.errorMessage()
        expect(errorMessageText).to.be.equal('Password is required')
    })

});