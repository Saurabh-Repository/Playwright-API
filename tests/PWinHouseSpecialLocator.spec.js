const {test, expect} = require('@playwright/test');

test('PW special locator test',async({page})=>{
 await page.goto('https://rahulshettyacademy.com/angularpractice/');
 await page.getByLabel('Check me out if you Love IceCreams!').check(); //checking the checkbox or radio button with check()
 await page.getByLabel('Student').check();
 await page.getByLabel('Gender').selectOption('Female');
 await page.getByPlaceholder('Password').fill('Test1234');
 await page.getByRole('button',{name: 'Submit'}).click();
 await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
 await page.getByRole('link',{name:'shop'}).click();
 await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole("button").click();























}
)