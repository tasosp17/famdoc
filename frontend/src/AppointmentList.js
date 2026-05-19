import React from 'react';
import AppointmentCard from './AppointmentCard';

const AppointmentList = ({ appointments, role, onRemove, onUpdateStatus }) => {
    if (appointments.length === 0){
        return <p style={{ color: '#666', marginTop: '20px' }}>No appointments found.</p>
    }

    return (
        <div style={{ marginTop: '20px' }}>
            {appointments.map(appt => (
                <AppointmentCard
                    key={appt.id}
                    appointment={appt}
                    role={role}
                    onRemove={onRemove}
                    onUpdateStatus={onUpdateStatus}
                />
            ))}
        </div>
    );
};

export default AppointmentList;