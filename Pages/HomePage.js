const config = require('../config')

class HomePage{

    constructor(page) {
        this.page = page;
        this.signInButton = 'a.login';
    }

    async open(){
        await this.page.goto(config.baseURL)
    }

    async clickSignInButton(){
        await this.page.waitForSelector(this.signInButton);
        await this.page.click(this.signInButton);
    }

    async clearCookies(){
        let cookie = await this.page.cookies(config.baseURL)
        await this.page.deleteCookie({
            name: 'PrestaShop-a30a9934ef476d11b6cc3c983616e364'
        })
    }

}

module.exports = HomePage;