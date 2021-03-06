import React, { Component } from 'react';
import { Panel, Grid, Row, Col, FormGroup, ControlLabel, FormControl, Clearfix, Button } from 'react-bootstrap';
import * as timerStates from './timerStates';
import SoundConfig from './SoundConfig';
import SeqConfig from './SeqConfig';

class Timer extends Component {

  constructor() {
    super();

    this.leftPad = this.leftPad.bind(this);
    this.getButton = this.getButton.bind(this);
  }

  leftPad(val) {
    if(val<10) {
      return `0${val}`;
    } else {
      return `${val}`;
    }
  }

  getButton() {
    if (this.props.timerState === timerStates.NOT_SET) {
      return(
        <div className="btn-wrap">
          <Button bsStyle="success" onClick={this.props.startTimer}>Start</Button>
          <Button bsStyle="danger" disabled>Stop</Button>
        </div>
      )
    }

    if (this.props.timerState === timerStates.RUNNING) {
      return(
        <div className="btn-wrap">
          <Button bsStyle="warning" onClick={this.props.pauseTimer}>Pause</Button>
          <Button bsStyle="danger" onClick={this.props.resetTimer}>Stop/Reset</Button>
        </div>
      )
    }

    if (this.props.timerState === timerStates.PAUSED) {
      return(
        <div className="btn-wrap">
          <Button bsStyle="success" onClick={this.props.resumeTimer}>Resume</Button>
          <Button bsStyle="danger" onClick={this.props.resetTimer}>Stop/Reset</Button>
        </div>
      )
    }

    if (this.props.timerState === timerStates.COMPLETE) {
      return(
        <Button bsStyle="primary" onClick={this.props.resetTimer}>End</Button>
      )
    }
  }

  render() {
    const {currentTime, baseTime, setBaseTime, handleChange, timerState, startTimer, pauseTimer, resetTimer, currentRound, changeInterval, sfx, changeSfx, startSound, endSound, endSetSound, completeSound, seq, currentSet} = this.props;
    return(
    <section className="timer">
      <Panel className={`app-content appstate-${this.props.timerState}`}>
        <Panel.Body>
          <Grid fluid={true}>
            <Row>
              <Col sm={8}>
                <Row>
                  <Col xs={12}>
                    <h2 className="text-center">HIIT Timer</h2>
                  </Col>
                </Row>
                <Row>
                <Col xs={12}>
                  <h2 className="text-center">{`${this.leftPad(currentTime.get('minutes'))}:${this.leftPad(currentTime.get('seconds'))}`}</h2>
                  <h4 className="text-center">{`Round: ${currentRound}`}</h4>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="text-center">
                  {this.getButton()}
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              <Row>
                <Col xs={12}>
                  <h2 className="text-center text-primary">Set Timer</h2>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <FormGroup controlId="minutes">
                    <Clearfix>
                      <Col sm={3}>
                        <ControlLabel>Minutes</ControlLabel>
                          </Col>
                          <Col sm={9}>
                            <FormControl
                              type="number"
                              defaultValue={baseTime.get('minutes')}
                              onChange={handleChange}
                            />
                          </Col>
                        </Clearfix>
                      </FormGroup>
                      <FormGroup controlId="seconds">
                        <Clearfix>
                          <Col sm={3}>
                            <ControlLabel>Seconds</ControlLabel>
                          </Col>
                          <Col sm={9}>
                            <FormControl
                              type="number"
                              defaultValue={baseTime.get('seconds')}
                              onChange={handleChange}
                            />
                          </Col>
                        </Clearfix>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <SoundConfig sfx={sfx} changeSfx={changeSfx} startSound={startSound} endSound={endSound} endSetSound={endSetSound} completeSound={completeSound} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <SeqConfig changeInterval={changeInterval} seq={seq} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Grid>
          </Panel.Body>
        </Panel>
      </section>
    )
  }
}

export default Timer;
