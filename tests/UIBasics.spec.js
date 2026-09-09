const {test, expect} = require('@playwright/test');


test('Page Playwright test',async({page})=>
{
    const userName = page.locator("#username");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    console.log(await page.title());
    await page.locator("#username").fill("rahulshettyacademy11");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    const cardSecond = await cardTitles.nth(1).textContent();
    const cardFirst = await cardTitles.first().textContent();
    const cardAll = await page.locator(".card-body a").allTextContents(); // without providing textContent it will give empty array of elements because it is async function which returns promise instead of text contents
    console.log(cardSecond);
    console.log(cardFirst);
    console.log(cardAll);




});


/*test ('Browser context Playwright test',async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});
*/