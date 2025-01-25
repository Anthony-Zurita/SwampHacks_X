//inspired by tutorial of implementing auth0: https://www.youtube.com/watch?v=pAzqscDx580&ab_channel=DaveGray

import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()}>
                Sign In
            </button>
        )
    )
}

export default LoginButton