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
                <p fontSize="11px">{eventti.content}</p>
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
        const eventti = this.props.eventti
        if (window.confirm(`Poistetaanko '${eventti.title}'?`)) {
            this.props.remove(eventti)
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