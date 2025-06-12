const min = 1;
const max = 100;
const maxAttempts = 7;
let attempts = 0;
let numberToGuess = generateNumber();

const input = document.getElementById("guessInput");
const btn = document.getElementById("guessBtn");
const msg = document.getElementById("message");
const left = document.getElementById("attemptsLeft");
const restart = document.getElementById("restartBtn");

function generateNumber() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

btn.addEventListener("click", () => {
  const guess = parseInt(input.value);
  if (isNaN(guess) || guess < min || guess > max) {
    msg.textContent = "❌ Enter a valid number between 1 and 100!";
    return;
  }

  attempts++;
  const remaining = maxAttempts - attempts;
  left.textContent = `🕐 Attempts Left: ${remaining}`;

  if (guess === numberToGuess) {
    msg.textContent = `🎉 You guessed it right in ${attempts} tries!`;
    blastConfetti();
    gameOver(true);
  } else if (attempts === maxAttempts) {
    msg.textContent = `😢 Game Over! The correct number was ${numberToGuess}.`;
    showSadEmojis();
    gameOver(false);
  } else {
    msg.textContent = guess < numberToGuess ? "📉 Too Low!" : "📈 Too High!";
  }

  input.value = "";
});

restart.addEventListener("click", () => {
  numberToGuess = generateNumber();
  attempts = 0;
  msg.textContent = "";
  left.textContent = "";
  input.disabled = false;
  btn.disabled = false;
  restart.style.display = "none";
  msg.style.color = "#fff";
});

function gameOver(success) {
  input.disabled = true;
  btn.disabled = true;
  restart.style.display = "inline-block";
  msg.style.color = success ? "#00ff88" : "#ff6464";
}

function blastConfetti() {
  confetti({
    particleCount: 100,
    angle: 60,
    spread: 100,
    origin: { x: 0 },
  });

  confetti({
    particleCount: 100,
    angle: 120,
    spread: 100,
    origin: { x: 1 },
  });
}

function showSadEmojis() {
  const container = document.getElementById("sadEmojis");
  container.classList.remove("hidden");

  const emojis = container.querySelectorAll("span");
  emojis.forEach((emoji) => {
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = `${Math.random() * -50}px`;
  });

  setTimeout(() => {
    container.classList.add("hidden");
  }, 6000);
}

