import React from 'react';
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, username, handleFieldChange, password }) => (
    <div className="login">
        <h1 className="headline1"> Time to keep track of trainings!</h1>
        <h3 className="underHeadline"> Go to your notes from here!</h3>
        <form onSubmit={onSubmit} className="middlebox">
            <div>
                username:
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                password:
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleFieldChange}
                />
            </div>
            <br/>
            <div className="l_sidebox">
                <button type="submit" className="button">Login</button>
            </div>
        </form>
    </div>
)


LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm