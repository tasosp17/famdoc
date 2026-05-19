import React, { useState } from 'react';

const BookAppointment = ({ token, doctorId, userId, onBack, onSuccess}) => {
    const [appointmentDate, SetAppointmentDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try{
            const response = await fetch(`http://localhost:8080/api/appointments/request`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    doctorId: doctorId,
                    appointmentDate: appointmentDate
                }),
            });

            if (!response.ok){
                throw new Error('Failed to request appointment');
            }

            //if successful, navigate away or show success state
            onSuccess(); 
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto '}}>
            <button onClick={onBack} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Back to Profile</button>
            <h2 style={{ color: '#2c3e50' }}>Select Appointment Time</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <label style={{ fontWeight: 'bold' }}>
                    Date and Time:
                    <input
                        type="datetime-local"
                        required
                        value={appointmentDate}
                        onChange={(e) => SetAppointmentDate(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </label>

                {error && <p style={{ color: 'red', margin: '0' }}>{error}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ backgroundColor: '#007bff', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: isSubmitting ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                >
                    {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default BookAppointment;