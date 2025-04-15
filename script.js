// 生成1-100之间的随机数
const targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// 获取DOM元素
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');

// 添加点击事件监听器
guessButton.addEventListener('click', checkGuess);

// 添加回车键支持
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

function checkGuess() {
    const guess = parseInt(guessInput.value);
    
    // 验证输入
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = '请输入1-100之间的有效数字！';
        return;
    }
    
    attempts++;
    attemptsDisplay.textContent = `已尝试次数: ${attempts}`;
    
    // 比较猜测的数字和目标数字
    if (guess === targetNumber) {
        message.textContent = `恭喜你！你猜对了！用了${attempts}次。`;
        message.style.color = '#4CAF50';
        guessButton.disabled = true;
        guessInput.disabled = true;
    } else if (guess < targetNumber) {
        message.textContent = '太小了，再大一点！';
        message.style.color = '#2196F3';
    } else {
        message.textContent = '太大了，再小一点！';
        message.style.color = '#f44336';
    }
    
    // 清空输入框
    guessInput.value = '';
} 