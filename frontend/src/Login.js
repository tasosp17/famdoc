import React, { useState } from 'react';
import Logo from './Logo';

const Login = ({ onLogin, onNavigateToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json '},
                body: JSON.stringify({ username, password })
            });

            if (response.ok){
                const data = await response.json();
                //extract token, id and role from AuthResponse DTO
                onLogin(data.id, data.role, data.token);
            }else {
                const errText = await response.text();
                setError(errText);
            }
        }catch (err){
            setError("Network error. Is the backend running?");
        }finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f4f8' }}>
            <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <Logo />
                <p style={{ color: '#666', marginBottom: '20px'}}>Sign in to continue</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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

                    {error && <p style={{ color: 'red', fontSize: '14px', margin: '0' }}>{error}</p>}
                    
                    <button
                        type="sumbit"
                        disabled={loading}
                        style={{ padding: '10px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p style={{ marginTop: '20px', fontSize: '14px' }}>
                    New user? <span style={{ color: '#28a745', cursor: 'pointer', textDecoration: 'underline' }} onClick={onNavigateToRegister}>Register here</span>
                </p>
            </div>
        </div>
    );
};

export default Login;