import React, { Component } from 'react';
import './main.scss';
import Tabs from '../tabs/tabs';
import Inputs from '../inputs/inputs';

/* export default () => (
  <>
    <div className="red-text">Hello Ann</div>
    <img src={img} alt="img" />
  </>
);
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: ['Lease', 'Loan'],
      inputs: ['Down Payment', 'Trade-In', 'APR', 'Post Code'],
    };
  }

  changeTabs = e => {
    console.log(e);
    console.log('hello-world');
  };

  render() {
    console.log('qwer');
    const { tabs } = this.state;
    const { inputs } = this.state;
    return (
      <>
        <div className="main-wrapper">
          <div className="tabs-wrapper">
            <Tabs name={tabs[0]} onClick={() => this.changeTabs(tabs[0])} />
            <Tabs name={tabs[1]} onClick={() => this.changeTabs(tabs[1])} />
          </div>
          <div className="inputs-wrapper">
            <Inputs name={inputs[0]} />
            <Inputs name={inputs[1]} />
            <Inputs name={inputs[2]} />
            <Inputs name={inputs[3]} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
