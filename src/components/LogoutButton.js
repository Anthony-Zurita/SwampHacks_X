//inspired by tutorial of implementing auth0: https://www.youtube.com/watch?v=pAzqscDx580&ab_channel=DaveGray

import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button 
                variant="primary" 
                size="lg" 
                onClick={() => logout()}
                className="mb-3"
            >
                Sign Out
            </Button>
        )
    )
}

export default LogoutButton;