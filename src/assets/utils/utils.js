function loanPayment(msrp, tradeIn, downPayment, mileage, term, creditScore) {
  return `Monthly payment = ${Math.round(
    (msrp - tradeIn - downPayment) * ((mileage / 10000 / term) * creditScore)
  )} $`;
}
function leasePayment(msrp, tradeIn, downPayment, term, creditScore, apr) {
  return `Monthly payment = ${Math.round(
    ((msrp - tradeIn - downPayment) / term) * creditScore * (1 + apr / 100)
  )} $`;
}
function creditScoreValue(score) {
  let answer;
  if (score >= 750) {
    answer = 0.95;
  } else if (score >= 700 && score < 750) {
    answer = 1;
  } else if (score >= 640 && score < 700) {
    answer = 1.05;
  } else if (score < 640) {
    answer = 1.2;
  } else {
    answer = false;
  }
  return answer;
}
function taxes(postCode) {
  return postCode
    .toString()
    .split('')
    .map(num => num * 11)
    .join(', ');
}

export { leasePayment, loanPayment, creditScoreValue, taxes };
