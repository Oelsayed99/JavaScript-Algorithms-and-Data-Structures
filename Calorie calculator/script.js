const calorieCounter = document.getElementById("calorie-counter");
const budgetInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

let isError = false;

function cleanInputString(str) {
  return str.replace(/[+\-\s]/g, "");
}

function isInvalidInput(str) {
  return /\d+e\d+/i.test(str);
}

function addEntry() {
  const section = document.querySelector(`#${entryDropdown.value} .input-container`);
  const index = section.querySelectorAll("input[type='text']").length + 1;

  const html = `
    <label>Entry ${index} Name</label>
    <input type="text" placeholder="e.g. Eggs" />
    <label>Entry ${index} Calories</label>
    <input type="number" min="0" placeholder="e.g. 300" />
  `;

  section.insertAdjacentHTML("beforeend", html);
}

function getCalories(inputs) {
  let total = 0;
  for (const input of inputs) {
    const val = cleanInputString(input.value);
    if (isInvalidInput(val)) {
      alert("Invalid input: Exponential values not allowed.");
      isError = true;
      return 0;
    }
    total += Number(val) || 0;
  }
  return total;
}

function calculateCalories(e) {
  e.preventDefault();
  isError = false;

  const meals = ["breakfast", "lunch", "dinner", "snacks", "exercise"];
  const calorieSums = {};

  for (const meal of meals) {
    const inputs = document.querySelectorAll(`#${meal} input[type="number"]`);
    calorieSums[meal] = getCalories(inputs);
  }

  const budget = getCalories([budgetInput]);
  const consumed = calorieSums.breakfast + calorieSums.lunch + calorieSums.dinner + calorieSums.snacks;
  const remaining = budget - consumed + calorieSums.exercise;

  if (isError) return;

  const status = remaining < 0 ? "Surplus" : "Deficit";

  output.innerHTML = `
    <span class="${status.toLowerCase()}">${Math.abs(remaining)} Calorie ${status}</span>
    <hr />
    <p>🔢 Budget: ${budget} kcal</p>
    <p>🍽️ Consumed: ${consumed} kcal</p>
    <p>🏃 Burned: ${calorieSums.exercise} kcal</p>
  `;

  output.classList.remove("hide");
}

function clearForm() {
  document.querySelectorAll(".input-container").forEach(c => (c.innerHTML = ""));
  budgetInput.value = "";
  output.innerHTML = "";
  output.classList.add("hide");
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
