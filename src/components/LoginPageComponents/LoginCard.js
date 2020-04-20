import React from 'react';

function LoginCard(props) {
    return (
        <div className="login-card">
            {props.children}
        </div>
    );
}

export default LoginCard;