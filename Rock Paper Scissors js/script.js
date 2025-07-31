function getRandomComputerResult() {
        const options = ["Rock", "Paper", "Scissors"];
        return options[Math.floor(Math.random() * options.length)];
      }

      function hasPlayerWon(player, computer) {
        return (
          (player === "Rock" && computer === "Scissors") ||
          (player === "Scissors" && computer === "Paper") ||
          (player === "Paper" && computer === "Rock")
        );
      }

      let playerScore = 0;
      let computerScore = 0;

      const playerScoreEl = document.getElementById("player-score");
      const computerScoreEl = document.getElementById("computer-score");
      const resultsMsg = document.getElementById("results-msg");
      const winnerMsg = document.getElementById("winner-msg");
      const resetBtn = document.getElementById("reset-game-btn");
      const optionsContainer = document.querySelector(".options-container");

      function showResults(userOption) {
        const computerOption = getRandomComputerResult();

        if (hasPlayerWon(userOption, computerOption)) {
          playerScore++;
          resultsMsg.innerText = `You win! ${userOption} beats ${computerOption}`;
        } else if (userOption === computerOption) {
          resultsMsg.innerText = `It's a tie! You both chose ${userOption}`;
        } else {
          computerScore++;
          resultsMsg.innerText = `Computer wins! ${computerOption} beats ${userOption}`;
        }

        playerScoreEl.innerText = playerScore;
        computerScoreEl.innerText = computerScore;

        if (playerScore === 3 || computerScore === 3) {
          winnerMsg.innerText = `${
            playerScore === 3 ? "You" : "Computer"
          } won the game! 🏆`;
          resetBtn.style.display = "block";
          optionsContainer.style.display = "none";
        }
      }

      function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreEl.innerText = "0";
        computerScoreEl.innerText = "0";
        resultsMsg.innerText = "";
        winnerMsg.innerText = "";
        resetBtn.style.display = "none";
        optionsContainer.style.display = "block";
      }

      document.getElementById("rock-btn").onclick = () => showResults("Rock");
      document.getElementById("paper-btn").onclick = () => showResults("Paper");
      document.getElementById("scissors-btn").onclick = () => showResults("Scissors");
      resetBtn.onclick = resetGame;