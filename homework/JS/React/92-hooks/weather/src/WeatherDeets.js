import { Component } from 'react';

export default class WeatherDeets extends Component {
    render() {
        return (
            <>
            <div className='main'>
                <h3>the weather in {this.props.city} is</h3>
                <img id="image" src={this.props.icon} alt='weather icon'></img>
                <p>{this.props.info}</p>

            </div>
            </>
        )
    }
}