const {test, expect} =require('@playwright/test');

test("UI Controls test",async({page})=>
{
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn"); 
    const dropdown = page.locator("select.form-control");  //tagname.classname or .classname
    const blinkingText = page.locator("[href*='documents-request']"); // attribute selector with partial match

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  
    await userName.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropdown.selectOption("consult"); // select by value attribute
    //await page.pause(); // to pause the execution and see the browser
    await page.locator(".radiotextsty").nth(1).click(); // to select second radio button
    await page.locator("#okayBtn").click(); // to click on ok button of pop up
    console.log(await page.locator(".radiotextsty").nth(1).isChecked()); // to check if second radio button is selected or not in boolean
    expect(await page.locator(".radiotextsty").nth(1)).toBeChecked();  // assertion to check if second radio button is selected
    await page.locator("#terms").click(); // to click on checkbox
    expect(await page.locator("#terms")).toBeChecked(); // assertion to check if checkbox is selected
    expect(await page.locator(".radiotextsty").first().isChecked()).toBeFalsy(); // assertion to check if first radio button is not selected
    expect(await page.locator("#terms").uncheck()); // to uncheck the checkbox
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); // assertion to check if checkbox is not selected
    await expect(blinkingText).toHaveAttribute("class","blinkingText"); // assertion to check if blinking text has class attribute with value blinkingText  

}  
); 