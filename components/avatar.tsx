import { useCurrentUser } from '@/hooks/use-current-user';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Avatar = () => {
    const user = useCurrentUser()
    return (
        <div>
            {user && user.image ? (
                <img
                    src={user.image}
                    alt="User Avatar"
                    className="w-full h-full rounded-full"
                />
            ) : (
                <FaUserCircle className="w-full h-full rounded-full" />
            )}
        </div>
    );
}
export default Avatar;
