import React from 'react';
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, username, handleFieldChange, password }) => (
    <div>
        <h1>Time to keep track of training!</h1>
        <h3>Go to your training informations from here!</h3>
        <form onSubmit={onSubmit}>
            <div>
                <h4>Sign in:</h4>
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
            <button type="submit">login</button>
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