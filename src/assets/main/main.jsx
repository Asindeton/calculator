import React, { Component } from 'react';
import './main.scss';
import Tabs from '../tabs/tabs';
import Inputs from '../inputs/inputs';
import Buttons from '../buttons/buttons';
import Select from '../select/select';
import infoCard from '../fakeInfoCard/infoCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ['Lease', 'Loan'],
      inputs: ['Down Payment', 'Trade-In', 'APR', 'Post Code'],
      buttonsLabel: ['Terms', 'Credit Score'],
      buttonsRowTerms: [12, 24, 36, 48, 72, 84],
      buttonsRowCreditScore: [600, 650, 700, 750, 800, 850, 900],
      mileages: [10000, 12000, 15000],
      isLease: true,
      fakeInfo: {},
    };
  }

  componentDidMount() {
    Promise.resolve(infoCard).then(value => {
      this.setState({
        fakeInfo: value.data,
      });
    });
  }

  changeTabs = e => {
    let inputArray;
    let buttonsLabel;
    let buttonsRowTerms;
    const { isLease } = this.state;
    if (e === 'Lease' && isLease === false) {
      inputArray = ['Down Payment', 'Trade-In', 'APR', 'Post Code'];
      buttonsLabel = ['Terms', 'Credit Score'];
      buttonsRowTerms = [12, 24, 36, 48, 72, 84];
    } else if (e === 'Loan' && isLease === true) {
      inputArray = ['Down Payment', 'Trade-In', 'Post Code'];
      buttonsLabel = [' ', ' '];
      buttonsRowTerms = [24, 36, 48];
    } else {
      return;
    }
    if (inputArray) {
      this.setState({
        inputs: inputArray,
        buttonsLabel,
        buttonsRowTerms,
        isLease: !isLease,
      });
    }
  };

  getButtonNumb = e => {
    console.log(e);
  };

  render() {
    const { tabs } = this.state;
    const { inputs } = this.state;
    const { isLease } = this.state;
    const { buttonsRowTerms } = this.state;
    const { buttonsRowCreditScore } = this.state;
    const { buttonsLabel } = this.state;
    const { mileages } = this.state;
    const { fakeInfo } = this.state;
    return (
      <>
        <div className="main-wrapper">
          <div className="tabs-wrapper">
            {tabs.map(e => {
              return <Tabs name={e} onClick={() => this.changeTabs(e)} key={e.id} />;
            })}
          </div>
          <div className="inputs-wrapper">
            {inputs.map(e => {
              return <Inputs name={e} key={e.id} />;
            })}
          </div>
          <div className="buttons row__terms">
            <p className="buttons-title">{buttonsLabel[0]}</p>
            {isLease
              ? buttonsRowTerms.map(e => {
                  return <Buttons name={e} key={e.id} onClick={() => this.getButtonNumb(e)} />;
                })
              : false}
          </div>
          <div className="buttons row__credit-score">
            <p className="buttons-title">{buttonsLabel[1]}</p>
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
