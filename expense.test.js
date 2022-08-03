const { expect, assert } = require("chai");
const fs = require('fs');
const Expenses = require('./Expenses');


describe('Arquivo com despesas', () => {
    //Triple A - Arrange, Act, Assert 

    it('existe', () => {
        const path = './expenses.txt';

        const file = fs.readFileSync(path);

        expect(file).to.exist;
    });

    it('possui dados', () => {
        const path = './expenses.txt';

        const file = fs.readFileSync(path, 'utf-8');

        expect(file).is.not.empty;
    })
});

describe('Durante o parse', () => {

    describe('todas as despesas', () => {
        it('foram carregadas', () => {
            const path = './expenses.txt';
            const file = fs.readFileSync(path, 'utf-8');

            const expenses = Expenses.getAllExpenses(file);

            expect(expenses).to.have.lengthOf(6);
        });

        it('possuem 43 dígitos', () => {
            const path = './expenses.txt';
            const file = fs.readFileSync(path, 'utf-8');

            const expenses = Expenses.getAllExpenses(file);

            expenses.filter((expense) => {
                expect(expense).to.have.lengthOf(43);
            })

        });
    });

    describe('a despesa', () => {
        describe('possui a data', () => {
            it('do tipo Date', () => {
                const expenses = Expenses.getAllExpenses();

                const date = Expenses.getDate(expenses[0]);

                expect(date).to.be.instanceOf(Date);
            });

            it('anterior a data atual', () => {
                const expenses = Expenses.getAllExpenses();
                const currentDate = new Date();

                const date = Expenses.getDate(expenses[0]);
                expect(date).to.be.lessThan(currentDate);
            });

        });

        describe('possui o cartão', () => {
            it('valido', () => {
                const expenses = Expenses.getAllExpenses();

                const number = Expenses.getCreditCard(expenses[0]);

                expect(Expenses.validateCreditCard(number)).to.be.true;
            });

            it('com a bandeira MasterCard', () => {
                const expenses = Expenses.getAllExpenses();

                const number = Expenses.getCreditCard(expenses[0]);

                expect(Expenses.validateCreditCardBrand(number)).to.be.equal('mastercard');
            });
        });

        describe('possui a moeda', () => {
            it('valida', () => {
                const expenses = Expenses.getAllExpenses();

                const currency = Expenses.getCurrency(expenses[0]);

                expect(currency).to.be.equal('BRL');
            });
        });

        describe('possui o país', () => {
            it('valido', () => {
                const expenses = Expenses.getAllExpenses();

                const country = Expenses.getCountry(expenses[0]);

                expect(country).to.be.equal('BRA');
            });
        });

        describe('possui o status de compra', () => {
            it('valido', () => {
                const expenses = Expenses.getAllExpenses();

                const status = Expenses.getStatus(expenses[0]);

                expect(status).to.be.equal('success');
            });
            it('invalido', () => {
                const expenses = Expenses.getAllExpenses();

                const status = Expenses.getStatus(expenses[1]);

                expect(status).to.be.equal('fail');
            });
            it('estorno', () => {
                const expenses = Expenses.getAllExpenses();

                const status = Expenses.getStatus(expenses[2]);

                expect(status).to.be.equal('reversal');
            });
        });

        describe('possui valor', () => {
            it('valido',()=>{
                const expenses = Expenses.getAllExpenses();

                const value = Expenses.getValue(expenses[0]);

                expect(value).to.be.equal(300);
            });
        });
    });

    describe('o objeto da expense',()=>{
        it('é valido',()=>{
            const expenses = Expenses.getAllExpenses();
            const expectedExpense = {
                date : "2022-07-12",
                value : 300,
                currency : "BRL",
                status : "success",
                cardNumber : "5103817582792208",
                country : "BRA"
            };

            const expense = Expenses.getExpenseData(expenses[0]);

            expect(expense).to.deep.equal(expectedExpense);
        })

    })
});
