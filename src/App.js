import React from 'react'

import Eventti from './components/Eventti'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import EventsAddingForm from './components/EventsAddingForm'
import Togglable from './components/Togglable'

import eventtiService from './services/events'
import loginService from './services/loginService'

import './index.css'



class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events: [],
            attachments: [],
            attachmentCounter: 0,

            user: null,
            username: "",
            password: "",
            name: "",

            title: "",
            content: "",

            notification: null,
            error: null,
            visible: false
        }
    }

    async componentDidMount() {
        const events = await eventtiService.getAll()
        this.setState({ events })

        const loggedUserJSON = window.localStorage.getItem('loggedTrainingappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({ user })
            eventtiService.setToken(user.token)
            this.setState({ name: user.name })
        }
    }

    handleFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    // ---- Login / Logout ---- //

    login = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem('loggedTrainingappUser', JSON.stringify(user))
            eventtiService.setToken(user.token)

            this.setState({ name: user.name, username: '', password: '', user })

        } catch (exception) {
            this.updateError('Käyttäjätunnus tai salasana on virheellinen!')

            console.log(exception)
        }
    }

    logout = async () => {

        window.localStorage.removeItem('loggedTrainingappUser')
        this.setState({ user: null, username: '', password: '' })
        window.localStorage.clear()

    }


    // ----  Errors / Notifications ----  //

    updateNotification = (message) => {
        this.setState({ notification: message })
        setTimeout(() => {
            this.setState({ notification: null })
        }, 3000)
    }

    updateError = (message) => {
        this.setState({ error: message })
        setTimeout(() => {
            this.setState({ error: null })
        }, 3000)
    }

    // ---- Adding for events ---- //

    addEventti = async (event) => {
        event.preventDefault()
        try {
            const newEventti = await eventtiService.create({
                title: this.state.title,
                content: this.state.content,
                attachments: this.state.attachments
            })
            this.updateNotification(`Added new event: ${this.state.title} `)
            const events = await eventtiService.getAll()
            this.setState({
                events,
                title: "",
                content: "",
                attachments: [],
                attachmentCounter: 0
            })

        } catch (exception) {
            this.updateError("We weren't able to add the event.")
        }
    }

    removeEventti = async (eventti) => {
        await eventtiService.remove(eventti.id) 
        const events = await eventtiService.getAll()
        this.setState({ events })   
    }

    onDrop = (files) => {
        let file = files[0]
        const reader = new FileReader();
        const helpList = this.state.attachments
        this.attachmentName = files
        reader.onload = (event) => {
            helpList.push(event.target.result.split(',')[1])
            this.addToCounter()
        }
        const attachment = reader.readAsDataURL(file);
        
        this.setState({ attachments: helpList })
    }

    emptyAttachments = () => {
        this.setState({
            attachments: [],
            attachmentCounter: 0
        })
    }

    addToCounter = () => {
        this.setState({ attachmentCounter: this.state.attachmentCounter + 1})
    }

    addingForm = () => {

        return (
            <div>
                <Togglable buttonLabel="Add a new training" empty={this.emptyAttachments}>
                    <EventsAddingForm
                        title={this.state.title}
                        content={this.state.content}
                        handleFieldChange={this.handleFieldChange}
                        handleSubmit={this.addEventti}
                        onDrop={this.onDrop}
                        attachmentCounter={this.state.attachmentCounter}
                    />
                </Togglable>
            </div>
        )
    }

    isItRightUser = (eventti) => {
        return eventti.user._id === this.state.user.id
    }

    logOut = () => {
        return (
            <div>
                <form onSubmit={this.logout}>
                    <button className="button" type="submit" > Logout </button>
                </form>
            </div>
        )
    }

    render() {
        if (this.state.user === null) {
            return (
                <div>
                    <div>
                        <LoginForm password={this.state.password} username={this.state.username} handleFieldChange={this.handleFieldChange} onSubmit={this.login} />
                    </div>
                    <Notification message={this.state.error} className={"error"} />
                </div>
            )


        } else {
            return (
                <div >
                    <p>You are logged in as {this.state.name}.</p>
                    <div>{this.logOut()}</div>

                    <Notification message={this.state.notification} className={"notification"} />
                    <Notification message={this.state.error} className={"error"} />
                    <div className="wrapper">
                        <div className="headline2">
                            <h1>My trainings</h1>
                            {this.addingForm()}
                        </div>
                        <div className="listing">

                            {this.state.events
                                .filter(this.isItRightUser)
                                .map(eventti =>
                                   <Eventti key={eventti._id} eventti={eventti} remove={(event) => this.removeEventti(event)} /> 
                                )
                            }
                        </div>
            
                    </div>
                </div>
            )
        }
    }
}

export default App;
