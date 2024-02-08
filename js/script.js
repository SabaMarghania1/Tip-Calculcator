const billInput = document.querySelector("#bill");
const tips = document.querySelectorAll(".tip-item");
const peopleQty = document.querySelector("#people");
const resetBtn = document.querySelector(".reset");
const error = document.querySelector(".error");

const totalForPerson = document.querySelector(".total-amount");
const tipForPerson = document.querySelector(".tip-amount");

let billValue = 0;
let tipValue = 0;
let peopleValue = 0;

function getBill() {
  billValue = +billInput.value;
  calculateTip();
}

function peopleInput() {
  peopleValue = +peopleQty.value;
  if (peopleValue < 1) {
    peopleQty.classList.add("error-border");
    error.style.display = "block";
  } else {
    peopleQty.classList.remove("error-border");
    error.style.display = "none";
  }
  calculateTip();
}

function handleClick(e) {
  tips.forEach(val => {
    val.classList.remove("selected");
    if (e.target.innerHTML === val.innerHTML) {
      val.classList.add("selected");
      tipValue = parseFloat(val.dataset.value);
    }
  });
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + billValue * tipValue) / peopleValue;

    tipForPerson.innerHTML = "$" + tipAmount.toFixed(2);
    totalForPerson.innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  billInput.value = 0;

  tips.forEach(val => {
    val.classList.remove("selected");
  });

  peopleQty.value = 0;

  tipForPerson.innerHTML = "$0.00";
  totalForPerson.innerHTML = "$0.00";

  peopleQty.classList.remove("error-border");
  error.style.display = "none";
}

resetBtn.addEventListener("click", reset);
billInput.addEventListener("input", getBill);
peopleQty.addEventListener("input", peopleInput);
tips.forEach(tipItem => {
  tipItem.addEventListener("click", handleClick);
});
