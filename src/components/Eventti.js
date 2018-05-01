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
                <p onClick={this.toggleLongTrue}>{eventti.title}</p>
            </div>
        )
    }

    toggleLongFalse = () => {
        this.setState({ long: false })
    }

    toggleLongTrue = () => {
        this.setState({ long: true })
    }

    remove = () => {
        console.log("eventin remove metodissa")
        const eventti = this.props.eventti
        console.log(eventti.id)
        eventtiService.remove(eventti.id)
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
                    <div>
                        <button onClick={this.remove} type="submit">Delete</button>
                    </div>
                </div>
            )
        }
    }
}

export default Eventti