'use strict';

let $ = document.querySelector.bind(document);

let mortgageForm = document.querySelector('form'); //$('#mortgageForm');
let mortgageAmount = $('#mortgageAmount');
let interestRate = $('#interestRate');
let amortizationPeriodYears = $('#amortizationPeriodYears');
let amortizationPeriodMonths = $('#amortizationPeriodMonths');
let paymentFrequency = $('#paymentFrequency');
let term = $('#term');

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  mortgageAmount.value = '121815.72';
  interestRate.value = '3.70';
  amortizationPeriodYears.value = 10;
  amortizationPeriodMonths.value = 1;
  paymentFrequency.value = 'Accelerated Bi-weekly';
  term.value = 5;
}

mortgageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formDataObj = {};
  
  formData.forEach((value, key) => (formDataObj[key] = value));

  console.log(formDataObj.term)
});
