import React, { Component } from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import * as timerStates from './timerStates';

class Sequence extends Component {

  render() {
    const {seq, round} = this.props;
    return(
      <section className="sequence">
        {
          seq.map((seq,index) => {
            if(index+1 === round) {
              return (
                <figure key={index} className={`seq seq-${index} seq-active`}>{seq}</figure>
              )
            } else {
                return (
                  <figure key={index} className={`seq seq-${index}`}>{seq}</figure>
                )
              }
          })
        }
      </section>
    )
  }
}

export default Sequence;
