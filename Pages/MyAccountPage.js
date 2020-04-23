class MyAccountPage{

    constructor(page){
        this.page = page;
        this.header_user_info = '.header_user_info>a>span';
        this.logout_button = '.logout';
    }

    async headerUserInfoText(){
        await this.page.waitForSelector(this.header_user_info);
        const text = await this.page.$eval(this.header_user_info, el => el.textContent);
        return text
    }

    async currentURL(){
        const url = await this.page.url()
        return url
    }

    async clickLogoutButton(){
        await this.page.click(this.logout_button)
    }
}

module.exports = MyAccountPage