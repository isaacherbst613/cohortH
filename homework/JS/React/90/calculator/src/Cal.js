import React, { Component } from 'react';
import { Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import Button from './Button';

export default class Cal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            Operator: null,
            total: 0,
            result: 0,
        }

    }
    onOperatorInput(symbol) {
        if (this.state.Operator === 'C') {
            this.setState({
                current: 0,
                Operator: null,
                total: 0
            })
        }
        this.setState({
            Operator: symbol,
            total: this.state.current,
            current: ''
        })
    }

    onEquelInput() {
        let result = this.state.current;
        switch (this.state.Operator) {
            case '+':
                result = parseInt(this.state.total) + parseInt(this.state.current);
                break;
            case '-':
                result = parseInt(this.state.total) - parseInt(this.state.current);
                break;
            case '*':
                result = parseInt(this.state.total) * parseInt(this.state.current);
                break;
            case '/':
                result = parseInt(this.state.total) / parseInt(this.state.current);
                break;
            default:
                break;
        }

        this.setState({
            result: result,
            current: result,
            Operator: null,
            total: ''
        })
    }

    buttonClick = (e) => {
        console.log(e.target.innerText);

        let O = e.target.innerText;
        if (O === '+' || O === '-' || O === '*' || O === '/' || O === 'C') {
            this.onOperatorInput(O);
        } else if (O === '=') {
            this.onEquelInput();
        } else {
            if (this.state.current === 0) {
                this.setState({
                    current: O
                })
            } else {
                this.setState({
                    current: this.state.current + O
                });
            }
        }

        console.log('left', this.state.leftOperand, 'operand', this.state.Operator, 'right', this.state.rightOperand);
    }

    render() {
        return (
            <Container onClick={this.buttonClick}>
                <Row xs='auto' className="justify-content-center">
                    <Col className='p-0' xs={4}>
                        <InputGroup size="lg" className='mt-5' >
                            <InputGroup.Text id="basic-addon1">Total</InputGroup.Text>
                            <FormControl disabled placeholder={this.state.current} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className='p-0' xs={1}><Button symbol="7" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="8" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="9" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="+" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className='p-0' xs={1}><Button symbol="4" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="5" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="6" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="-" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className='p-0' xs={1}><Button symbol="1" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="2" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="3" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="*" /></Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className='p-0' xs={1}><Button symbol="=" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="0" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="C" /></Col>
                    <Col className='p-0' xs={1}><Button symbol="/" /></Col>
                </Row>

            </Container>
        )
    }
}
