import React, { useState, useEffect } from 'react';

const UserProfile = ({ token, id }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8080/api/${id}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUser(data);
        };
        fetchUser();
    }, [token, id]);

    if (!user) return <p>Loading profile...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#007bff' }}>Your Profile</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Home Area Code:</strong> {user.areaCode}</p>
        </div>
    );
};

export default UserProfile;