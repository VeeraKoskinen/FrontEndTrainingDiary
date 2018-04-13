import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
    <div>
        <h1>Time to keep track of training!</h1>
        <h3>Go to your training informations from here!</h3>
        <div>
            <h4>Sign in:</h4>
            <p>username: <input></input></p>
            <p>password: <input></input></p>
            <button >login</button>
        </div>    
    </div>

)


ReactDOM.render(<App />, document.getElementById('root'));

