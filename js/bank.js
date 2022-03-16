//
function updateBalance(x, y) {
  return x - y;
}

//handle deposit
document
  .getElementById("calculate-button")
  .addEventListener("click", function () {
    const calculateInput = document.getElementById("income-amount");

    const newIncomeAmount = calculateInput.value;

    //update deposit
    const foodExpense = document.getElementById("food");
    const newFoodExpense = foodExpense.value;
    const rentExpense = document.getElementById("rent");
    const newRentExpense = rentExpense.value;
    const clothesExpense = document.getElementById("clothes");
    const newClothesExpense = clothesExpense.value;
    if (
      newIncomeAmount < 0 ||
      newFoodExpense < 0 ||
      newRentExpense < 0 ||
      newClothesExpense < 0
    ) {
      document.getElementById("error").innerText =
        "Please Input a valid Number";
      calculateInput.value = "";
    } else if (
      isNaN(newIncomeAmount) ||
      isNaN(newFoodExpense) ||
      isNaN(newClothesExpense) ||
      isNaN(newRentExpense)
    ) {
      document.getElementById("error").innerText = "Please Input a Number";
      calculateInput.value = "";
    } else {
      const expenseTotal = document.getElementById("expense-input");
      const previousAmountExpense = expenseTotal.innerText;
      const newExpenseTotal =
        parseFloat(previousAmountExpense) +
        parseFloat(newFoodExpense) +
        parseFloat(newClothesExpense) +
        parseFloat(newRentExpense);

      expenseTotal.innerText = newExpenseTotal;
      // update balance
      const previousBalance = document.getElementById("balance-input");

      const previousBalanceTotal = parseFloat(previousBalance.innerText);
      const newBalance = updateBalance(newIncomeAmount, newExpenseTotal);
      const newBalanceTotal = previousBalanceTotal + newBalance;
      if (newExpenseTotal > newIncomeAmount) {
        document.getElementById("error").innerText =
          "Expense must be less than or equal to income";
        expenseTotal.innerText = "00";
      } else {
        previousBalance.innerText = newBalanceTotal;
        document.getElementById("error").innerText = "";
      }
    }

    //clear the input field

    foodExpense.value = "";
    rentExpense.value = "";
    clothesExpense.value = "";
  });
//handle savings
document.getElementById("balance-save").addEventListener("click", function () {
  const savePercents = document.getElementById("percents");
  const newSavePercents = savePercents.value;
  const savingAmount = document.getElementById("save-amount");
  const calculateInput = document.getElementById("income-amount");
  const newIncomeAmount = calculateInput.value;
  const newSaveAmount = newIncomeAmount * (newSavePercents / 100);
  savingAmount.innerText = newSaveAmount;
  const remainingAmount = document.getElementById("remaining-balance");
  const previousBalance = document.getElementById("balance-input");

  const previousBalanceTotal = parseFloat(previousBalance.innerText);
  if (newSaveAmount >= previousBalanceTotal) {
    document.getElementById("error1").innerText =
      "Savings must be equal or less than balance";
      savingAmount.innerText="00";
      remainingAmount.innerText= previousBalanceTotal;
  } else {
    const newBalanceTotal = updateBalance(previousBalanceTotal, newSaveAmount);
    // const newBalanceTotal = previousBalanceTotal - newSaveAmount;
    remainingAmount.innerText = newBalanceTotal.toFixed(2);
    calculateInput.value = "";
    
  }
});
