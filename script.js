function init() {
  updateCash();
}

function toggleWallet() {
  const popup = document.getElementById("popup-wallet");
  popup.classList.toggle("visible");
}

/* Wallet Cash -------------------------------------------------------------------------------------------------*/

let cash = 0;

function addCash() {
  const inputField = document.getElementById("cashInput");

  const amountToAdd = parseFloat(inputField.value);

  if (!isNaN(amountToAdd) && amountToAdd > 0 && amountToAdd < 20000) {
    cash += amountToAdd;

    updateCash();

    inputField.value = "";
  } else {
    alert("Please enter only numbers!");
  }
}

document
  .getElementById("cashInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addCash(); // Ruft die Funktion addCash auf
    }
  });

function updateCash() {
  const display = document.getElementById("displayCash");
  const overviewCash = document.getElementById("overviewCash");

  display.innerHTML = `Cash: ${cash.toFixed(2)} €`;
  overviewCash.innerHTML = `Your portfolio value is ${cash.toFixed(2)} €`;
}

/*------------------------------------------------------------------------------------------------------------*/
