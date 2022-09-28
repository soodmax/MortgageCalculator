'use strict';

let $ = document.querySelector.bind(document);

const mortgageForm = $('#mortgageForm');

mortgageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let mortgageAmount = $('#mortgageAmount');
  let interestRate = $('#interestRate');
  let amortizationPeriodYears = $('#amortizationPeriodYears');
  let amortizationPeriodMonths = $('#amortizationPeriodMonths');
  let paymentFrequency = $('#paymentFrequency');
  let term = $('#term');

  let mortgageAmountValue = (mortgageAmount.value)
  let interestRateValue = (interestRate.value)
  let amortizationPeriodYearsValue = (amortizationPeriodYears.value)
  let amortizationPeriodMonthsValue = (amortizationPeriodMonths.value)
  let paymentFrequencyValue = (paymentFrequency.options[paymentFrequency.selectedIndex].text)
  let termValue = (term.value)

  
});
