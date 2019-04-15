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
      baseTime: moment.duration(10, 'seconds'), //time that it always sets to
      workTime:moment.duration(5,'seconds'),
      restTime:moment.duration(5,'seconds'),
      timerState:timerStates.NOT_SET,
      timer: null,
      sequence: {
          rounds: 4,
          sets: 6,
          routine: ['a','b','c','d','e','f']
      },
      currentRound:1,
      currentSet: 1,
      sfx: sfx,
      startSound: sfx[0],
      endSound: sfx[1],
      endSetSound: sfx[3],
      completeSound: sfx[2]
    }

    this.setBaseTime = this.setBaseTime.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
    this.completeTimer = this.completeTimer.bind(this);
    this.completeRound = this.completeRound.bind(this);
    this.completeSet = this.completeSet.bind(this);
    this.changeSfx = this.changeSfx.bind(this);
    this.playSound = this.playSound.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
  }

  //Timer

  setBaseTime(newBaseTime) {
    this.setState({
      baseTime:newBaseTime,
      currentTime:newBaseTime,
      workTime: newBaseTime
    })
  }

  handleChange(e) {
    let newBaseTime = this.state.baseTime;
    //console.log(e.target);

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
    //complete a round
    if(this.state.currentRound < this.state.sequence.rounds &&
        this.state.currentTime.asMilliseconds() === 0) {
          this.completeRound();
          this.playSound(this.state.endSound);
          this.startOverTimer();
          return
    }
    //complete a set
    if(this.state.currentRound === this.state.sequence.rounds &&
        this.state.currentSet < this.state.sequence.sets
        && this.state.currentTime.asMilliseconds() === 0) {
          this.completeSet();
          this.playSound(this.state.endSetSound);
          this.startOverTimer();
          return
    }
    //complete session
    if(this.state.currentRound === this.state.sequence.rounds && 
      this.state.currentSet === this.state.sequence.sets 
      && this.state.currentTime.asMilliseconds() === 0) {
        this.playSound(this.state.completeSound);
        this.completeTimer();
        return
    }

    const newTime = moment.duration(this.state.currentTime);
    newTime.subtract(1,'second');
    console.log(this.state.currentTime.asMilliseconds());
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

  resetTimer() {
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

  startOverTimer() {
    this.setState({
      currentTime: this.state.workTime
    })
  }

  completeRound() {
    if(this.state.timer) {
      clearInterval(this.state.timer)
    }

    //console.log(this.state.currentRound)
    //console.log(this.state.sequence.rounds)    
    
    
    this.setState({
      currentRound: this.state.currentRound < this.state.sequence.rounds ? this.state.currentRound+1 : 1,
      currentTime: this.state.workTime,
      timer:setInterval(this.reduceTimer,1000)
    })
  }

  completeSet() {
    if(this.state.timer) {
      clearInterval(this.state.timer)
    }

    this.setState({
      currentSet: this.state.currentSet+1,
      currentRound: 1,
      currentTime: this.state.workTime,
      timer: setInterval(this.reduceTimer, 1000)
    })
  }

  completeTimer() {
    console.log('yo!');
    if(this.state.timer) {
      clearInterval(this.state.timer)
    }

    this.setState({
      timerState: timerStates.COMPLETE,
      timer:null,
      currentRound:1,
      currentSet:1,
    })
  }

  resetTimer() {
    if(this.state.timer) {
      clearInterval(this.state.timer);
    }

    this.setState({
      timerState: timerStates.NOT_SET,
      timer:null,
      currentTime: moment.duration(this.state.baseTime),
      currentRound:1,
      currentSet: 1
    })
  }

  //sequencer

  changeInterval(e) {
    let seq = {...this.state.sequence};
    console.log(seq);
    const val = parseInt(e.target.value) || 0;
    console.log(val);
    if(e.target.id === 'sets') {
      seq.sets = val;
      console.log(typeof val);
      console.log(seq);
      this.setState({sequence:seq});
    }
    if(e.target.id === 'rounds') {
      seq.rounds = val;
      this.setState({sequence:seq});
    }
  }


  //audio

  changeSfx(e) {
    const val = e.target.value;

    if(e.target.id === 'startSound') {
      this.playSound(sfx[val]);
      this.setState({startSound: sfx[val]});
    }

    if(e.target.id === 'endSound') {
      this.playSound(sfx[val]);
      this.setState({endSound: sfx[val]});
    }

    if(e.target.id === 'endSetSound') {
      this.playSound(sfx[val]);
      this.setState({endSound: sfx[val]});
    }

    if(e.target.id === 'completeSound') {
      this.playSound(sfx[val]);
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
          currentSet={this.state.currentSet}
          />
        <Timer
          currentTime={this.state.currentTime}
          baseTime={this.state.baseTime}
          setBaseTime={this.setBaseTime}
          handleChange={this.handleChange}
          timerState={this.state.timerState}
          startTimer={this.startTimer}
          resetTimer={this.resetTimer}
          pauseTimer={this.pauseTimer}
          resumeTimer={this.resumeTimer}
          completeTimer={this.completeTimer}
          currentRound={this.state.currentRound}
          currentSet={this.state.currentSet}
          changeInterval={this.changeInterval}
          sfx={this.state.sfx}
          startSound={this.state.startSound}
          endSound={this.state.endSound}
          endSetSound={this.state.endSetSound}
          completeSound={this.state.completeSound}
          changeSfx={this.changeSfx}
          seq={this.state.sequence}
          />

      </div>
    );
  }
}

export default App;
