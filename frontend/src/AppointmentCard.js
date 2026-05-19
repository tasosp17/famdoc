import React from 'react';

const AppointmentCard = ({ appointment, role, onRemove, onUpdateStatus}) => {
    const dateObj = new Date(appointment.appointmentDate);
    const dateString = dateObj.toLocaleDateString();
    const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const isUser = role === 'user';
    const isDoctor = role === 'doctor';

    return (
        <div style={{ 
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            margin: '10px 0',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            {/* Left Side: Information */}
            <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                    {isUser ? `${appointment.doctor.name}` : `User: ${appointment.user.username}`}
                </h3>
                <p style={{ margin: '5px 0' }}><strong>Date:</strong> {dateString} at {timeString}</p>

                {isUser && (
                    <>
                        <p style={{ margin: '5px 0' }}><strong>Specialty:</strong> {appointment.doctor.specialty}</p>
                        <p style={{ margin: '5px 0' }}><strong>Address:</strong> {appointment.doctor.address} {appointment.doctor.zipCode} </p>
                    </>
                )}

                <p style={{ margin: '10px 0 0 0' }}>
                    <strong>Status: </strong>
                    <span style={{ 
                        color: appointment.status === 'ACCEPTED' ? '#28a745' : 
                               appointment.status === 'DECLINED' ? '#dc3545' :
                               appointment.status === 'COMPLETED' ? '#6c757d' : '#ffc107',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: '14px'
                    }}>
                        {appointment.status}
                    </span>
                </p>
            </div>

            {/* Right Side: Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {isDoctor && appointment.status === 'PENDING' && (
                    <>
                        <button
                            onClick={() => onUpdateStatus(appointment.id, 'ACCEPTED')}
                            style={{ backgroundColor: '#28a745', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Accept
                        </button>
                        <button
                            onClick={() => onUpdateStatus(appointment.id, 'DECLINED')}
                            style={{ backgroundColor: '#dc3545', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Decline
                        </button>
                    </>
                )}

                {/* Remove button only shows up for completed or declined appointments */}
                {(appointment.status === 'DECLINED' || appointment.status === 'COMPLETED') && (
                    <button
                        onClick={() => onRemove(appointment.id)}
                        style={{ backgroundColor: '#f8f9fa', color: '#dc3545', padding: '8px 15px', border: '1px solid #dc3545', borderRadius: '5px', cursor: 'pointer' }}>
                        ✕ Remove
                    </button>
                )}
            </div>
        </div>
    );
};

export default AppointmentCard;
