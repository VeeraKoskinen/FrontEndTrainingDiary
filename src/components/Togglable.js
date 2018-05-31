import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {

    static propTypes = {
        buttonLabel: PropTypes.string.isRequired,
    }


    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    toggleVisibility2 = () => {
        this.setState({ visible: !this.state.visible })
        this.props.empty()
    }



    render() {

        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        return (
            <div className="addU">
                <div style={hideWhenVisible}>              
                    <button className="button" onClick={this.toggleVisibility2}>{this.props.buttonLabel}</button>                      
                </div>  
                <div style={showWhenVisible}>
                    {this.props.children}
                    <button className="button" onClick={this.toggleVisibility2}>Cancel</button>
                </div>                
            </div>
        )
    }
}


export default Togglable;  