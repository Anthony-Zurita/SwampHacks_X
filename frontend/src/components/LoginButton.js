//inspired by tutorial of implementing auth0: https://www.youtube.com/watch?v=pAzqscDx580&ab_channel=DaveGray

import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Button 
                variant="primary" 
                size="lg" 
                onClick={() => loginWithRedirect()}
                className="mb-3"
            >
                Sign In
            </Button>
        )
    )
}

export default LoginButton;