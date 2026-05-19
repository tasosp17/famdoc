import React, { useState, useEffect } from 'react';

const DoctorProfile = ({ token, doctorId, role, onBack, onRequestAppointment }) => {
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`, {
                headers: {
                        'Authorization': `Bearer ${token}`
                    }
            });
            const data = await response.json();
            setDoctor(data);
        };
        fetchDoctor();
    }, [token, doctorId]);
    
    if (!doctor) return <p>Loading doctor profile...</p>;

    //check role
    const isUser = role === 'user';
    //check if the doctor has room for new patients
    const hasCapacity = doctor.currentPatientCount < doctor.maxPatients;

    return (
        <div style={{ padding: '20px' }}>
            {isUser && (
                <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Back to Search</button>
            )}
            <h1 style={{ color: '#007bff' }}>{doctor.name}</h1>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
                <p><strong>Specialty:</strong> {doctor.specialty}</p>
                <p><strong>Address:</strong> {doctor.address}</p>
                <p><strong>Zip Code:</strong> {doctor.zipCode}</p>
                <p><strong>Patient Capacity:</strong> {doctor.currentPatientCount} / {doctor.maxPatients}</p>
                {isUser && hasCapacity && (
                    <button 
                        onClick={() => onRequestAppointment(doctor.id)}
                        style={{ backgroundColor: '#28a745', color: 'white', padding: '10px'}}>
                        Request Appointment
                    </button>
                )}

                {isUser && !hasCapacity && (
                    <p style={{ color: '#dc3545', fontWeight: 'bold', marginTop: '15px' }}>
                        This doctor is not accepting new patients at this time
                    </p>
                )}
            </div>
        </div>
    );
};

export default DoctorProfile;