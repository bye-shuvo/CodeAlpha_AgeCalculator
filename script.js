const ageInputForm = document.getElementById("inputForm");
const monthElement = document.getElementById("month");
const monthInput = document.getElementById("monthInput");
const dayInput = document.getElementById("dayInput");
const yearInput = document.getElementById("yearInput");
const dayLabel = document.getElementById("dayLabel");
const yearLabel = document.getElementById("yearLabel");
const dayValidator = document.getElementById("dayValidator");
const yearValidator = document.getElementById("yearValidator");
const monthNameElement = document.getElementById("monthNames");
const caretToggler = document.getElementsByClassName("caret-toggler");
const calculationBtn = document.getElementById("calculationBtn");
const result = document.getElementById("result");

//Basic Initializations
let inputDate;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
monthInput.value = `${months[0]}`;

//creation of li elements inside the ul element
months.map((month, index) => {
  monthNameElement.innerHTML += `<li key=${index}>${month}</li>`;
});

const handleValidation = (inputDate) => {
  //Logic for input validation

  if (inputDate.day < 1 || inputDate.day > 31) {
    dayValidator.innerText = `Please enter a valid day(1 - 31)`;
    dayValidator.classList.add("show-validation");
    dayInput.classList.add("invalid");
    dayLabel.classList.add("invalid-label");
  } else {
    dayValidator.classList.remove("show-validation");
    dayInput.classList.remove("invalid");
    dayLabel.classList.remove("invalid-label");
  }

  if (inputDate.year < 1800 || inputDate.year > 3000) {
    yearValidator.innerText = `Please enter a valid year(1800 - 3000)`;
    yearValidator.classList.add("show-validation");
    yearInput.classList.add("invalid");
    yearLabel.classList.add("invalid-label");
  } else {
    yearValidator.classList.remove("show-validation");
    yearInput.classList.remove("invalid");
    yearLabel.classList.remove("invalid-label");
  }

  if (inputDate.year === null && inputDate.day === null) {
    result.innerHTML = `<p class='error'>Please fill in a complete birthday</p>`;
  } else if (
    (inputDate.year === null && inputDate.day !== null) ||
    (inputDate.day === null && inputDate.year !== null)
  ) {
    result.innerHTML = `<p class='error'>Please fill in a complete birthday</p>`;
  } else {
    result.innerHTML = `<p class='error'>Please enter a valid birthday</p>`;
  }
};

//Function for submitting the HTML input Form
const handleSubmit = (e) => {
  e.preventDefault();
  const formdata = new FormData(e.target);
  const monthNumber = months.findIndex((month) => month === monthInput.value);

  inputDate = {
    day: formdata.get("day") ? Number(formdata.get("day")) : null,
    month: monthNumber + 1, //+1 for the array index
    year: formdata.get("year") ? Number(formdata.get("year")) : null,
  };

  handleValidation(inputDate);

  function validationUtils(rangeText){
        dayValidator.innerText = `Please enter a valid day${rangeText}`;
        dayValidator.classList.add("show-validation");
        dayInput.classList.add("invalid");
        dayLabel.classList.add("invalid-label");
        result.innerHTML = `<p class='error'>Please enter a valid day${rangeText} for your selected month</p>`;
  }

  if (inputDate.month <= 7) {
    if (inputDate.month === 2) {
      if (inputDate.day > 28) {
        validationUtils('(1 - 28)');
        return;
      }
    }
    if (inputDate.month % 2 === 0) {
      if (inputDate.day > 30) {
        validationUtils('(1 - 30)');
        return;
      }
    }
  } else if (inputDate.month >= 8) {
    if (inputDate.month % 2 !== 0) {
      if (inputDate.day > 30) {
        validationUtils('(1 - 30)');
        return;
      }
    }
  }

  if (
    inputDate.year > 1800 &&
    inputDate.year < 3000 &&
    inputDate.day > 1 &&
    inputDate.day < 32
  ) {
    handleShowResult();
  }
};

function handleShowResult() {
  const date = new Date();
  const currentDate = {
    day: date.getDate(),
    month: date.getMonth() + 1, // +1 for zero based indexing of the .getMonths() method
    year: date.getFullYear(),
  };

  //Main Logic For age calculation

  if (currentDate.year < inputDate.year) {
    result.innerHTML = `<p class='error'>Birth Date has to be earlier than Current Date</p>`;
    return;
  }

  if (
    currentDate.year === inputDate.year &&
    currentDate.month < inputDate.month
  ) {
    result.innerHTML = `<p class='error'>Birth Date has to be earlier than Current Date</p>`;
    return;
  }

  if (
    currentDate.year === inputDate.year &&
    currentDate.month === inputDate.month &&
    currentDate.day < inputDate.day
  ) {
    result.innerHTML = `<p class='error'>Birth Date has to be earlier than Current Date</p>`;
    return;
  }

  if (
    currentDate.year > inputDate.year &&
    currentDate.month <= inputDate.month
  ) {
    currentDate.year -= 1;
    currentDate.month += 12;
  }

  if (
    currentDate.year >= inputDate.year &&
    currentDate.month > inputDate.month &&
    currentDate.day < inputDate.day
  ) {
    if (inputDate.month === 2) {
      currentDate.day += 28;
    } else if (inputDate.month <= 7) {
      inputDate.month % 2 === 0
        ? (currentDate.day += 30)
        : (currentDate.day += 31);
    } else if (inputDate.month >= 8) {
      inputDate.month % 2 === 0
        ? (currentDate.day += 31)
        : (currentDate.day += 30);
    }
    currentDate.month -= 1;
  }

  const calculatedAge = {
    day: () => {
      return currentDate.day - inputDate.day;
    },
    month: () => {
      return currentDate.month - inputDate.month;
    },
    year: () => {
      return currentDate.year - inputDate.year;
    },
  };

  result.innerHTML = `You are ${calculatedAge.year()} years , ${calculatedAge.month()} months and ${calculatedAge.day()} days old`;
  return;
}

const handleModalOpen = (e) => {
  e.preventDefault();
  e.stopPropagation();
  caretToggler[0].classList.toggle("rotate-caret-down");
  monthNameElement.classList.toggle("monthNames-close");
  monthNameElement.classList.toggle("monthNames-open");
};

const handleMonthSelect = (e) => {
  monthInput.value = e.target.innerText;
};

const handleOutSideClick = (e) => {
  if (
    e.target !== monthElement &&
    e.target !== monthElement.children[1] &&
    e.target !== caretToggler
  ) {
    monthNameElement.classList.remove("monthNames-open");
    monthNameElement.classList.add("monthNames-close");
    caretToggler[0].classList.remove("rotate-caret-down");
  }
};

ageInputForm.addEventListener("submit", handleSubmit);
monthElement.addEventListener("click", handleModalOpen);
monthNameElement.addEventListener("click", handleMonthSelect);
window.addEventListener("click", handleOutSideClick);
