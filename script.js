// Game state
const targetNumber = Math.floor(Math.random() * 100) + 1;
let remainingAttempts = 3;
// let attempts = 0; // Old logic: count attempts

// Get DOM elements
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const remainingAttemptsDisplay = document.getElementById('remaining-attempts');
// const attemptsDisplay = document.getElementById('attempts'); // Old logic: attempts display
const successModal = document.getElementById('success-modal');
const failureModal = document.getElementById('failure-modal');
const targetNumberDisplay = document.getElementById('target-number');
const playAgainSuccess = document.getElementById('play-again-success');
const playAgainFailure = document.getElementById('play-again-failure');

// Add event listeners
guessButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});
playAgainSuccess.addEventListener('click', resetGame);
playAgainFailure.addEventListener('click', resetGame);

function checkGuess() {
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100!';
        return;
    }
    
    // New logic: count remaining attempts
    remainingAttempts--;
    remainingAttemptsDisplay.textContent = remainingAttempts;
    
    // Old logic: count total attempts
    // attempts++;
    // attemptsDisplay.textContent = `Attempts: ${attempts}`;
    
    // Compare guess with target number
    if (guess === targetNumber) {
        showSuccessModal();
        // Old logic: show success message
        // message.textContent = `Congratulations! You guessed it in ${attempts} attempts!`;
        // message.style.color = '#4CAF50';
        // guessButton.disabled = true;
        // guessInput.disabled = true;
    } else if (remainingAttempts === 0) {
        showFailureModal();
    } else {
        message.textContent = guess < targetNumber ? 
            'Too low! Try a higher number.' : 
            'Too high! Try a lower number.';
        message.style.color = guess < targetNumber ? '#2196F3' : '#f44336';
    }
    
    // Clear input field
    guessInput.value = '';
}

function showSuccessModal() {
    successModal.style.display = 'block';
    guessButton.disabled = true;
    guessInput.disabled = true;
}

function showFailureModal() {
    targetNumberDisplay.textContent = targetNumber;
    failureModal.style.display = 'block';
    guessButton.disabled = true;
    guessInput.disabled = true;
}

function resetGame() {
    // Reset game state
    remainingAttempts = 3;
    remainingAttemptsDisplay.textContent = remainingAttempts;
    message.textContent = '';
    
    // Enable input and button
    guessButton.disabled = false;
    guessInput.disabled = false;
    
    // Hide modals
    successModal.style.display = 'none';
    failureModal.style.display = 'none';
    
    // Generate new target number
    targetNumber = Math.floor(Math.random() * 100) + 1;
    
    // Old logic: reset attempts
    // attempts = 0;
    // attemptsDisplay.textContent = `Attempts: ${attempts}`;
} 