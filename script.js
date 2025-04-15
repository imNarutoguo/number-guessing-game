// Generate a random number between 1 and 100
const targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Get DOM elements
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

// Add click event listener
guessButton.addEventListener('click', checkGuess);

// Add Enter key support
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

function checkGuess() {
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100!';
        return;
    }
    
    attempts++;
    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    
    // Compare guess with target number
    if (guess === targetNumber) {
        message.textContent = `Congratulations! You guessed it in ${attempts} attempts!`;
        message.style.color = '#4CAF50';
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (guess < targetNumber) {
        message.textContent = 'Too low! Try a higher number.';
        message.style.color = '#2196F3';
    } else {
        message.textContent = 'Too high! Try a lower number.';
        message.style.color = '#f44336';
    }
    
    // Clear input field
    guessInput.value = '';
} 