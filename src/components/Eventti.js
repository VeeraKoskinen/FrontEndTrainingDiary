import React from 'react';

import eventtiService from '../services/events'
import '../index.css'

class Eventti extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            long: props.value
        }
    }


    longInformation = () => {
        const eventti = this.props.eventti
        return (
            <div key={eventti._id} className={".grid-container"}>
                <h3 onClick={this.toggleLongFalse}>{eventti.title}</h3>
                <p>{eventti.content}</p>
            </div>
        )

    }

    shortInformation = () => {
        const eventti = this.props.eventti
        return (
            <div key={eventti._id} className={"eventti"}>
                <h4 onClick={this.toggleLongTrue}>{eventti.title}</h4>
            </div>
        )
    }

    toggleLongFalse = () => {
        this.setState({ long: false })
    }

    toggleLongTrue = () => {
        this.setState({ long: true })
    }

    render() {
        if (this.state.long) {
            return (
                <div>
                    {this.longInformation()}
                </div>
            )
        } else {
            return (
                <div>
                    {this.shortInformation()}
                </div>
            )
        }
    }
}

export default Eventti