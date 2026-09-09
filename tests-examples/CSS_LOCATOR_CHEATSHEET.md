hg# CSS LOCATOR CHEAT SHEET - Interview Questions & Answers

---

## 1. BASIC SELECTORS

### Element Selector
```css
button              /* Selects all button elements */
div                 /* Selects all div elements */
```
**Example:**
```javascript
page.locator('button');
page.locator('input');
```

---

### ID Selector
```css
#loginButton        /* Selects element with id="loginButton" */
#submit-btn
```
**Example:**
```javascript
page.locator('#loginButton');
page.locator('#onetrust-accept-btn-handler');  // From your cookies test
```

---

### Class Selector
```css
.primary           /* Selects all elements with class="primary" */
.btn-submit        /* Multi-word class */
.active
```
**Example:**
```javascript
page.locator('.primary');
page.locator('.btn-submit');
```

---

### Multiple Classes
```css
.btn.primary       /* BOTH classes must exist */
.active.highlight
```
**Example:**
```javascript
page.locator('.btn.primary');  // Must have both classes
```

---

## 2. ATTRIBUTE SELECTORS

### Exact Attribute Match
```css
[type="submit"]            /* type attribute equals "submit" */
[name="email"]             /* name attribute equals "email" */
[data-testid="login-btn"]  /* data attribute match */
```
**Example:**
```javascript
page.locator('[type="submit"]');
page.locator('[name="email"]');
page.locator('[data-testid="login-button"]');
```

---

### Attribute Contains (Substring)
```css
[name*="user"]      /* name attribute CONTAINS "user" */
                    /* Matches: username, user_id, my_user, etc */
```
**Example:**
```javascript
page.locator('[name*="email"]');    // username_email, email_primary
page.locator('[href*="dashboard"]'); // /path/to/dashboard
```

---

### Attribute Starts With
```css
[class^="btn"]      /* class attribute STARTS WITH "btn" */
                    /* Matches: btn, button, btn-primary, etc */
```
**Example:**
```javascript
page.locator('[class^="btn"]');      // btn, btn-primary, btn-large
page.locator('[href^="https"]');     // URLs starting with https
```

---

### Attribute Ends With
```css
[name$="email"]     /* name attribute ENDS WITH "email" */
                    /* Matches: primary_email, user_email, etc */
```
**Example:**
```javascript
page.locator('[name$="email"]');     // primary_email, user_email
page.locator('[href$=".pdf"]');      // Files ending with .pdf
```

---

### Attribute Starts And Ends (Regex Pattern)
```css
[name~="item"]      /* name attribute contains "item" as whole word */
```

---

### Multiple Attributes
```css
[type="text"][name="email"]    /* Both conditions must match */
[class="form"][id="contact"]
```
**Example:**
```javascript
page.locator('[type="text"][name="email"]');
page.locator('[role="button"][aria-label="Close"]');
```

---

## 3. PSEUDO-CLASSES (State/Position Based)

### :first-child / :last-child
```css
button:first-child      /* First button element */
li:last-child           /* Last list item */
```
**Example:**
```javascript
page.locator('button:first-child');
page.locator('ul li:last-child');
```

---

### :nth-child() / :nth-of-type()
```css
li:nth-child(2)        /* 2nd child element */
button:nth-of-type(3)  /* 3rd button element */
tr:nth-child(even)     /* Even rows */
tr:nth-child(odd)      /* Odd rows */
```
**Example:**
```javascript
page.locator('li:nth-child(2)');       // 2nd list item
page.locator('button:nth-of-type(1)'); // 1st button
page.locator('tr:nth-child(even)');    // Even table rows
```

---

### :enabled / :disabled
```css
input:enabled       /* Enabled input fields */
button:disabled     /* Disabled buttons */
```
**Example:**
```javascript
page.locator('input:enabled');
page.locator('button:disabled');
```

---

### :checked
```css
input:checked       /* Checked checkboxes or radio buttons */
```
**Example:**
```javascript
page.locator('input[type="checkbox"]:checked');
page.locator('input[type="radio"]:checked');
```

