/* 

How to calculate

When msrp and all the data from calculator inputs are available do the calculation using(a call of calculation function should be always wrapped in Promise!!!):

    monthly payment lease: (msrp - tradeIn - downPayment) * mileage / 10000 / term * creditScoreValue
    monthly payment loan: (msrp - tradeIn - downPayment) * / term * creditScoreValue * apr
    taxes: postCode.split(‘’).map(num => num * 11)

creditScoreValue defines by the following rules:

    If credit score >= 750, then creditScoreValue = 0.95
    If credit score >= 700 and < 750, then creditScoreValue = 1
    If credit score >= 640 and < 700, then creditScoreValue = 1.05
    If credit score < 640 , then creditScoreValue = 1.2

 */

 function leasePayment (msrp, tradeIn, downPayment, mileage, term, creditScoreValue){
    return (msrp - tradeIn - downPayment) * mileage / 10000 / term * creditScoreValue;
 }

 function loanPayment (msrp, tradeIn, downPayment, term, creditScoreValue, apr){
    return (msrp - tradeIn - downPayment)  / term * creditScoreValue * apr;
 }

 function creditScoreValue (score){
    return (score >= 750) ? 0.95: (score >= 700 && score < 750) ? 1: (score >= 640 && score < 700) ? 1.05: (score < 640) ? 1.2 : null;
 }

 function taxes (postCode){
    return postCode.split('').map(num => num * 11);
 }

 export {leasePayment, loanPayment, creditScoreValue, taxes};