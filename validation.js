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

// Function to validate and submit the form
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

  // if any input fields is empty, prevent from submission
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
  validateCVV();
}

// Function to validate CVV based on the selected card type
function validateCVV() {
  const cvvValue = cvvNumber.value.trim();
  if (cvvValue === "") {
    displayErrorMessage(cvvNumber, "Enter the CVV number.");
  } else {
    if (selectedCardType === "credit" && cvvValue.length === 3) {
      clearErrorMessages();
    } else if (selectedCardType === "credit" && cvvValue.length !== 3) {
      displayErrorMessage(cvvNumber, "Invalid CVV Number for Credit Cards.");
    } else if (
      selectedCardType === "americanExpress" &&
      cvvValue.length !== 4
    ) {
      displayErrorMessage(cvvNumber, "Invalid CVV for American Express.");
    } else if (selectedCardType === "debit" && cvvValue.length !== 3) {
      displayErrorMessage(cvvNumber, "Invalid CVV for debit card.");
    }
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

// Function to clear all error messages
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");
  // loop through each error message and clear the field
  errorMessages.forEach(errorMessage => {
    errorMessage.innerText = "";
  });
}

// Attach submitForm function to submit button click event
submitButton.addEventListener("click", submitForm);
