const { test, expect, request } = require('@playwright/test');

const loginPayload = {userEmail: "saurabh@mail.com",userPassword: "Saurabh@123"} //payload in key:value pair}
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
let token;
const orderId;

test.beforeAll(async()=>{
  // Login API
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
        data:loginPayload
        })
        expect (loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);
})

// Create order API
const orderResponse = apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data: orderPayLoad,
        headers:  {
                      'Authorization':token,
                      'content-type' :'application/json'
        },

})
const orderResponsJson = await orderResponse.json();
console.log(orderResponsJson);
orderId = orderResponsJson.orders[0];






test('ecommerce test', async ({ page }) => {
 
 await page.addInitScript(value=>{
    window.localStorage.setItem('token',value);
 }, token );
 
  const productName = 'ZARA COAT 3';
  const email = loginPayload.userEmail;
  const products = page.locator('.card-body');
  
  await page.goto('https://rahulshettyacademy.com/client/');
  const titles = await page.locator('.card-body b').allTextContents();
  console.log('Product titles:', titles);

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      await products.nth(i).locator('text=Add To cart').click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  //await page.locator('div li').first().waitFor(); // wait for the cart items to be visible here div li is the locator for the cart items
  await page.locator('.infoWrap').first().waitFor(); // here .infoWrap is the locator for the cart items, we can use that instead of div li
  const isProductVisible = await page.locator(`h3:has-text("${productName}")`).isVisible(); // here we used $ to find the element with the text content of productName, we can also use :has-text() instead of that, both will work fine, but :has-text() is more readable and easier to understand, so we will use that instead of $ here
  expect(isProductVisible).toBeTruthy();
  await page.locator('text=Checkout').click();
  await page.locator(".input.txt.text-validated").nth(0).fill(""); // to clear the input the correct syntax is not clear() but clear the input by using the fill() method with an empty string, so we can use that instead of clear() here
  await page.locator(".input.txt.text-validated").nth(0).fill("411111111111111");
  
  // Select from dropdowns using .nth() method (0-based indexing)
  // Wait for dropdowns to be visible before selecting
  await page.locator(".input.ddl").nth(0).waitFor({ state: 'visible' });
  await page.locator(".input.ddl").nth(0).selectOption("11"); // Month dropdown
  
  await page.locator(".input.ddl").nth(1).waitFor({ state: 'visible' });
  await page.locator(".input.ddl").nth(1).selectOption("25"); // Year dropdown - note: might need to adjust the value based on actual options
  await page.locator(".input.txt").nth(1).fill("123"); // CVV input
  await page.locator(".input.txt").nth(2).fill("Visa Pizza");
  await page.locator(".input.txt").nth(3).fill("rahulshettyacademy");
  await page.locator("button:has-text('Apply Coupon')").click();
  // await page.pause(); // to pause the execution and see the browser
  await expect (page.locator("p[class='mt-1 ng-star-inserted']")).toBeVisible();
  await expect (page.locator("p[class='mt-1 ng-star-inserted']")).toHaveText("* Coupon Applied"); // here we are using toHaveText() method to verify that the coupon code is applied successfully and the text "Code applied ..!" is displayed on the page, we can also use toContainText() method instead of that, both will work fine, but toHaveText() is more strict and will check for the exact text content, so we will use that instead of toContainText() here
  await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
/* This step may occasionally fail if the application server is slow due to heavy traffic. In such cases, you can introduce a delay and rewrite the step as:

await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
Here, a delay of 150 milliseconds is introduced between each key press.
That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d */

  const dropdownoptions = page.locator(".ta-results");
  await dropdownoptions.waitFor();
  const optionCount = await dropdownoptions.locator("button").count();
  for (let i = 0; i< optionCount; i++) {
    const text = await dropdownoptions.locator("button").nth(i).textContent();
    if (text.trim() === "India") {
      await dropdownoptions.locator("button").nth(i).click();
      break;
    }
  }

  expect (page.locator('.user__name.mt-5 [type="text"]').first()).toHaveText(email); // here in the locator we traversing to parent to child
  await page.locator('.action__submit').click();

  await expect (page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
  console.log(orderId);
  await page.locator('.fa-handshake-o').click();
  await page.locator('tbody').waitFor();

  const orderRows = await page.locator('tbody tr.ng-star-inserted');
  
  for (let i=0; i<await orderRows.count(); ++i)
  {
    const rowOrderId = await orderRows.nth(i).locator('th').textContent();
    if (orderId.includes(rowOrderId)){
      await orderRows.nth(i).locator('.btn.btn-primary').click();
      break;
    }
  }
  const orderPlaceId = await page.locator('div[class="col-text -main"]').textContent();
  expect (orderId.includes(orderPlaceId)).toBeTruthy();

  const orderPlacedProd = page.locator('div .title');
  const orderPlacedProdText = await orderPlacedProd.textContent();
  console.log(orderPlacedProdText);
  await expect (orderPlacedProd).toHaveText(productName);



});