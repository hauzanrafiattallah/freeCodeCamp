function checkCashRegister(price, cash, cid) {
  const currencyUnitValues = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
  };

  // Calculate change due
  let changeDue = cash - price;

  // Calculate total amount in cash drawer
  let totalInDrawer = 0;
  for (let i = 0; i < cid.length; i++) {
      totalInDrawer += cid[i][1];
  }
  totalInDrawer = parseFloat(totalInDrawer.toFixed(2));

  // Check if there is insufficient funds in the drawer
  if (changeDue > totalInDrawer) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  // Check if change due is equal to total in drawer, then return closed status
  if (changeDue === totalInDrawer) {
      return { status: "CLOSED", change: cid };
  }

  // Calculate change using available currency units
  let changeArray = [];
  for (let i = 8; i >= 0; i--) {
      const currencyUnit = cid[i][0];
      const unitValue = currencyUnitValues[currencyUnit];
      const availableAmount = cid[i][1];
      let numberOfUnits = Math.floor(changeDue / unitValue);
      let returnedAmount = numberOfUnits * unitValue;

      // Adjust numberOfUnits if the requested amount is not available
      if (returnedAmount > availableAmount) {
          numberOfUnits = Math.floor(availableAmount / unitValue);
          returnedAmount = numberOfUnits * unitValue;
      }

      // Update change array if there are units to return
      if (numberOfUnits > 0) {
          changeArray.push([currencyUnit, returnedAmount]);
          changeDue = parseFloat((changeDue - returnedAmount).toFixed(2));
      }
  }

  // Check if change due is not fully covered by available currency units
  if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  return { status: "OPEN", change: changeArray };
}