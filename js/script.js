document.addEventListener('DOMContentLoaded', () => {
  const toggleModeBtn = document.getElementById('toggle-mode');
  const body = document.body;
  const gameModeSelect = document.getElementById('game-mode');
  const difficultySelect = document.getElementById('difficulty');
  const textDisplay = document.getElementById('text-display');
  const userInput = document.getElementById('user-input');
  const wpmDisplay = document.getElementById('wpm');
  const accuracyDisplay = document.getElementById('accuracy');
  const timeDisplay = document.getElementById('time');
  const restartBtn = document.getElementById('restart-btn');
  const resultSection = document.getElementById('results');
  const resultWpm = document.getElementById('result-wpm');
  const resultAccuracy = document.getElementById('result-accuracy');
  const resultTime = document.getElementById('result-time');
  const playAgainBtn = document.getElementById('play-again-btn');
  const leaderboardBody = document.getElementById('leaderboard-body');
  const highScoreDisplay = document.getElementById('high-score-value');

  let startTime, endTime, timerInterval;
  let currentText = '';
  let isGameActive = false;
  let currentGameMode = 'standard';
  let currentDifficulty = 'easy';
  let highScores = {};

  const gameModes = {
      standard: [
          "The quick brown fox jumps over the lazy dog.",
          "Pack my box with five dozen liquor jugs.",
          "How vexingly quick daft zebras jump!",
          "Sphinx of black quartz, judge my vow.",
          "Two driven jocks help fax my big quiz."
      ],
      timed: [
          "In a world of constant change, adaptability is key to success.",
          "The art of programming is the skill of controlling complexity.",
          "To be or not to be, that is the question.",
          "All that glitters is not gold; often have you heard that told.",
          "It was the best of times, it was the worst of times."
      ],
      zen: [
          "Breathe in deeply, feel the calm wash over you.",
          "Let go of your worries and focus on the present moment.",
          "Find peace in the silence between your thoughts.",
          "Embrace the journey of self-discovery and growth.",
          "Cultivate mindfulness in every aspect of your life."
      ],
      quotes: [
          "Be the change you wish to see in the world. - Mahatma Gandhi",
          "I have a dream that one day this nation will rise up. - Martin Luther King Jr.",
          "Ask not what your country can do for you – ask what you can do for your country. - John F. Kennedy",
          "That's one small step for man, one giant leap for mankind. - Neil Armstrong",
          "I think, therefore I am. - René Descartes"
      ],
      code: [
          "function helloWorld() { console.log('Hello, World!'); }",
          "const sum = (a, b) => a + b;",
          "for (let i = 0; i < array.length; i++) { console.log(array[i]); }",
          "if (condition) { doSomething(); } else { doSomethingElse(); }",
          "class Animal { constructor(name) { this.name = name; } }"
      ],
      numbers: [
          "3.14159265358979323846264338327950288419716939937510",
          "2.71828182845904523536028747135266249775724709369995",
          "1.41421356237309504880168872420969807856967187537694",
          "1.61803398874989484820458683436563811772030917980576",
          "2.23606797749978969640917366873127623544061835961152"
      ]
  };

  const difficulties = {
      easy: { timeLimit: 60, textLength: 'short' },
      medium: { timeLimit: 45, textLength: 'medium' },
      hard: { timeLimit: 30, textLength: 'long' },
      expert: { timeLimit: 20, textLength: 'long' }
  };

  function getRandomText() {
      const texts = gameModes[currentGameMode] || gameModes.standard;
      let text = texts[Math.floor(Math.random() * texts.length)];
      
      const { textLength } = difficulties[currentDifficulty];
      if (textLength === 'short') {
          text = text.split(' ').slice(0, 5).join(' ');
      } else if (textLength === 'medium') {
          text = text.split(' ').slice(0, 10).join(' ');
      }
      
      return text;
  }

  function startGame() {
      isGameActive = true;
      currentText = getRandomText();
      displayText();
      userInput.value = '';
      userInput.disabled = false;
      userInput.focus();
      clearInterval(timerInterval);
      startTime = null;
      timeDisplay.textContent = '0:00';
      wpmDisplay.textContent = '0 WPM';
      accuracyDisplay.textContent = '100%';
      if (currentGameMode === 'timed') {
        const { timeLimit } = difficulties[currentDifficulty];
        setTimeout(() => {
            if (startTime === null) endGame();
        }, timeLimit * 1000);
    }
}

function endGame() {
    isGameActive = false;
    endTime = new Date();
    clearInterval(timerInterval);
    userInput.disabled = true;
    calculateResults();
    showResults();

    const newEntry = {
        name: 'Player', // You might want to implement a way to get the player's name
        wpm: calculateWPM(),
        accuracy: calculateAccuracy(),
        mode: currentGameMode,
        difficulty: currentDifficulty
    };

    updateLeaderboard(newEntry);
    updateRecentGames(newEntry);
    updateHighScore();
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    if (currentGameMode === 'timed') {
        const { timeLimit } = difficulties[currentDifficulty];
        const remainingTime = timeLimit - elapsedTime;
        if (remainingTime <= 0) {
            endGame();
        } else {
            timeDisplay.textContent = `${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')}`;
        }
    }
}

function calculateWPM() {
    const words = userInput.value.trim().split(/\s+/).length;
    const minutes = (endTime - startTime) / 60000;
    return Math.round(words / minutes);
}

function calculateAccuracy() {
    const userChars = userInput.value.split('');
    const originalChars = currentText.split('');
    let correctChars = 0;

    for (let i = 0; i < userChars.length; i++) {
        if (userChars[i] === originalChars[i]) {
            correctChars++;
        }
    }

    return Math.round((correctChars / originalChars.length) * 100);
}

function calculateResults() {
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    wpmDisplay.textContent = `${wpm} WPM`;
    accuracyDisplay.textContent = `${accuracy}%`;
    resultWpm.textContent = wpm;
    resultAccuracy.textContent = `${accuracy}%`;
    resultTime.textContent = timeDisplay.textContent;
}

function showResults() {
    resultSection.classList.remove('hidden');
}

function displayText() {
    textDisplay.innerHTML = currentText.split('').map(char => 
        `<span class="char">${char}</span>`
    ).join('');
}

function handleUserInput() {
    if (!isGameActive) return;
    
    if (startTime === null) {
        startTime = new Date();
        timerInterval = setInterval(updateTimer, 1000);
    }

    const userChars = userInput.value.split('');
    const textChars = textDisplay.querySelectorAll('.char');

    textChars.forEach((charSpan, index) => {
        if (index >= userChars.length) {
            charSpan.classList.remove('correct', 'incorrect');
        } else if (charSpan.textContent === userChars[index]) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
        }
    });

    if (userInput.value === currentText) {
        endGame();
    }
}

let leaderboard = [];
let recentGames = [];

function updateLeaderboard(newEntry) {
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.wpm - a.wpm);
    leaderboard = leaderboard.slice(0, 10); // Keep top 10

    leaderboardBody.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.wpm}</td>
            <td>${entry.accuracy}%</td>
            <td>${entry.mode}</td>
            <td>${entry.difficulty}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

