document.addEventListener("DOMContentLoaded", function () {
  const checkBtn = document.getElementById("check-btn");
  const outputMsg = document.getElementById("result");

  checkBtn.addEventListener("click", function () {
    const inputEl = document.getElementById("text-input");
    const rawInput = inputEl.value.trim();

    if (rawInput === "") {
      alert("Please input a value.");
      return;
    }

    const cleanedInput = rawInput.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
    const reversed = cleanedInput.split("").reverse().join("");

    outputMsg.textContent = cleanedInput === reversed
      ? `"${rawInput}" is a palindrome`
      : `"${rawInput}" is not a palindrome`;
  });
});
