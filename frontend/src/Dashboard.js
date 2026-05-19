import React, { useState, useEffect } from 'react';
import DoctorList from './DoctorList';

const Dashboard = ({ token, id, onSelectDoctor }) => {
    const [recommendedDoctors, setRecommendedDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try{
                const response = await fetch(`http://localhost:8080/api/doctors/recommended?id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setRecommendedDoctors(data);
            }catch(error){
                console.error("Error fetching recommendations:", error);
            } finally {
                setLoading(false);
            };
        };
        
        fetchRecommendations();
    }, [token, id]);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: '#007bff' }}>Welcome!</h1>
            <p>Based on your area code, here are some doctors near you:</p>
            {loading ? <p>Loading your recommendations...</p> : <DoctorList doctors={recommendedDoctors} onSelectDoctor={onSelectDoctor} hasSearched={true} isSearching={false} />}
        </div>
    );
};

export default Dashboard;