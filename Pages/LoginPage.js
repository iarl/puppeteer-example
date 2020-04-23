class LoginPage{

    constructor(page){
        this.page = page;
        this.email_field = '#email'
        this.password_field = '#passwd'
        this.submit_button = '#SubmitLogin'
        this.error_message = '.alert.alert-danger>ol>li'
    }

    async enterLogin(login){
        await this.page.waitForSelector(this.email_field);
        await this.page.type(this.email_field, login);
    }

    async enterPassword(password){
        await this.page.waitForSelector(this.password_field);
        await this.page.type(this.password_field, password);
    }

    async clickSubmitButton(){
        await this.page.click(this.submit_button);
    }

    async currentURL(){
        const url = await this.page.url()
        return url
    }

    async errorMessage(){
        await this.page.waitForSelector(this.header_user_info);
        const text = await this.page.$eval(this.error_message, el => el.textContent);
        return text
    }

}

module.exports = LoginPage