import React from 'react';

//a small component for an individual doctor "card"
const DoctorCard = ({ doctor, onSelectDoctor }) => (
    <div 
    onClick={() => onSelectDoctor(doctor.id)} //click the card to view profile    
    style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{doctor.name}</h3>
        <p style={{ margin: '5px 0' }}><strong>Specialty:</strong> {doctor.specialty}</p>
        <p style={{ margin: '5px 0' }}>
            <strong>Availability:</strong> {doctor.currentPatientCount} / {doctor.maxPatients} patients
        </p>
        {doctor.currentPatientCount < doctor.maxPatients ? (
            <span style={{ color: 'green', fontWeight: 'bold' }}>● Available</span>
        ) : (
            <span style={{ color: 'red', fontWeight: 'bold' }}>● Full</span>
        )}
    </div>
);

//universal list component
const DoctorList = ({ doctors, onSelectDoctor, hasSearched, isSearching }) => {
    //if the user hasn't searched yet, show nothing
    if(!hasSearched){
        return null;
    }

    //currently fetching data
    if(isSearching){
        return <p style={{ textAlign: 'center', color: '#007bff', marginTop: '20px' }}>
            Searching for doctors...        
        </p>
    }
    
    //if user has searched but list is empty
    if(doctors.length === 0){
        return <p style={{ textAlign: 'center', color: '#007bff', marginTop: '20px' }}>
            No doctors found for this area.
        </p>
    }

    //user searches and has data
    return (
        <div style={{ marginTop: '20px' }}>
            {doctors.map(doc => (
                <DoctorCard key={doc.id} doctor={doc} onSelectDoctor={onSelectDoctor} />
            ))}
        </div>
    );
};

export default DoctorList;