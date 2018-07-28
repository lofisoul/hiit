import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Clearfix } from 'react-bootstrap';

class SeqConfig extends Component {

  render() {
    const {changeInterval,seq} = this.props;
    return(
      <section className="seq-config">
      <Row>
        <Col xs={12}>
          <FormGroup controlId="rounds">
            <Clearfix>
              <Col sm={3}>
                <ControlLabel>Rounds</ControlLabel>
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="number"
                      defaultValue={seq.rounds}
                      onChange={changeInterval}
                    />
                  </Col>
                </Clearfix>
              </FormGroup>
              <FormGroup controlId="sets">
                <Clearfix>
                  <Col sm={3}>
                    <ControlLabel>Sets</ControlLabel>
                  </Col>
                  <Col sm={9}>
                    <FormControl
                      type="number"
                      defaultValue={seq.sets}
                      onChange={changeInterval}
                    />
                  </Col>
                </Clearfix>
              </FormGroup>
            </Col>
          </Row>
      </section>
    )
  }
}

export default SeqConfig;
