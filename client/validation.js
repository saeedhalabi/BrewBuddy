// Status elements
const checkText = document.getElementById("checkText");
const checkTextAmericanExp = document.getElementById("checkTextAmericanExp");
const debitCardElement = document.getElementById("debitCard");

// Validation inputs
const amountInput = document.getElementById("grid-amount");
const nameCardInput = document.getElementById("grid-name");
const cardNumberInput = document.getElementById("grid-card-number");
const expMonthInput = document.getElementById("expiration-month");
const expYearInput = document.getElementById("expiration-year");
const cvvNumber = document.getElementById("cvv-number");

const submitButton = document.getElementById("submitBtn");

let selectedCardType = ""; // Variable to store the selected card type

function selectCreditCard() {
  // Display the selected message
  checkText.innerText = "You selected Credit Card...";
  selectedCardType = "credit"; // Set selected card type to credit card

  // Clear the text in the other paragraphs
  checkTextAmericanExp.innerText = "";
  debitCardElement.innerText = "";
}

function selectAmericanExpressCard() {
  checkTextAmericanExp.innerText = "You selected American Express Card...";
  checkTextAmericanExp.style.textAlign = "center";
  selectedCardType = "americanExpress"; // Set selected card type to American Express

  // Clear the text in the other paragraphs
  checkText.innerText = "";
  debitCardElement.innerText = "";
}

function selectDebitCard() {
  debitCardElement.innerText = "You selected debit card...";
  selectedCardType = "debit"; // Set selected card type to debit card

  // Clear the text in the other paragraphs
  checkText.innerText = "";
  checkTextAmericanExp.innerText = "";
}

function submitForm(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Clear previous error messages
  clearErrorMessages();

  // Field Validation
  validateInput(amountInput, "Fill out the Amount.");
  validateInput(nameCardInput, "Enter your Name.");
  validateInput(cardNumberInput, "Input the Card Number.");
  validateInput(expMonthInput, "Specify the Expiration Month.");
  validateInput(expYearInput, "Specify the Expiration Year.");
  validateInput(cvvNumber, "Enter the CVV Number.");

  // Additional validation for amount
  validateAmount();

  // validation for cvv
  validateCVV();

  // validation for card number
  validateCardNumber();

  // validation for the month
  validateExpMonth();

  // validation for the year
  validateExpYear();

  // if any input fields are empty, prevent submission
  if (
    amountInput.value.trim() === "" ||
    nameCardInput.value.trim() === "" ||
    cardNumberInput.value.trim() === "" ||
    expMonthInput.value.trim() === "" ||
    expYearInput.value.trim() === "" ||
    cvvNumber.value.trim() === ""
  ) {
    return;
  }
}

function validateAmount() {
  const amountValue = parseFloat(amountInput.value.trim());

  if (amountValue === "") {
    displayErrorMessage(amountInput, "Fill out the amount.");
  } else if (amountValue.length > 6) {
    displayErrorMessage(amountInput, "Amount cannot exceed 6 digits!");
  } else {
    clearErrorMessages();
  }
}

function validateCVV() {
  const cvvValue = cvvNumber.value.trim();
  if (cvvValue === "") {
    displayErrorMessage(cvvNumber, "Enter the CVV number.");
  } else {
    if (selectedCardType === "credit" && cvvValue.length !== 3) {
      displayErrorMessage(cvvNumber, "Invalid CVV Number for Credit Cards.");
    } else if (
      selectedCardType === "americanExpress" &&
      cvvValue.length !== 4
    ) {
      displayErrorMessage(cvvNumber, "Invalid CVV for American Express.");
    } else if (selectedCardType === "debit" && cvvValue.length !== 3) {
      displayErrorMessage(cvvNumber, "Invalid CVV for debit card.");
    } else {
      clearErrorMessages(); // Clear errors if the CVV length is correct
    }
  }
}

function validateCardNumber() {
  const cardNumberValue = cardNumberInput.value.trim();

  if (cardNumberValue === "") {
    displayErrorMessage(cardNumberInput, "Input the Card Number");
  } else if (cardNumberValue.length > 16) {
    displayErrorMessage(
      cardNumberInput,
      "Card Number exceeded character limit!"
    );
  } else {
    clearErrorMessages();
  }
}

function validateExpMonth() {
  const expMonthValue = expMonthInput.value.trim();

  if (expMonthValue === "") {
    displayErrorMessage(expMonthInput, "Specify The Expiration Month");
  } else if (
    expMonthValue.length !== 2 ||
    isNaN(expMonthValue) ||
    parseInt(expMonthValue) < 1 ||
    parseInt(expMonthValue) > 12
  ) {
    displayErrorMessage(
      expMonthInput,
      "Wrong, enter the correct month (01-12)"
    );
  } else {
    clearErrorMessages(expMonthInput); // Clear only the error message for expiration month
  }
}

function validateExpYear() {
  const expYearValue = expYearInput.value.trim();

  if (expYearValue === "") {
    displayErrorMessage(expYearInput, "Specify The Expiration Year");
  } else if (expYearValue.length != 4) {
    displayErrorMessage(expYearInput, "Enter the correct year.");
  } else {
    clearErrorMessages(expYearInput);
  }
}

// Function to validate the amount

// Function to validate input fields
function validateInput(inputElement, errorMessage) {
  if (inputElement.value.trim() === "") {
    displayErrorMessage(inputElement, errorMessage);
  }
}

// Function to display error message for an input field
function displayErrorMessage(inputElement, errorMessage) {
  inputElement.nextElementSibling.innerText = errorMessage;
  inputElement.nextElementSibling.style.color = "red";
}

function clearErrorMessages() {
  // Select all elements with the class "error-message"
  const errorMessages = document.querySelectorAll(".error-message");

  // Loop through each error message
  errorMessages.forEach(errorMessage => {
    // Get the input element associated with the error message
    const inputElement = errorMessage.previousElementSibling;

    // Check if the input field is not empty
    if (inputElement.value.trim() !== "") {
      // If input field is not empty, clear the error message
      errorMessage.innerText = "";
    } else if (inputElement === cardNumberInput) {
      // If the input field is the card number, validate its length
      const cardNumberValue = cardNumberInput.value.trim();
      if (cardNumberValue.length !== 16) {
        // If card number length is not 16, display an error message
        errorMessage.innerText = "Invalid Card Number";
        errorMessage.style.color = "red";
      }
    } else if (inputElement === cvvNumber) {
      // If the input field is the CVV number, validate its length
      const cvvValue = cvvNumber.value.trim();
      let validCVVLength;
      // Determine the valid CVV length based on the selected card type
      if (selectedCardType === "americanExpress") {
        validCVVLength = 4; // American Express CVV length is 4
      } else {
        validCVVLength = 3; // Other cards have CVV length of 3
      }
      if (cvvValue.length !== validCVVLength) {
        // If CVV number length is not valid, display an error message
        errorMessage.innerText = "Invalid CVV Number";
        errorMessage.style.color = "red";
      }
    }
  });
}

// Attach submitForm function to submit button click event
submitButton.addEventListener("click", submitForm);
