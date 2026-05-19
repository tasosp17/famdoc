import React, {useState, useEffect } from 'react';
import AppointmentList from './AppointmentList';

const AppointmentsHub = ({ token, id, role }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try{
                //determine the correct URL based on role
                const url = role === 'user'
                ? `http://localhost:8080/api/appointments/user/${id}`
                : `http://localhost:8080/api/appointments/doctor/${id}`

                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                const data = await response.json();
                setAppointments(data);
            } catch (error){
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [token, id, role]); 

    //remove appointment
    const handleRemove = async (id) => {
        try{
            const apiRole = role === 'user' ? 'user' : 'doctor';

            const response = await fetch(`http://localhost:8080/api/appointments/${id}/remove?role=${apiRole}`, {
                method: 'PUT', //soft deleting
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if(response.ok){
                //remove from react screen
                setAppointments(prevAppointments =>
                    prevAppointments.filter(appt => appt.id !== id)
                );
            } else {
                console.error("Failed to remove appointment in backend");
            }
        }
        catch (error){
            console.error("Network error removing appointment:", error);
        }
    };

    //status update
    const handleUpdateStatus = async (id, newStatus) => {
        try{
            const response = await fetch(`http://localhost:8080/api/appointments/${id}/status?status=${newStatus}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok){
                //if db succeeds, update status text and color on the screen
                setAppointments(prevAppointments => 
                    prevAppointments.map(appt =>
                        appt.id === id ? {...appt, status: newStatus} : appt
                    )
                );
            } else {
                console.error("Failed to update appointment status");
            }
        } catch (error){
            console.error("Network error updating status:", error)
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#007bff' }}>
                {role === 'user' ? 'My Appointments' : 'Doctor Dashboard'}
            </h2>

            {loading ? (
                <p>Loading appointments...</p>
            ) : (
                <AppointmentList
                    appointments={appointments}
                    role={role}
                    onRemove={handleRemove}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
        </div>
    );
};

export default AppointmentsHub;