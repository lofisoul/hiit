import React, { Component } from 'react';
import { Col, FormGroup, ControlLabel, FormControl, Clearfix} from 'react-bootstrap';

class SoundConfig extends Component {
  render() {
    const {sfx, changeSfx, startSound, endSound} = this.props;

    return (
      <section className="sound-config">
        <FormGroup controlId="startSound">
          <Clearfix>
            <Col sm={3}>
              <ControlLabel>Start Sound</ControlLabel>
            </Col>
            <Col sm={9}>
            <FormControl
              componentClass="select"
              placeholder={`${startSound.sound}`}
              onChange={changeSfx}
              >
                {
                  sfx.map((sfx,index) => {
                    return(
                      <option value={index} key={index}>{sfx.sound}</option>
                    )
                  })
                }
            </FormControl>
            </Col>
          </Clearfix>
        </FormGroup>
        <FormGroup controlId="endSound">
          <Clearfix>
            <Col sm={3}>
              <ControlLabel>End Sound</ControlLabel>
            </Col>
            <Col sm={9}>
              <FormControl
                componentClass="select"
                placeholder={`${endSound.sound}`}
                onChange={changeSfx}
                >
                  {
                    sfx.map((sfx,index) => {
                      return(
                        <option value={index} key={index}>{sfx.sound}</option>
                      )
                    })
                  }
              </FormControl>
            </Col>
          </Clearfix>
        </FormGroup>
      </section>
    );
  }
}

export default SoundConfig;
