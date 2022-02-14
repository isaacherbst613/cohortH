import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export default class ButtonC extends Component {
    render() {
        return (
            <Button className='w-100 m-0' variant='outline-dark'>{this.props.symbol}</Button>
        )
    }
}
