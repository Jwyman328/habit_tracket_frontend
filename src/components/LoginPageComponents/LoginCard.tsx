import React from 'react';

type childrenProp = {
    children: JSX.Element[]
}

function LoginCard({children}:childrenProp ) {
    return (
        <div className="login-card">
            {children}
        </div>
    );
}

export default LoginCard;