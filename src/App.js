import React, { Component } from 'react';
import './styles/scss/App.scss';
import Timer from './Timer';
import Sequence from './Sequence';
import moment from 'moment';
import sfx from './audio';
import * as timerStates from './timerStates';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentTime: moment.duration(5, 'seconds'),
      baseTime: moment.duration(5, 'seconds'), //time that it always sets to
      timerState:timerStates.NOT_SET,
      timer: null,
      sequence: {
          rounds: 6,
          sets: 6,
          routine: ['a','b','c','d','e','f']
      },
      currentRound:1,
      sfx: sfx,
      startSound: sfx[0],
      endSound: sfx[0]
    }

    this.setBaseTime = this.setBaseTime.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.completeRound = this.completeRound.bind(this);
    this.changeSfx = this.changeSfx.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  //Timer

  setBaseTime(newBaseTime) {
    this.setState({
      baseTime:newBaseTime,
      currentTime:newBaseTime
    })
  }

  handleChange(e) {
    const newBaseTime = moment.duration(0);

    if(e.target.id === 'hours') {
      newBaseTime.subtract(newBaseTime.get('hour'), 'hours').add(parseInt(e.target.value,10), 'hours');
    }
    if(e.target.id === 'minutes') {
      newBaseTime.subtract(newBaseTime.get('minutes'), 'minutes').add(parseInt(e.target.value,10), 'minutes');
    }
    if(e.target.id === 'seconds') {
      newBaseTime.subtract(newBaseTime.get('seconds'), 'seconds').add(parseInt(e.target.value,10), 'seconds');
    }

    this.setBaseTime(newBaseTime);
  }

  startTimer() {
    this.setState({
      timerState: timerStates.RUNNING,
      timer: setInterval(this.reduceTimer, 1000)
    });
    this.playSound(this.state.startSound);
  }

  reduceTimer() {

    if(this.state.currentRound === this.state.sequence.rounds
      && this.state.currentTime.get('hours') === 0
      && this.state.currentTime.get('minutes') === 0
      && this.state.currentTime.get('seconds') === 0) {
        this.completeTimer();
        return
      }
      if(this.state.currentRound < this.state.sequence.rounds
        && this.state.currentTime.get('hours') === 0
        && this.state.currentTime.get('minutes') === 0
        && this.state.currentTime.get('seconds') === 0) {
          this.completeRound();
          this.playSound(this.state.endSound);
          return
        }
    const newTime = moment.duration(this.state.currentTime);
    newTime.subtract(1,'second');

    this.setState({
      currentTime:newTime
    })
  }

  pauseTimer() {
    if(this.state.timer) {
      clearInterval(this.state.timer)
      this.setState({timerState:timerStates.PAUSED})
    }
  }

  resumeTimer() {
    if(this.state.timer) {
      this.setState({
        timerState:timerStates.RUNNING,
      timer: setInterval(this.reduceTimer, 1000)
      })
    }
  }

  stopTimer() {
      if(this.state.timer) {
        clearInterval(this.state.timer)
      }

      this.setState({
        timerState: timerStates.NOT_SET,
        timer:null,
        currentTime: moment.duration(this.state.baseTime),
        round:1
      })
  }

  completeRound() {
    if(this.state.timer) {
      clearInterval(this.state.timer)
    }

    this.setState({
      currentRound: this.state.currentRound+1,
      currentTime: moment.duration(this.state.baseTime),
      timer: setInterval(this.reduceTimer, 1000)
    })
  }

  completeTimer() {
    if(this.state.timer) {
      clearInterval(this.state.timer)
    }

    this.setState({
      timerState: timerStates.COMPLETE,
      timer:null,
      currentTime: moment.duration(this.state.baseTime),
      currentRound:1
    })
  }

  //sequencer


  //audio

  changeSfx(e) {
    const val = e.target.value;

    if(e.target.id === 'startSound') {
      this.setState({startSound: sfx[val]});
    }

    if(e.target.id === 'endSound') {
      this.setState({endSound: sfx[val]});
    }

  }

  playSound(sfx) {
    const audio = new Audio(sfx.src);
    audio.play();
  }

  render() {
    return (
      <div className="App">
        <Sequence
          seq={this.state.sequence}
          currentRound={this.state.currentRound}
          />
        <Timer
          currentTime={this.state.currentTime}
          baseTime={this.state.baseTime}
          setBaseTime={this.setBaseTime}
          handleChange={this.handleChange}
          timerState={this.state.timerState}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          pauseTimer={this.pauseTimer}
          resumeTimer={this.resumeTimer}
          currentRound={this.state.currentRound}
          sfx={this.state.sfx}
          startSound={this.state.startSound}
          endSound={this.state.endSound}
          changeSfx={this.changeSfx}
          />

      </div>
    );
  }
}

export default App;
