const {test, expect} = require('@playwright/test'); // test and expect are imported from playwright test module and curly braces are used to destructure the object returned by require function

test("window handling test", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const documentLink = page.locator("[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const [newPage] = await Promise.all([  // we have created a new page variable to handle the new tab opened and promise.all is used to wait for multiple promises to resolve
        context.waitForEvent('page'), // wait for new page event
        documentLink.click()  // click on the link that opens a new tab
    ])  
    const text = await newPage.locator(".red").textContent(); // get the text content of the element with class 'red' in the new tab
    console.log(text);
    const arrayText = text.split("@"); // split the text content by '@' to get the email part
    const domain = arrayText[1].split(" ")[0]; // split the second part by space to get the domain
    console.log(domain);

    await page.locator("#username").fill(domain); // here we are using page because page is the parent tab where we have to fill the username
    await page.pause(); // to pause the execution and see the browser
    console.log(await page.locator("#username").inputValue()); // to get the value filled in the username field from the parent tab and print it in the console

    });