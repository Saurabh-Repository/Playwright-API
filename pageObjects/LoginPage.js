class LoginPage {

    constructor(page)
    {
        this.page = page;
        this.signinButton = page.locator("#login");
        this.userName = page.locator("input[formcontrolname='userEmail']");
        this.password = page.locator("input[type='password']");

    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async validLogin(username,password)
    {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signinButton.click();

    }
}

module.exports = {LoginPage};