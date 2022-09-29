'use strict';

let $ = document.querySelector.bind(document);

let mortgageForm = $('#mortgageForm');
let mortgageAmount = $('#mortgageAmount');
let interestRate = $('#interestRate');
let amortizationPeriodYears = $('#amortizationPeriodYears');
let amortizationPeriodMonths = $('#amortizationPeriodMonths');
let paymentFrequency = $('#paymentFrequency');
let calculationList = $('#calculationList');
let term = $('#term');

var formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
  const amortization = {};

  formData.forEach((value, key) => (amortization[key] = value));

  let precision = 12;
  let pv = 0;
  let apr = 0;
  let ir = 0;
  let np = 0;

  pv = parseFloat(+amortization.mortgageAmount).toFixed(precision);
  apr = parseFloat(+(amortization.interestRate / 100)).toFixed(precision);
  ir = parseFloat(apr / 12).toFixed(precision);
  np = parseFloat(
    +amortization.amortizationPeriodYears * 12 +
      +amortization.amortizationPeriodMonths
  ).toFixed(precision);


  ClearList();

  let pmt = Math.abs(PMT(+ir, +np, +pv).toFixed(precision));
  AddToList('Monthly Payment: ' + formatter.format(pmt.toFixed(precision)));

  let smpmt = (pmt * 12) / 24;
  AddToList('Semi Monthly Payment: ' + formatter.format(smpmt.toFixed(precision)));

  let bwkly = (pmt * 12) / 26;
  AddToList('Bi-Weekly Payment: ' + formatter.format(bwkly.toFixed(precision)));

  let bwklya = pmt / 2;
  AddToList('Bi-Weekly Accelerated Payment: ' + formatter.format(bwklya.toFixed(precision)));

  let wkly = (pmt * 12) / 52;
  AddToList('Weekly Payment: ' + formatter.format(wkly.toFixed(precision)));

  let wklya = pmt / 4;
  AddToList('Weekly Accelerated Payment: ' + formatter.format(wklya.toFixed(precision)));
});

function ClearList() {
  while (calculationList.firstChild) {
    calculationList.removeChild(calculationList.firstChild);
  }
}

function AddToList(text) {
  var li = document.createElement('li');
  li.classList.add('list-group-item');
  li.appendChild(document.createTextNode(text));
  li.setAttribute('id', 'element4'); // added line
  calculationList.appendChild(li);
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
