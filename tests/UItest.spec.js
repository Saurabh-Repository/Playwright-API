const {test , expect} = require('@playwright/test');

test.describe("Ishare Portfolio Test",() =>{

test ("Test the portfolio on Ishare",async({page}) =>{
     
    if (await page.locator("#onetrust-group-container").isVisible()){
        await page.locator("#onetrust-accept-btn-handler").click();
    }
    await page.goto("https://www.ishares.com/us/products/compare-funds");
    await page.locator("#ipx-input").fill("IVV");
    await page.pause();
    // expect (await page.getAttribute("#onetrust-group-container"));
    
    




})
});
