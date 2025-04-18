// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Game state
const targetNumber = Math.floor(Math.random() * 100) + 1;
let remainingAttempts = 3;
let totalAttempts = 0;

// Get DOM elements
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const remainingAttemptsDisplay = document.getElementById('remaining-attempts');
const successModal = document.getElementById('success-modal');
const failureModal = document.getElementById('failure-modal');
const targetNumberDisplay = document.getElementById('target-number');
const playAgainSuccess = document.getElementById('play-again-success');
const tryAgainButton = document.getElementById('try-again');
const gameHistory = document.getElementById('game-history');

// 调试信息：检查所有必要的DOM元素
console.log('DOM Elements Check:');
console.log('guessInput:', guessInput);
console.log('guessButton:', guessButton);
console.log('message:', message);
console.log('remainingAttemptsDisplay:', remainingAttemptsDisplay);
console.log('successModal:', successModal);
console.log('failureModal:', failureModal);
console.log('targetNumberDisplay:', targetNumberDisplay);
console.log('playAgainSuccess:', playAgainSuccess);
console.log('tryAgainButton:', tryAgainButton);
console.log('gameHistory:', gameHistory);

// Add event listeners
guessButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// 确保正确绑定重置游戏事件
if (playAgainSuccess) {
    playAgainSuccess.addEventListener('click', resetGame);
    console.log('Success button event listener added');
}
if (tryAgainButton) {
    tryAgainButton.addEventListener('click', function() {
        console.log('Try Again button clicked');
        resetGame();
    });
    console.log('Try Again button event listener added');
} else {
    console.error('Try Again button not found!');
}

// Load game history
loadGameHistory();

// Twitter分享功能
function shareOnTwitter(attempts) {
    // 使用新的仓库URL
    const gameUrl = 'https://imnarutoguo.github.io/number_game/';
    const text = `I guessed the number in ${attempts} attempts! Can you beat my score? 🎮 Play now: ${gameUrl} #NumberGuessingGame`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
}

function checkGuess() {
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100!';
        return;
    }
    
    remainingAttempts--;
    totalAttempts++;
    remainingAttemptsDisplay.textContent = remainingAttempts;
    
    if (guess === targetNumber) {
        showSuccessModal(totalAttempts);
        saveGameResult(true);
    } else if (remainingAttempts === 0) {
        showFailureModal();
        saveGameResult(false);
    } else {
        message.textContent = guess < targetNumber ? 
            'Too low! Try a higher number.' : 
            'Too high! Try a lower number.';
        message.style.color = guess < targetNumber ? '#2196F3' : '#f44336';
    }
    
    guessInput.value = '';
}

// 在游戏胜利时显示分享按钮
function showSuccessModal(attempts) {
    const modal = document.getElementById('success-modal');
    const attemptsSpan = document.getElementById('success-attempts');
    const twitterShareButton = document.getElementById('twitter-share');
    
    attemptsSpan.textContent = attempts;
    modal.style.display = 'block';
    
    // 添加Twitter分享事件监听
    twitterShareButton.onclick = () => shareOnTwitter(attempts);
}

function showFailureModal() {
    console.log('Showing failure modal');
    failureModal.style.display = 'block';
    targetNumberDisplay.textContent = targetNumber;
    guessButton.disabled = true;
    guessInput.disabled = true;
}

function resetGame() {
    console.log('Starting game reset...');
    
    // 重置游戏状态
    targetNumber = Math.floor(Math.random() * 100) + 1;
    remainingAttempts = 3;
    totalAttempts = 0;
    
    console.log('New target number:', targetNumber);
    console.log('Remaining attempts reset to:', remainingAttempts);
    
    // 更新UI
    message.textContent = '';
    remainingAttemptsDisplay.textContent = remainingAttempts;
    guessInput.value = '';
    
    // 启用输入和按钮
    guessInput.disabled = false;
    guessButton.disabled = false;
    
    // 隐藏模态框
    successModal.style.display = 'none';
    failureModal.style.display = 'none';
    
    console.log('Game reset complete');
}

function saveGameResult(isSuccess) {
    const gameData = {
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        attempts: totalAttempts,
        success: isSuccess,
        targetNumber: targetNumber
    };

    db.collection('gameResults').add(gameData)
        .then(() => {
            loadGameHistory();
        })
        .catch((error) => {
            console.error("Error saving game result: ", error);
        });
}

function loadGameHistory() {
    gameHistory.innerHTML = '';
    
    db.collection('gameResults')
        .orderBy('timestamp', 'desc')
        .limit(10)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const record = document.createElement('div');
                record.className = `game-record ${data.success ? 'success' : 'failure'}`;
                
                const time = new Date(data.timestamp.toDate()).toLocaleString();
                const result = data.success ? 'Success' : 'Failure';
                
                record.innerHTML = `
                    <div class="time">${time}</div>
                    <div class="result">${result} - Attempts: ${data.attempts}</div>
                `;
                
                gameHistory.appendChild(record);
            });
        })
        .catch((error) => {
            console.error("Error loading game history: ", error);
        });
} 