const puppeteer = require('puppeteer');
const { expect }  = require('chai');
const config = require('../config')
const HomePage = require('../Pages/HomePage');
const LoginPage = require('../Pages/LoginPage');
const MyAccountPage = require('../Pages/MyAccountPage');

describe('Login to http://automationpractice.com/index.php', function(){

    let browser;
    let page;

    beforeEach(async function(){
        browser = await puppeteer.launch({
            headless: config.headless,
            args:[ '--start-maximized']
            });
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 968});
        //await page.goto(config.baseURL);
    });

    afterEach(async () => {
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

    it('The "Password is required." message should be displayed if password field is blank', async function(){
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.open();
        await homePage.clearCookies();
        await homePage.clickSignInButton();
        await loginPage.enterLogin('automation@acemail.info');
        await loginPage.clickSubmitButton();
        const errorMessageText = await loginPage.errorMessage()
        expect(errorMessageText).to.be.equal('Password is required.')
    })

    it('The "An email address required." message should be displayed if email field is blank', async function(){
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.open();
        await homePage.clearCookies();
        await homePage.clickSignInButton();
        await loginPage.enterLogin('');
        await loginPage.clickSubmitButton();
        const errorMessageText = await loginPage.errorMessage()
        expect(errorMessageText).to.be.equal('An email address required.')
    })

    it('The "Authentication failed." message should be displayed after sending incorrerct password', async function(){
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.open();
        await homePage.clearCookies();
        await homePage.clickSignInButton();
        await loginPage.enterLogin('automation@acemail.info');
        await loginPage.enterPassword('asdfa')
        await loginPage.clickSubmitButton();
        const errorMessageText = await loginPage.errorMessage()
        expect(errorMessageText).to.be.equal('Authentication failed.')
    })

    it('The "Invalid password." message should be displayed after sending incorrerct password less than 5 characters', async function(){
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        await homePage.open();
        await homePage.clearCookies();
        await homePage.clickSignInButton();
        await loginPage.enterLogin('automation@acemail.info');
        await loginPage.enterPassword('asds')
        await loginPage.clickSubmitButton();
        const errorMessageText = await loginPage.errorMessage()
        expect(errorMessageText).to.be.equal('Invalid password.')
    })

});