---

### :not() - Negation
```css
button:not(.hidden)           /* Buttons without "hidden" class */
input:not([type="hidden"])    /* Inputs that are not hidden */
```
**Example:**
```javascript
page.locator('button:not(.disabled)');
page.locator('div:not(.modal)');
```

---

### :empty
```css
div:empty           /* Empty div elements */
p:empty             /* Empty paragraphs */
```

---

## 4. PSEUDO-ELEMENTS (Content Selection)

### :before / :after
```css
p::before           /* Content before paragraph */
span::after         /* Content after span */
```
⚠️ **Note:** Limited use in Playwright - usually for styling only

---

## 5. COMBINATORS

### Descendant (Space)
```css
form button         /* button inside form (any level deep) */
div p               /* p inside div (anywhere nested) */
```
**Example:**
```javascript
page.locator('form button');       // Any button inside form
page.locator('nav a');             // Any link inside nav
page.locator('.container div');    // Any div inside container
```

---

### Child (>)
```css
form > button       /* Direct child button of form */
div > p             /* Direct child p of div (not nested deeper) */
```
**Example:**
```javascript
page.locator('form > button');     // Direct button child only
page.locator('ul > li');           // Direct list items only
page.locator('.parent > .child');  // Direct child only
```

---

### Adjacent Sibling (+)
```css
h1 + p              /* p that comes RIGHT AFTER h1 */
button + button     /* button that comes right after another button */
```
**Example:**
```javascript
page.locator('label + input');     // Input immediately after label
page.locator('button + button');   // Second button after first
```

---

### General Sibling (~)
```css
h1 ~ p              /* All p elements that come AFTER h1 (siblings) */
.active ~ button    /* All buttons that come after .active element */
```
**Example:**
```javascript
page.locator('button ~ button');   // All buttons after another button
page.locator('.selected ~ div');   // All divs after .selected
```

---

## 6. COMPLEX SELECTORS

### has() - Contains Element
```css
div:has(> button)           /* div that contains direct button child */
form:has(input[type="email"])  /* form that contains email input */
```
**Example:**
```javascript
page.locator('div:has(button)');
page.locator('form:has([name="password"])');
```

---

### is() - Matches Any
```css
button:is(.primary, .secondary)  /* button with either class */
input:is([type="text"], [type="email"])
```
**Example:**
```javascript
page.locator('button:is(.btn-primary, .btn-submit)');
```

---

## 7. ATTRIBUTE SELECTOR COMBINATIONS

### Complete Examples
```css
/* Find text input with name starting with 'user' */
input[type="text"][name^="user"]

/* Find link to PDF files */
a[href$=".pdf"]

/* Find elements with multiple classes */
button[class*="submit"][class*="primary"]

/* Find data attributes */
[data-testid="login"][data-status="active"]

/* Find aria attributes */
[role="button"][aria-label="Close"]
```

---

## 8. REAL-WORLD INTERVIEW EXAMPLES

### Q1: Select a button with specific text
```css
button:has-text("Login")        /* Playwright specific */
/* OR */
button:contains("Login")        /* Alternative */
```
**Answer:**
```javascript
page.locator('button:has-text("Login")');
```

---

### Q2: Select the 3rd row in a table
```css
table tr:nth-child(3)
/* OR */
table tbody tr:nth-of-type(3)
```
**Answer:**
```javascript
page.locator('table tr:nth-child(3)');
page.locator('table tbody tr:nth-of-type(3)');
```

---

### Q3: Select all enabled input fields
```css
input:enabled
input[type="text"]:enabled
```
**Answer:**
```javascript
page.locator('input:enabled');
page.locator('input[type="text"]:enabled');
```

---

### Q4: Select links that are NOT external
```css
a:not([target="_blank"])
a:not([href^="http"])
```
**Answer:**
```javascript
page.locator('a:not([target="_blank"])');
page.locator('a:not([href^="http"])');
```

