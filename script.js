document.addEventListener("DOMContentLoaded", () => {
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
  const confetti = document.getElementById("confetti");
  const sadEmojis = document.getElementById("sadEmojis");
  const cheerSound = document.getElementById("cheerSound");

  const confettiLib = window.confetti;

  function generateNumber() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function blastConfetti() {
    // Left blast
    confettiLib({
      particleCount: 100,
      angle: 60,
      spread: 100,
      origin: { x: 0 }
    });
    // Right blast
    confettiLib({
      particleCount: 100,
      angle: 120,
      spread: 100,
      origin: { x: 1 }
    });
  }

  function endGame(success) {
    input.disabled = true;
    btn.disabled = true;
    restart.classList.remove("hidden");

    if (success) {
      msg.innerHTML = "🎉 Correct! You guessed the number!";
      confetti.classList.remove("hidden");
      cheerSound.play();
      blastConfetti();
    } else {
      msg.innerHTML = `😢 Out of attempts! The number was ${numberToGuess}`;
      sadEmojis.classList.remove("hidden");
    }
  }

  btn.addEventListener("click", () => {
    const guess = parseInt(input.value);

    if (isNaN(guess) || guess < min || guess > max) {
      msg.textContent = "❌ Enter a valid number between 1 and 100!";
      return;
    }

    attempts++;
    const remaining = maxAttempts - attempts;
    left.textContent = `🔄 Attempts Left: ${remaining}`;

    if (guess === numberToGuess) {
      endGame(true);
    } else if (guess < numberToGuess) {
      msg.textContent = "📉 Too low! Try again.";
    } else {
      msg.textContent = "📈 Too high! Try again.";
    }

    if (attempts >= maxAttempts && guess !== numberToGuess) {
      endGame(false);
    }
  });

  restart.addEventListener("click", () => {
    numberToGuess = generateNumber();
    attempts = 0;
    input.value = "";
    input.disabled = false;
    btn.disabled = false;
    msg.textContent = "";
    left.textContent = `🔄 Attempts Left: ${maxAttempts}`;
    restart.classList.add("hidden");
    confetti.classList.add("hidden");
    sadEmojis.classList.add("hidden");
  });
});
