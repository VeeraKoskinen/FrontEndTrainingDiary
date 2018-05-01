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
        console.log(event.target.value)
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
        console.log('logout metodissa')

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
        console.log('eventin lisäys-metodissa')
        try {
            const newEventti = await eventtiService.create({
                title: this.state.title,
                content: this.state.content
            })

            this.updateNotification(`Added new event: ${this.state.title} `)
            this.setState({
                events: this.state.events.concat(newEventti),
                title: "",
                content: ""
            })

        } catch (exception) {
            this.updateError("We weren't able to add the event.")

            console.log(exception)
            console.log(this.state.error)
        }
    }

    addingForm = () => {

        return (
            <Togglable buttonLabel="Add a new training">
                <EventsAddingForm
                    title={this.state.title}
                    content={this.state.content}
                    handleFieldChange={this.handleFieldChange}
                    handleSubmit={this.addEventti}
                />
            </Togglable>
        )
    }

    isItRightUser = (eventti) => {
        return eventti.user._id === this.state.user.id
    }

    logOut = () => {
        return (
            <div>
                <form onSubmit={this.logout}>
                    <button type="submit"> Logout </button>
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
            console.log("tässä käyttäjän tiedot: ", this.state.user)
            return (
                <div>
                    You are logged in as {this.state.name}.
                    {this.logOut()}

                    <Notification message={this.state.notification} className={"notification"} />
                    <Notification message={this.state.error} className={"error"} />

                    <div className=".item1" >
                        <h2>My trainings</h2>
                    </div>
                    <div className=".item2">
                        {this.state.events
                            .filter(this.isItRightUser)
                            .map(eventti =>
                                <Eventti key={eventti._id} eventti={eventti} />
                            )
                        }
                    </div>

                    <div>
                        {this.addingForm()}
                    </div>
                </div>
            )
        }
    }
}

export default App;