---

### Q5: Select a form input by label text
```css
label:has-text("Email") + input
/* Form field immediately after label with "Email" */
```
**Answer:**
```javascript
page.locator('label:has-text("Email") + input');
```

---

### Q6: Select hidden elements
```css
input:not(:visible)
div[style*="display: none"]
[hidden]
```
**Answer:**
```javascript
page.locator('input:not(:visible)');
page.locator('[hidden]');
```

---

### Q7: Select all buttons except disabled ones
```css
button:not(:disabled)
button:enabled
```
**Answer:**
```javascript
page.locator('button:not(:disabled)');
page.locator('button:enabled');
```

---

### Q8: Select form fields with specific pattern
```css
input[name*="password"]     /* Contains "password" */
input[name^="confirm"]      /* Starts with "confirm" */
input[name$="email"]        /* Ends with "email" */
```
**Answer:**
```javascript
page.locator('input[name*="password"]');
page.locator('input[name^="confirm"]');
page.locator('input[name$="email"]');
```

---

### Q9: Select SVG elements
```css
svg circle
svg path[fill="red"]
[role="img"]
```
**Answer:**
```javascript
page.locator('svg circle');
page.locator('svg path[fill="red"]');
```

---

### Q10: Select placeholder text
```css
input[placeholder="Enter email"]
[placeholder*="search"]
```
**Answer:**
```javascript
page.locator('[placeholder="Enter email"]');
page.locator('[placeholder*="search"]');
```

---

## 9. COMMON MISTAKES & BEST PRACTICES

### ❌ WRONG
```javascript
page.locator('button.primary');    // Missing space or wrong usage
page.locator('button class=primary');  // Wrong syntax
page.locator('[onclick]');   // Unreliable for modern apps
```

### ✅ CORRECT
```javascript
page.locator('button.primary');    // Correct
page.locator('.primary');          // Just the class
page.locator('[data-testid="btn"]');  // Use data-testid
page.locator('button[type="submit"]'); // Attribute selector
```

---

## 10. PLAYWRIGHT-SPECIFIC LOCATORS

### Test ID (Best Practice)
```javascript
page.locator('[data-testid="login-button"]');
```

### Text Selector
```javascript
page.locator('text=Login');
page.locator('button:has-text("Login")');
```

### Role-Based (Accessible)
```javascript
page.locator('role=button[name="Login"]');
page.locator('role=textbox[name="Email"]');
```

### Label Selector
```javascript
page.locator('label:has-text("Email")');
```

---

## 11. QUICK REFERENCE TABLE

| Selector | Syntax | Example |
|----------|--------|---------|
| Element | `element` | `button` |
| ID | `#id` | `#login` |
| Class | `.class` | `.primary` |
| Attribute = | `[attr="value"]` | `[type="submit"]` |
| Attribute *= | `[attr*="value"]` | `[name*="email"]` |
| Attribute ^= | `[attr^="value"]` | `[class^="btn"]` |
| Attribute $= | `[attr$="value"]` | `[href$=".pdf"]` |
| :first-child | `element:first-child` | `button:first-child` |
| :nth-child() | `element:nth-child(n)` | `li:nth-child(2)` |
| :disabled | `element:disabled` | `button:disabled` |
| :checked | `element:checked` | `input:checked` |
| :not() | `element:not(selector)` | `button:not(.hidden)` |
| Descendant | `parent child` | `form button` |
| Child | `parent > child` | `ul > li` |
| Adjacent | `element + element` | `h1 + p` |
| Sibling | `element ~ element` | `h1 ~ p` |

---

## 12. INTERVIEW TIP

**Common Question:** *"How do you select an element by text content?"*

**Answer:**
```javascript
// Playwright method (Recommended)
page.locator('button:has-text("Login")');
page.locator('text=Login');

// Pure CSS (Limited)
button:contains("Login");  // Not standard CSS
```

---

**Good luck with your BlackRock interview! 🎯**

Master these selectors and you'll be confident in any Playwright interview!
