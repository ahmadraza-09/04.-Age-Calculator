let yearsElement, monthsElement, daysElement, dateInputElement, errorMessageElement;

const initializeElements = () => {
    yearsElement = document.getElementById('years');
    monthsElement = document.getElementById('months');
    daysElement = document.getElementById('days');
    dateInputElement = document.getElementById("date-input");
    errorMessageElement = document.getElementById('error-message');
}

// Ensure initializeElements is called when the document is fully loaded
document.addEventListener('DOMContentLoaded', initializeElements);

const getTodayWithoutTime = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

const getDateWithoutTime = (date) => {
    date.setHours(0, 0, 0, 0)
    return date;
}

const validateDateInput = (inputDate) => {
    const today = getTodayWithoutTime();
    let validationResult = { isValid: true, errorMessage: '' };

    if (isNaN(inputDate.getTime())) {
        validationResult = { isValid: false, errorMessage: "Invalid date. Please enter a valid date." };
    } else if (getDateWithoutTime(inputDate) > today) {
        validationResult = { isValid: false, errorMessage: "Not born yet." };
    }

    return validationResult;
}


const calculateAgeFromDate = (birthDate) => {
    const today = getTodayWithoutTime();
    birthDate = getDateWithoutTime(birthDate);  // Remove time components for accurate comparison
    const age = { years: 0, months: 0, days: 0 };

    // Calculate years
    age.years = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age.years--;
    }

    // Calculate months
    age.months = today.getMonth() - birthDate.getMonth();
    if (today.getDate() < birthDate.getDate()) {
        age.months--;
    }
    if (age.months < 0) {
        age.months += 12;
    }

    // Calculate days
    let daysInBirthMonth = new Date(birthDate.getFullYear(), birthDate.getMonth() + 1, 0).getDate();
    if (today.getDate() < birthDate.getDate()) {
        age.days = daysInBirthMonth - birthDate.getDate() + today.getDate();
    } else {
        age.days = today.getDate() - birthDate.getDate();
    }

    return age;
}

const calculateAge = () => {
    // Clear previous error message
    displayError("");

    // Read the user's date input
    const birthDate = new Date(dateInputElement.value);

    const validation = validateDateInput(birthDate);
    if (!validation.isValid) {
        displayError(validation.errorMessage);
        displayResult('-', '-', '-');
        return;
    }

    const { days, months, years } = calculateAgeFromDate(birthDate);

    displayResult(days, months, years);
}

const displayError = (message = '') => {
    errorMessageElement.textContent = message;
}

const displayResult = (days, months, years) => {
    yearsElement.textContent = years;
    monthsElement.textContent = months;
    daysElement.textContent = days;
}
