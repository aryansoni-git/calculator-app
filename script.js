// Function to evaluate a mathematical expression
const evaluateEquation = (equation) => {
    // Split the equation into segments (numbers and operators)
    const segments = equation.split(/([-+*/%])/);
    let result = parseFloat(segments[0]); // First operand

    // Iterate through the segments
    for (let i = 1; i < segments.length; i += 2) {
        const operator = segments[i]; // Operator
        const nextNumber = parseFloat(segments[i + 1]); // Next operand

        // Perform the appropriate operation based on the operator
        switch (operator) {
            case '+': result += nextNumber; break;
            case '-': result -= nextNumber; break;
            case '*': result *= nextNumber; break;
            case '/': result /= nextNumber; break;
            case '%': result %= nextNumber; break;
            default:
                alert('Invalid operator:', operator);
                return NaN;
        }
    }
    // Limit the result to 8 significant digits
    if (result.toString().length > 9) {
        result = parseFloat(result.toPrecision(8));
    }
    return Number(result);
}

// Get the button container element
const buttonContainer = document.querySelector('#button-container');

// Event listener for button clicks
buttonContainer.addEventListener('click', (e) => {
    const resultElement = document.querySelector('#result');
    const historyElement = document.querySelector('#history');
    const button = e.target;

    // Switch case to handle different button clicks
    let equation = '';
    switch (button.id) {
        // Digits
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            historyElement.textContent += button.textContent;
            break;
        case 'dot':
            // Add decimal point if not already present
            if (!historyElement.textContent.includes('.')) {
                historyElement.textContent += button.textContent;
            }
            break;
        // Operators
        case '%': historyElement.textContent += ' % ';
            break;
        case '/': historyElement.textContent += ' / ';
            break;
        case '*': historyElement.textContent += ' * ';
            break;
        case '-': historyElement.textContent += ' - ';
            break;
        case '+': historyElement.textContent += ' + ';
            break;
        // Clear and Evaluate
        case 'Escape':
            resultElement.textContent = 0;
            historyElement.textContent = '';
            break;
        case 'Backspace':
            // Remove the last character from the history
            let historyText = historyElement.textContent;
            historyText = historyText.slice(0, -1);
            historyElement.textContent = historyText;
            break;
        case 'Enter':
            // Evaluate the expression
            equation = historyElement.textContent;
            const result = evaluateEquation(equation);
            resultElement.textContent = result;
            if (!isNaN(result)) {
                historyElement.textContent = result;
            } else {
                historyElement.textContent = '';
            }
            break;
        default: // This section needs bug fixes and improvements...
            // Append digit to history if clicked button represents a digit
            if (!isNaN(parseInt(button.id))) {
                historyText += button.id;
            }
            // Append decimal point to history if dot button clicked and history doesn't have one
            else if (id === 'dot' && !historyText.includes('.')) {
                historyText += button.id;
            }
            // Handle operators (+, -, *, /, %)
            else if (/[-+*/%]/.test(button.id)) {
                // Add operator to history if last character isn't already an operator
                if (!/[-+*/%]/.test(historyText.charAt(historyText.length - 1))) {
                    historyText += ` ${button.id} `;
                } else {
                    // Replace last operator if it's already an operator
                    historyText = historyText.slice(0, -1) + button.id + ' ';
                }
            }
            break;
    }
});

// Event listener for keyboard inputs
document.addEventListener('keydown', (e) => {
    const key = e.key;
    // Get display elements
    const resultElement = document.querySelector('#result');
    const historyElement = document.querySelector('#history');
    let historyText = historyElement.textContent.trim();

    // Style the button for visual feedback
    const button = document.getElementById(key);
    if (button && button.classList.contains('btn')) {
        button.style.backgroundColor = 'rgb(246 246 246)';
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200)
        button.addEventListener('transitionend', () => {
            button.style.backgroundColor = '';
        });
    }

    // Switch case to handle keyboard inputs
    switch (key) {
        case 'Escape':
            // Clear the display
            resultElement.textContent = '0';
            historyText = '';
            break;
        case 'Backspace':
            // Remove the last character from the history
            historyText = historyText.slice(0, -1);
            break;
        case 'Enter':
            // Evaluate the expression
            const equation = historyText;
            const result = evaluateEquation(equation);
            if (!isNaN(result)) {
                resultElement.textContent = result;
            } else {
                resultElement.textContent = '';
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
            // Add operator if the last character is a number
            if (!isNaN(parseFloat(historyText.charAt(historyText.length - 1)))) {
                historyText += ` ${key}  `;
            }
            break;
        default:
            // Add digit or decimal point to the history
            if (!isNaN(parseFloat(key)) || key === '') {
                historyText += key;
            }
            break;
    }
    // Update the history display
    historyElement.textContent = historyText;
});
