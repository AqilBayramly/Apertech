function sendMail() {
  let params = {
    name: document.getElementById("contactName").value,
    email: document.getElementById("contactEmail").value,
    message: document.getElementById("msg").value,
    number: document.getElementById("phoneNumber").value,
    country: document.getElementById("contactCountry").value,
    companyName: document.getElementById("companyName").value,
    solutions: document.getElementById("companySolutions").value,
    website: document.getElementById("companyWeb").value,
  };

  const serviceID = "service_hxd7j0a";
  const templateID = "template_suotqjf";

  let isEmptyField = false;

  if (
    params.name === "" ||
    params.email === "" ||
    params.message === "" ||
    params.number === "" ||
    params.country === "" ||
    params.companyName === "" ||
    params.solutions === "" 
  ) {
    isEmptyField = true;
    if (isEmptyField) {
      if (params.name === "") {
        document.getElementById("contactName").style.border = "1px solid red";
        showError("contactName", "This field is required");
      }
      if (params.email === "") {
        document.getElementById("contactEmail").style.border = "1px solid red";
        showError("contactEmail", "This field is required");
      } else if (!isValidEmailWithDomainCheck(params.email)) {

        document.getElementById("contactEmail").style.border = "1px solid red";
        showError("contactEmail", "Please enter a valid email address");
      }
      if (params.number === "") {
        document.getElementById("phoneNumber").style.border = "1px solid red";
        showError("phoneNumber", "This field is required");
      }else if (!isValidNumber(params.number)) {
        document.getElementById("phoneNumber").style.border = "1px solid red";
        showError("phoneNumber", "Please enter a valid phone number (0-9; min 9 - max 14 digits)");
      }

      if (params.country === "") {
        document.getElementById("contactCountry").style.border = "1px solid red";
        showError("contactCountry", "This field is required");
      }
      if (params.companyName === "") {
        document.getElementById("companyName").style.border = "1px solid red";
        showError("companyName", "This field is required");
      }
      if (params.solutions === "") {
        document.getElementById("companySolutions").style.border = "1px solid red";
        showError("companySolutions", "This field is required");
      }
      // if (params.website === "") {
      //   document.getElementById("companyWeb").style.border = "1px solid red";
      //   showError("companyWeb", "This field is required");
      // }
      if (params.message === "") {
        document.getElementById("msg").style.border = "1px solid red";
        showError("msg", "This field is required");
      }

      // Add event listeners to revert border color and remove error messages when clicked
      document.getElementById("contactName").addEventListener("click", revertFieldState);
      document.getElementById("contactEmail").addEventListener("click", revertFieldState);
      document.getElementById("phoneNumber").addEventListener("click", revertFieldState);
      document.getElementById("contactCountry").addEventListener("click", revertFieldState);
      document.getElementById("companyName").addEventListener("click", revertFieldState);
      document.getElementById("companySolutions").addEventListener("click", revertFieldState);
      // document.getElementById("companyWeb").addEventListener("click", revertFieldState);
      document.getElementById("msg").addEventListener("click", revertFieldState);

      return;
    }
  } else {
    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        document.getElementById("contactName").value = "";
        document.getElementById("contactEmail").value = "";
        document.getElementById("msg").value = "";
        document.getElementById("phoneNumber").value = "";
        document.getElementById("contactCountry").value = "";
        document.getElementById("companyName").value = "";
        document.getElementById("companySolutions").value = "";
        document.getElementById("companyWeb").value = "";

        showSuccessBanner();

      })
      .catch((err) => console.log(err));

  }
}

function showSuccessBanner(params) {
  const successBanner = document.getElementById('successBanner');
  if (successBanner) {
    successBanner.style.display = "block";

    setTimeout(function() {
      successBanner.style.display="none";
    }, 5000);
  }
}

// Function to revert the border color and remove error message when clicked
function revertFieldState(event) {
  const fieldId = event.target.id;
  const fieldElement = document.getElementById(fieldId);
  fieldElement.style.border = ""; // Set border style to empty (default)
  
  removeError(fieldId); // Remove the error message associated with the field
}

// Function to show error message next to the empty field
function showError(fieldId, errorMessage) {
  const errorId = fieldId + "-error";
  const existingErrorElement = document.getElementById(errorId);
  if (existingErrorElement) {
    existingErrorElement.remove();
  }
  
  const errorElement = document.createElement("span");
  errorElement.id = errorId;
  errorElement.classList.add("error-message");
  errorElement.innerText = errorMessage;

  const fieldContainer = document.getElementById(fieldId).parentNode;
  fieldContainer.appendChild(errorElement);
}

// Function to remove error message
function removeError(fieldId) {
  const errorId = fieldId + "-error";
  const errorElement = document.getElementById(errorId);
  if (errorElement) {
    errorElement.remove();
  }
}

// Function to validate email address using indexOf

function isValidEmailWithDomainCheck(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedDomains = ['mail.ru', 'gmail.com', 'inbox.ru', 'bk.ru', 'list.ru', 'internet.ru', 'yandex.ru', 'yahoo.com', 'hotmail.com', 'outlook.com'];

  if (!emailRegex.test(email)) {
    return false;
  }

  const domain = email.split('@')[1];
  if (!allowedDomains.includes(domain)) {
    return false;
  }

  return true;
}

function isValidNumber(number) {
  const numberRegex = /^(\+)?\d{9,14}$/;
  return numberRegex.test(number);
}

// Get the input element

const phoneNumberInput = document.getElementById('phoneNumber');

// Add an input event listener

phoneNumberInput.addEventListener('input', function(event) {

  // Get the current value of the input field

  const inputValue = event.target.value;
  const numericValue = inputValue.replace(/[^+\d]/g, '');

  // Update the input field value

  event.target.value = numericValue;

});

const textarea = document.getElementById('msg');
textarea.addEventListener('input', validateTextarea);

function validateTextarea() {
  const message = textarea.value.trim();
  const wordCount = message === '' ? 0 : message.split(/\s+/).length;

  // Update the word count display
  const wordCountMessage = document.getElementById('wordCountMessage');
  wordCountMessage.textContent = `Word count: ${wordCount}`;

  // Check if the textarea contains at least 100 words
  if (wordCount < 100) {
    textarea.setCustomValidity('Please enter at least 100 words.');
  } else {
    textarea.setCustomValidity('');
  }
}