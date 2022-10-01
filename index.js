'use strict';

let $ = document.querySelector.bind(document);

let mortgageFormControl = $('#mortgageForm');
let mortgageAmountControl = $('#mortgageAmount');
let interestRateControl = $('#interestRate');
let amortizationPeriodYearsControl = $('#amortizationPeriodYears');
let amortizationPeriodMonthsControl = $('#amortizationPeriodMonths');
let paymentFrequencyControl = $('#paymentFrequency');
let termControl = $('#term');
let calculationListControl = $('#calculationList');

var formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  mortgageAmountControl.value = '121815.72';
  interestRateControl.value = '3.70';
  amortizationPeriodYearsControl.value = 10;
  amortizationPeriodMonthsControl.value = 1;
  paymentFrequencyControl.value = 'Accelerated Bi-weekly';
  termControl.value = 5;
}

mortgageFormControl.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const amortization = {};

  formData.forEach((value, key) => (amortization[key] = value));

  let precision = 12;
  let pv = 0;
  let apr = 0;
  let ir = 0;
  let np = 0;

  let mortgageAmount = parseFloat(amortization.mortgageAmount);
  let interestRate = parseFloat(amortization.interestRate);
  let amortizationPeriodYears = parseInt(amortization.amortizationPeriodYears);
  let amortizationPeriodMonths = parseInt(
    amortization.amortizationPeriodMonths
  );

  pv = parseFloat(mortgageAmount).toFixed(precision);
  apr = parseFloat(interestRate / 100).toFixed(precision);
  ir = parseFloat(apr / 12).toFixed(precision);
  np = parseFloat(
    amortizationPeriodYears * 12 + amortizationPeriodMonths
  ).toFixed(precision);

  ClearList(calculationListControl);

  let pmt = Math.abs(PMT(+ir, +np, +pv).toFixed(precision));
  AddToList(
    'Monthly Payment: ' + formatter.format(pmt.toFixed(precision)),
    calculationListControl
  );

  let smpmt = parseFloat((pmt * 12) / 24);
  AddToList(
    'Semi Monthly Payment: ' + formatter.format(smpmt.toFixed(precision)),
    calculationListControl
  );

  let bwkly = parseFloat((pmt * 12) / 26);
  AddToList(
    'Bi-Weekly Payment: ' + formatter.format(bwkly.toFixed(precision)),
    calculationListControl
  );

  let bwklya = parseFloat(pmt / 2);
  AddToList(
    'Bi-Weekly Accelerated Payment: ' +
      formatter.format(bwklya.toFixed(precision)),
    calculationListControl
  );

  let wkly = parseFloat((pmt * 12) / 52);
  AddToList(
    'Weekly Payment: ' + formatter.format(wkly.toFixed(precision)),
    calculationListControl
  );

  let wklya = parseFloat(pmt / 4);
  AddToList(
    'Weekly Accelerated Payment: ' + formatter.format(wklya.toFixed(precision)),
    calculationListControl
  );
});

function ClearList(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function AddToList(textToAdd, list) {
  var li = document.createElement('li');
  li.classList.add('list-group-item');
  li.appendChild(document.createTextNode(textToAdd));
  li.setAttribute('id', 'element4'); // added line
  list.appendChild(li);
}

function PMT(ir, np, pv, fv, type) {
  /*
   * ir   - interest rate per month
   * np   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  var pmt, pvif;

  fv || (fv = 0);
  type || (type = 0);

  if (ir === 0) return -(pv + fv) / np;

  pvif = Math.pow(1 + ir, np);
  pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + ir;

  return pmt;
}
