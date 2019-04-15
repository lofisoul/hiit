import React, { Component } from 'react';
//import { Panel, Grid, Row, Col } from 'react-bootstrap';
import * as timerStates from './timerStates';

/*
  seq.routine.map((seq,index) => {
    if(index+1 === currentRound) {
      return (
        <figure key={index} className={`seq seq-${index} seq-active`}>{seq}</figure>
      )
    } else {
        return (
          <figure key={index} className={`seq seq-${index}`}>{seq}</figure>
        )
      }
  })
*/

class Sequence extends Component {

  render() {
    const {seq, currentRound, currentSet} = this.props;
    return(
      <section className="sequence">

        <div className="rounds">
          {
            Array(seq.rounds).fill().map((seq,index) => {
              if(index+1 === currentRound) {
                return (
                  <figure key={index} className={`seq round-${index+1} set-active`}>{index+1}</figure>
                )
              } else {
                  return (
                    <figure key={index} className={`seq round-${index+1}`}>{index+1}</figure>
                  )
                }
            })
          }
        </div>
        <div className="sets">
          {
            Array(seq.sets).fill().map((seq,index) => {
              if(index+1 === currentSet) {
                return (
                  <figure key={index} className={`seq set-${index+1} set-active`}>{index+1}</figure>
                )
              } else {
                  return (
                    <figure key={index} className={`seq set-${index+1}`}>{index+1}</figure>
                  )
                }
            })
          }
        </div>

      </section>
    )
  }
}

export default Sequence;
