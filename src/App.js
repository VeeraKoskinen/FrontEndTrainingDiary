import React from 'react'

import Eventti from './components/Eventti'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

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

            error: null,
            visible: false
        }
    }

    async componentDidMount() {
        const events = await eventtiService.getAll()
        this.setState({ events })

        const loggedUserJSON = window.localStorage.getItem('loggedEventtiappUser')
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

    login = async (event) => {
        event.preventDefault()
        console.log('login in with: ', this.state.username, this.state.password)
    
        try {
          const user = await loginService.login({
            username: this.state.username,
            password: this.state.password
          })
    
          window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
          eventtiService.setToken(user.token)
          
          console.log(user)
          this.setState({ name: user.name, username: '', password: '', user })
          console.log('nimi asetetaan userin mukaan:')
          console.log(this.state.name)
          console.log(this.state.user)
    
        } catch (exception) {
          this.updateError('Käyttäjätunnus tai salasana on virheellinen!')
    
          console.log(exception)
        }
    }
    


    render() {
        if (this.state.user === null) {
            return (
                <div>
                    <LoginForm password={this.state.password} username={this.state.username} handleFieldChange={this.handleFieldChange} onSubmit={this.login}/>
                </div>
            )                                        
        } else {
            return (
                <div>
                    You are logged in as {this.state.name}.
                </div>
            )
        }
    }
}  

export default App;
