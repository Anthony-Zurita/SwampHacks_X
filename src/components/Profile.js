//inspired by tutorial of implementing auth0: https://www.youtube.com/watch?v=pAzqscDx580&ab_channel=DaveGray

import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <article className='column'>
                {user?.picture && <img src={user.picture} alt={user?.name} />}
                <h2>{user?.name}</h2>
            </article>
        )
    )
}

export default Profile