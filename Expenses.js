const valid = require("card-validator");
const currencyCode = require('currency-codes');
const countryCode = require('iso-3166-1');
const fs = require('fs');


function getAllExpenses() {

    const expenses =  fs.readFileSync('./expenses.txt','utf-8').split('\n');

    return expenses;
}

function getDate(expense) {
    const year = parseInt(expense.substring(0, 4));
    const month = parseInt(expense.substring(4, 6));
    const day = parseInt(expense.substring(6, 8));

    const date = new Date(year, month - 1, day);

    return date;
}

function getCreditCard(expense) {
    const creditCard = expense.substring(24, 40);

    return creditCard;
}

function validateCreditCard(creditCard) {

    if (valid.number(creditCard).isValid)
        return true;

    return false;
}

function validateCreditCardBrand(creditCard) {

    return valid.number(creditCard).card.type;
}

function getCurrency(expense) {

    const currency = expense.substring(20, 23);

    return currencyCode.number(currency).code;
}

function getCountry(expense) {
    const currency = expense.substring(40, 44);


    return countryCode.whereNumeric(currency).alpha3;
}

function getStatus(expense) {
    const status = expense.substring(23, 24);

    if (status === '1') {
        return 'success';
    } else if (status === '2') {
        return 'fail';
    } else if (status === '3') {
        return 'reversal';
    }

}

function getValue(expense) {
    const value = parseInt(expense.substring(8, 20));

    return value;
}

function getExpenseData(expense) {
    
    const date = getDate(expense).toISOString().split('T')[0];

    const value = getValue(expense);
    const currency = getCurrency(expense);
    const status = getStatus(expense);
    const cardNumber = getCreditCard(expense);
    const country = getCountry(expense);

    const ExpenseData = {
        date,
        value,
        currency,
        status,
        cardNumber,
        country
    }

    return ExpenseData;
}


module.exports = {
    getAllExpenses,
    getDate,
    getCreditCard,
    validateCreditCard,
    validateCreditCardBrand,
    getCurrency,
    getCountry,
    getStatus,
    getValue,
    getExpenseData
}

