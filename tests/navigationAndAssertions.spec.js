// const {test,expect} = require(@playwright/test)

const {test,expect} = require('@playwright/test');
const { on } = require('events');

test ("Navigation and Assertion",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goto("https:google.com");
await page.goBack();
await page.goForward();
await page.goBack();
await expect (page.locator('#displayed-text')).toBeVisible();
await page.locator('#hide-textbox').click();
await expect (page.locator('#displayed-text')).toBeHidden();
page.on('dialog',dialog=> dialog.accept());
// page.on('dialog',dialog=> dialog.type("hey"));
// await page.locator('#confirmbtn').click();
await page.locator('#mousehover').hover();

const framePage = await page.locator('#courses-iframe');
await framePage.locator("li a[href *='lifetime-access']:visible").click();
const textCheck = await framePage.locator(".text h2").textContent();
console.log(textCheck.split(" ")[1]);





















}
)