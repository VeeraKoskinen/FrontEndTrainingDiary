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
            <div key={eventti._id} className="subsub" >
                <h3 className="pointer" onClick={this.toggleLongFalse}>{eventti.title}</h3>
                <p font-size="11px" font-family="Verdana">{eventti.content}</p>
                {eventti.attachments.map(attachment =>
                    <div key={attachment.id} className="center">
                        <img className="image" src={attachment.url} />
                    </div>
                )}
            </div>
        )
    }

    shortInformation = () => {
        const eventti = this.props.eventti
        return (
            <div key={eventti._id} >
                <p className="pointer" onClick={this.toggleLongTrue}>{eventti.title}</p>
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
            eventtiService.remove(eventti.id)
        }
    }

    render() {
        if (this.state.long) {
            return (
                <div className="subinsideA">
                        {this.longInformation()}                   
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