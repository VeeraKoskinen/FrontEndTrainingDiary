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
                <div>{eventti.content}</div>
            </div>
        )

    }

    shortInformation = () => {
        const eventti = this.props.eventti
        return (
            <div key={eventti._id}>
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
        if (window.confirm(`Poistetaanko '${eventti.title}'?`)) {
            console.log(eventti.id)
            eventtiService.remove(eventti.id)
        }
    }

    render() {
        if (this.state.long) {
            return (
                <div className="subinsideA">
                    <div >
                        {this.longInformation()}
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="subinsideL">
                        {this.shortInformation()}
                    </div>
                    <div className="subinsideR">
                        <button className="button" onClick={this.remove} type="submit" >Delete</button>
                    </div>
                </div>
            )
        }
    }
}

export default Eventti