function updateRecentGames(newGame) {
    recentGames.unshift(newGame);
    recentGames = recentGames.slice(0, 5); // Keep only 5 recent games

    const recentGamesList = document.getElementById('recent-games-list');
    recentGamesList.innerHTML = '';
    recentGames.forEach(game => {
        const li = document.createElement('li');
        li.textContent = `${game.wpm} WPM, ${game.accuracy}% accuracy (${game.mode}, ${game.difficulty})`;
        recentGamesList.appendChild(li);
    });
}

function updateHighScore() {
    const currentScore = calculateWPM();
    const highScoreKey = `${currentGameMode}-${currentDifficulty}`;
    
    if (!highScores[highScoreKey] || currentScore > highScores[highScoreKey]) {
        highScores[highScoreKey] = currentScore;
        highScoreDisplay.textContent = `${currentScore} WPM`;
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
}

function loadHighScores() {
    const savedHighScores = localStorage.getItem('highScores');
    if (savedHighScores) {
        highScores = JSON.parse(savedHighScores);
        updateHighScoreDisplay();
    }
}

function updateHighScoreDisplay() {
    const highScoreKey = `${currentGameMode}-${currentDifficulty}`;
    const currentHighScore = highScores[highScoreKey] || 0;
    highScoreDisplay.textContent = `${currentHighScore} WPM`;
}

toggleModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = toggleModeBtn.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

gameModeSelect.addEventListener('change', (e) => {
    currentGameMode = e.target.value;
    updateHighScoreDisplay();
    startGame();
});

difficultySelect.addEventListener('change', (e) => {
    currentDifficulty = e.target.value;
    updateHighScoreDisplay();
    startGame();
});

userInput.addEventListener('input', handleUserInput);
restartBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    startGame();
});

loadHighScores();
startGame();
});