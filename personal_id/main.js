// Connects the forms in index.html to the functions in hetu.js

const AGE_DATE_PATTERN = /^\d{2}\.\d{2}\.\d{4}$/; // DD.MM.YYYY

// Page elements
const checkForm = document.getElementById("f1");
const identityCodeInput = document.getElementById("hetu");
const ageDateInput = document.getElementById("ageDate");
const clearButton = document.getElementById("clear1");
const checkOutput = document.getElementById("out1");

const controlCharacterForm = document.getElementById("f2");
const firstPartInput = document.getElementById("prefix");
const controlCharacterOutput = document.getElementById("out2");

const createForm = document.getElementById("f3");
const birthDateInput = document.getElementById("dob");
const individualNumberInput = document.getElementById("ind");
const createOutput = document.getElementById("out3");

// Show a result in a green (valid) or red (invalid) box
function showResult(outputElement, isValid, message) {
  outputElement.className = isValid ? "out ok" : "out bad";
  outputElement.textContent = message;
}

// Read the age date (DD.MM.YYYY). Empty = today. Returns a Date, or null if the text is wrong.
function getReferenceDate(ageDateText) {
  if (ageDateText === "") return new Date();
  if (!AGE_DATE_PATTERN.test(ageDateText)) return null;

  const [dayText, monthText, yearText] = ageDateText.split(".");
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  if (getDateError(day, month, year) !== "") return null;

  return new Date(year, month - 1, day);
}

// TASK 1: check an identity code
function handleCheckSubmit(event) {
  event.preventDefault();
  const identityCode = identityCodeInput.value;
  const referenceDate = getReferenceDate(ageDateInput.value.trim());

  if (referenceDate === null) {
    showResult(checkOutput, false, "Age date must be a real date DD.MM.YYYY");
    return;
  }

  const result = validateIdentityCode(identityCode, referenceDate);
  if (!result.isValid) {
    showResult(checkOutput, false, "input: " + identityCode + "\nis valid: false, " + result.error);
    return;
  }

  const age = result.age;
  showResult(checkOutput, true,
    "input: " + identityCode +
    "\nis valid: true" +
    "\nsex: " + result.sex +
    "\nage: " + age.years +
    "\n(" + age.years + " years " + age.months + " months " + age.days + " days)");
}

function handleClearClick() {
  identityCodeInput.value = "";
  ageDateInput.value = "";
  checkOutput.className = "out";
}

// TASK 2a: control character for a first part
function handleControlCharacterSubmit(event) {
  event.preventDefault();
  const firstPart = firstPartInput.value;
  const result = createControlCharacter(firstPart);

  if (result.isValid) {
    showResult(controlCharacterOutput, true, "input: " + firstPart + "\noutput: " + result.controlCharacter);
  } else {
    showResult(controlCharacterOutput, false, "input: " + firstPart + "\nerror: " + result.error);
  }
}

// TASK 2b: create a new identity code
function handleCreateSubmit(event) {
  event.preventDefault();
  const checkedSexInput = document.querySelector('input[name="sex"]:checked');
  const sex = checkedSexInput ? checkedSexInput.value : "";
  const result = createIdentityCode(birthDateInput.value, sex, individualNumberInput.value.trim());

  if (result.isValid) {
    showResult(createOutput, true, "identity code: " + result.identityCode);
  } else {
    showResult(createOutput, false, "error: " + result.error);
  }
}

checkForm.addEventListener("submit", handleCheckSubmit);
clearButton.addEventListener("click", handleClearClick);
controlCharacterForm.addEventListener("submit", handleControlCharacterSubmit);
createForm.addEventListener("submit", handleCreateSubmit);