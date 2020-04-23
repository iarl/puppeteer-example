class BasePage{
    constructor(page){
        this.page = page;
    }

    async fillField(locator){
        await this.page.waitForSelector(locator);
        await this.page.type(this.password_field, password);
    }

    async clickOnElement(locator){
        await this.page.click(locator);
    }

    async getText(locator){
        await this.page.waitForSelector(this.header_user_info);
        const element = await this.page.$eval(this.header_user_info, el => el.textContent);
        return element
    }
}

module.exports = BasePage