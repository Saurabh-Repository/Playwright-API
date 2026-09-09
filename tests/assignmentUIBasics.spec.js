const {test, expect} =require('@playwright/test');


test('Ecommerce page test',async({page})=>
{
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const signInBtn = page.locator("[value='Login']");
    const productCards = page.locator(".card-body b");
    
    await page.goto("https://rahulshettyacademy.com/client"); 
    await userName.fill("anshika109@gmail.com");
    await password.fill("Iamking@000");
    await signInBtn.click();
    await page.locator('.card-body b').first().waitFor(); // wait for first product to be visible
    await page.waitForLoadState('networkidle'); // wait till all the network API calls are done
    console.log(await productCards.allTextContents()); // we can not use textContent directly because it is async function which returns promise instead of text contents



    
    
});
