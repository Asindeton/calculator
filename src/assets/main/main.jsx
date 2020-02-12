import React, { Component } from 'react';
import './main.scss';
import Tabs from '../tabs/tabs';
import Inputs from '../inputs/inputs';
import Buttons from '../buttons/buttons';
import Select from '../select/select';
import infoCard from '../fakeInfoCard/infoCard';
import { creditScoreValue, taxes, loanPayment, leasePayment } from '../utils/utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ['Lease', 'Loan'],
      inputs: ['Down Payment $', 'Trade-In $', 'APR %', 'Post Code'],
      buttonsLabel: ['Terms', 'Credit Score'],
      buttonsRowTerms: [12, 24, 36, 48, 72, 84],
      buttonsRowCreditScore: [600, 650, 700, 750, 800, 850, 900],
      mileages: [10000, 12000, 15000],
      terms: 24,
      creditScore: 750,
      isLease: true,
      fakeInfo: {},
      data: {},
      inputValueArray: [],
      postal: 0,
      mileage: 12000,
    };
  }

  componentDidMount() {
    Promise.resolve(infoCard).then(value => {
      this.setState({
        fakeInfo: value.data,
      });
    });
    fetch(`https://ipinfo.io/json?token=5870e5ee627dc2`)
      .then(val => val.json())
      .then(json =>
        this.setState({
          data: json,
          inputValueArray: [0, 0, 0, Number(json.postal)],
          postal: json.postal,
        })
      );
  }

  onChangeValue = (e, index) => {
    const { inputValueArray, fakeInfo } = this.state;
    const validValue = Number(fakeInfo.msrp * 0.25);
    inputValueArray[index] = Number(e);
    if (inputValueArray[index]) {
      if (inputValueArray[index] > validValue) {
        inputValueArray[index] = validValue;
      }
      this.setState({
        inputValueArray,
      });
    }
  };

  changeTabs = e => {
    let inputArray;
    let buttonsLabel;
    let buttonsRowTerms;
    let inputValueArray;
    const { isLease, data } = this.state;
    if (e === 'Lease' && isLease === false) {
      inputArray = ['Down Payment $', 'Trade-In $', 'APR %', 'Post Code'];
      buttonsLabel = ['Terms', 'Credit Score'];
      buttonsRowTerms = [12, 24, 36, 48, 72, 84];
      inputValueArray = [0, 0, 0, Number(data.postal)];
    } else if (e === 'Loan' && isLease === true) {
      inputArray = ['Down Payment $', 'Trade-In $', 'Post Code'];
      buttonsLabel = [' ', ' '];
      buttonsRowTerms = [24, 36, 48];
      inputValueArray = [0, 0, Number(data.postal), 0];
    } else {
      return;
    }
    if (inputArray) {
      this.setState({
        inputs: inputArray,
        buttonsLabel,
        buttonsRowTerms,
        isLease: !isLease,
        inputValueArray,
      });
    }
  };

  getButtonNumb = e => {
    if (e >= 500) {
      this.setState({
        creditScore: e,
      });
    } else {
      this.setState({
        terms: e,
      });
    }
  };

  render() {
    const {
      tabs,
      inputs,
      isLease,
      buttonsRowTerms,
      buttonsRowCreditScore,
      buttonsLabel,
      mileages,
      fakeInfo,
      inputValueArray,
      terms,
      creditScore,
      postal,
      mileage,
    } = this.state;
    return (
      <>
        <div className="main-wrapper">
          <div className="tabs-wrapper">
            {tabs.map(e => {
              return <Tabs name={e} onClick={() => this.changeTabs(e)} key={e.id} />;
            })}
          </div>
          <div className="inputs-wrapper">
            {inputs.map((e, index) => {
              return (
                <Inputs
                  name={e}
                  key={e.id}
                  inputValueArray={inputValueArray[index]}
                  onChangeValue={event => this.onChangeValue(event.target.value, index)}
                />
              );
            })}
          </div>
          <div className="buttons row__terms">
            {isLease ? <p className="buttons-title">{`${buttonsLabel[0]} = ${terms}`}</p> : false}
            {isLease
              ? buttonsRowTerms.map(e => {
                  return <Buttons name={e} key={e.id} onClick={() => this.getButtonNumb(e)} />;
                })
              : false}
          </div>
          <div className="buttons row__credit-score">
            {isLease ? (
              <p className="buttons-title">{`${buttonsLabel[1]} = ${creditScore}`}</p>
            ) : (
              false
            )}
            {isLease
              ? buttonsRowCreditScore.map(e => {
                  return <Buttons name={e} key={e.id} onClick={() => this.getButtonNumb(e)} />;
                })
              : false}
          </div>
          <div className="select-term-wrapper">
            {isLease === false ? <Select paramArray={buttonsRowTerms} name="term" /> : false}
          </div>
          <div className="select-mileages ">
            {isLease === false ? <Select paramArray={mileages} name="mileages" /> : false}
          </div>
          <div className="select-credit-score ">
            {isLease === false ? (
              <Select paramArray={buttonsRowCreditScore} name="credit" />
            ) : (
              false
            )}
          </div>
          <div className="info-card-wrapper">
            {isLease ? (
              <p className="info-card many">
                {leasePayment(
                  fakeInfo.msrp,
                  inputValueArray[1],
                  inputValueArray[0],
                  terms,
                  creditScoreValue(creditScore),
                  inputValueArray[2]
                )}
              </p>
            ) : (
              <p className="info-card many">
                {loanPayment(
                  fakeInfo.msrp,
                  inputValueArray[1],
                  inputValueArray[0],
                  mileage,
                  terms,
                  creditScoreValue(creditScore)
                )}
              </p>
            )}
            <p className="info-card">{`Taxes  ${taxes(postal)}`}</p>
            <p className="info-card">{`MSRP ${fakeInfo.msrp}`}</p>
            <p className="info-card">{`Vehicle Name ${fakeInfo.vehicleName}`}</p>
            <p className="info-card">{`Dealer Name ${fakeInfo.dealerName}`}</p>
            <p className="info-card">{`Phone ${fakeInfo.dealerPhone}`}</p>
            <p className="info-card">{`Rating ${fakeInfo.dealerRating}`}</p>
          </div>
        </div>
      </>
    );
  }
}

export default App;
