# Age Calculator

A simple and interactive web application to calculate your exact age in years, months, and days based on your date of birth. Built with HTML, CSS, and JavaScript.

## Features

- User-friendly form to input your birth date (day, month, year)
- Custom month dropdown with smooth UI
- Input validation for day, month, and year (including leap years and month-specific days)
- Real-time error messages for invalid or incomplete input
- Displays your age in years, months, and days
- Responsive and modern design

## Demo

<!-- Add a screenshot if available -->

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bye_shuvo/CodeAlpha_AgeCalculator.git
cd CodeAlpha_AgeCalculator
```

### 2. Open in Browser

Simply open the `index.html` file in your preferred web browser:

- Double-click `index.html`
- **OR** right-click and select "Open with" → your browser

No build steps or dependencies required!

## File Structure

```
CodeAlpha_AgeCalculator/
│
├── index.html      # Main HTML file
├── style.css       # Stylesheet for the app
├── script.js       # JavaScript logic for age calculation and validation
└── README.md       # Project documentation
```

## Usage

1. Enter your birth day, select the month, and enter the year.
2. Click the "Calculate" button.
3. Your exact age will be displayed below the form.

## Validation Rules

- **Day:** Must be valid for the selected month (e.g., February max 28, April max 30)
- **Year:** Must be between 1800 and 3000
- **All fields required:** Incomplete or invalid input will show an error message

## Customization

- You can modify the styles in `style.css` to match your preferences.
- The validation and calculation logic can be found in `script.js`.

## License

This project is open source and available under the MIT License.
