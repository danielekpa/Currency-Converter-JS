//this is to get the rates from the api
/* fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    currencyDataUsd = data.rates;
    console.log(`rates updated at ${new Date()}`);
  }); */

const table = document.querySelector('.table');
const url = `https://api.exchangerate-api.com/v4/latest/USD`;

const convertBtn = document.querySelector('.submitBtn');
const sendAmount = document.querySelector('.sendingAmount');
const receiveAmount = document.querySelector('.receivingAmount');

// this is to get the rates from the api
async function getCurrencyData(url, table) {
  const tableHead = table.querySelector('thead');
  const tableBody = table.querySelector('tbody');
  const curDropDown = document.querySelector('select');
  const response = await fetch(url).then(res => res.json()).then(data => {
    console.log(data);
    const currencyData = data.rates;
    console.log(currencyData);

    //Clear the table 
    tableBody.innerHTML = '';
    for (const cur of Object.entries(currencyData)) {
      const rowElement = document.createElement('tr');
      for (const cellText of cur) {
        const cellElement = document.createElement('td');
        cellElement.textContent = cellText;

        rowElement.appendChild(cellElement);
      }
      tableBody.appendChild(rowElement);

      // Populate the dropdown with the currency data
      const option = cur[0];
      const dropdownEl = document.createElement("option");
      dropdownEl.textContent = option;
      dropdownEl.value = option;
      curDropDown.appendChild(dropdownEl);
    }

    convertBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const amount = Number(sendAmount.value);
      // const beneficiaryAcc = currencyData.userName === inputTransferTo.value);

      if (amount !== null && amount > 0) {
        // new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
        const value = amount * currencyData[curDropDown.value];
        receiveAmount.textContent = `${new Intl.NumberFormat(navigator.language, { style: 'currency', currency: `${curDropDown.value}` }).format(value)}`;

      }
    });
  })
}
getCurrencyData(url, table);

