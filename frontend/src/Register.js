import React, { useState } from 'react';
import Logo from './Logo';

const Register = ({ onNavigateToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        try{
            const response = await fetch(`http://localhost:8080/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, areaCode})
            });

            if(response.ok){
                setSuccess(true);
                //automatically switch back to login
                setTimeout(() => onNavigateToLogin(), 2000);
            }else {
                const errText = await response.text();
                setError(errText);
            }
        }catch(err){
            setError("Network error. Is the backend running?");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f4f8' }}>
            <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <Logo />
                <p style={{ color: '#666', marginBottom: '20px'}}>Create a User Account</p>

                {success ? (
                    <p style={{ color: '#28a745', fontWeight: 'bold' }}>Registration successful! Redirecting to login...</p>
                ) : (
                    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input 
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <input 
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <input 
                            type="text"
                            placeholder="Zip/Area Code"
                            required
                            value={areaCode}
                            onChange={(e) => setAreaCode(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />

                        {error && <p style={{ color: 'red', fontSize: '14px', margin: '0' }}>{error}</p>}

                        <button 
                            type="submit"
                            style={{ padding: '10px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            Sign up
                        </button>
                    </form>
                )}

                <p style={{ marginTop: '20px', fontSize: '14px' }}>
                    Already have an account? <span style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }} onClick={onNavigateToLogin}>Log in here</span>
                </p>
            </div>
        </div>
    );
};

export default Register;