const CONTROL_CHARACTERS = "0123456789ABCDEFHJKLMNPRSTUVWXY";
const FULL_CODE_PATTERN = /^\d{6}.\d{3}.$/;   // DDMMYYCZZZQ
const FIRST_PART_PATTERN = /^\d{6}.\d{3}$/;   // DDMMYYCZZZ
const BIRTH_DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY
const MIN_INDIVIDUAL_NUMBER = 2;
const MAX_INDIVIDUAL_NUMBER = 899;

function getCentury(centurySign) {
    if (centurySign === "+") return 1800;
    if ("-YXWVU".includes(centurySign)) return 1900;
    if ("ABCDEF".includes(centurySign)) return 2000;
    return null;
}

function getCenturySign(year) {
    if (year < 1900) return "+";
    if (year < 2000) return "-";
    return "A";
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInMonth(month, year) {
    if (month === 2) return isLeapYear(year) ? 29 : 28;
    if (month === 4 || month === 6 || month === 9 || month === 11) return 30;
    return 31
}

function getDateError(day, month, year) {
  if (day < 1 || day > 31) return "day is wrong";
  if (month < 1 || month > 12) return "month is wrong";
  if (day > getDaysInMonth(month, year)) return "day or month is incorrect";
  if (new Date(year, month - 1, day) > new Date()) return "date is in the future";
  return "";
}

function getControlCharacter(datePart, individualNumber) {
    const remainder = Number(datePart + individualNumber) % 31;
    return CONTROL_CHARACTERS[remainder]
}

function isMaleFemale(individualNumber) {
    return individualNumber % 2 === 1;
}

function calculateAge(birthDate, referenceDate) {
    let years = referenceDate.getFullYear() - birthDate.getFullYear();
    let months = referenceDate.getMonth() - birthDate.getMonth();
    let days = referenceDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const lastDayOfPreviousMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 0);
        days += lastDayOfPreviousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return {years, months, days}
}

// Task 1 //
function validateIdentityCode(identityCode, referenceDate = new Date()) {
    const code = identityCode.trim().toUpperCase();

    if (!FULL_CODE_PATTERN.test(code)) {
        return {isValid: false, error: "format must be DDMMYYCZZZQ, e.g. 131052-308T"};
    }

    const datePart = code.slice(0, 6);
    const day = Number(code.slice(0, 2));
    const month = Number(code.slice(2, 4));
    const century = getCentury(code[6]);
    const individualNumber = code.slice(7, 10);
    const controlCharacter = code[10];

    if (century === null) {
        return {isValid: false, error: "century sign is wrong"};
    }
    const year = century + Number(code.slice(4, 6));

    const dateError = getDateError(day, month, year);
    if (dateError !== "") {
        return {isValid: false, error: dateError}
    }

    if (Number(individualNumber) < MIN_INDIVIDUAL_NUMBER) {
        return {isValid: false, error: 'individual number must be 002-899'};
    }

    if (controlCharacter !== getControlCharacter(datePart, individualNumber)) {
        return {isValid: false, error: "control character is wrong"}
    }

    const birthDate = new Date(year, month -1, day);
    return {
        isValid: true,
        sex: isMaleFemale(Number(individualNumber)) ? "Male" : "Female",
        age: calculateAge(birthDate, referenceDate),
    };
}

// Task 2a //
function createControlCharacter(firstPart) {
    const code = firstPart.trim().toUpperCase();

    if (!FIRST_PART_PATTERN.test(code)) {
        return {isValid: false, error: "format must be DDMMYYCZZZ. e.g. 131052-308"}
    }

    const checkResult = validateIdentityCode(code + "?");
    if (!checkResult.isValid && checkResult.error !== "control character is wrong") {
        return {isValid: false, error: checkResult.error};
    }

    return {isValid: true, controlCharacter: getControlCharacter(code.slice(0, 6), code.slice(7, 10))};
}

// Task 2b //
function createIdentityCode(birthDateText, sex, individualNumberText) {
    const dateText = birthDateText.trim();

    if (!BIRTH_DATE_PATTERN.test(dateText)) {
        return {isValid: false, error: "date must be DD/MM/YYYY"};
    }

    const [dayText, monthText, yearText] = dateText.split("/");
    const day = Number(dayText);
    const month = Number(monthText);
    const year = Number(yearText);

    if (year < 1800 || year > 2099) {
        return {isValid:false, error: "year must be 1800-2099"};
    }

    const dateError = getDateError(day, month, year);
    if (dateError !== "") {
        return {isValid: false, error: dateError};
    }

    if (sex !== "F" && sex !== "M") {
        return {isValid: false, error: "choose sex F or M"};
    }

    const isMalePerson = sex === "M";

    let individualNumber;
  if (individualNumberText === "") {
    // random number 2..898, then fix odd/even so it matches the sex (max 899)
    individualNumber = MIN_INDIVIDUAL_NUMBER + Math.floor(Math.random() * 897);
    if (isMaleFemale(individualNumber) !== isMalePerson) individualNumber++;
  } else {
    individualNumber = Number(individualNumberText);
    if (!(individualNumber >= MIN_INDIVIDUAL_NUMBER && individualNumber <= MAX_INDIVIDUAL_NUMBER)) {
      return { isValid: false, error: "individual number must be 2-899" };
    }
    if (isMaleFemale(individualNumber) !== isMalePerson) {
      return { isValid: false, error: isMalePerson ? "individual number must be odd for M" : "individual number must be even for F" };
    }
  }

  const datePart = dayText + monthText + yearText.slice(2);
  const individualNumberPart = String(individualNumber).padStart(3, "0");
  const controlCharacter = getControlCharacter(datePart, individualNumberPart);

  return {
    isValid: true,
    identityCode: datePart + getCenturySign(year) + individualNumberPart + controlCharacter,
  };
}
