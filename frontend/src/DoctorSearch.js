import React, { useState} from 'react';
import DoctorList from './DoctorList'

const DoctorSearch = ({ token, onSelectDoctor }) => {
    const [zipCode, setZipCode] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [hasSearched, setHasSearched] = useState(false); //track if the user has clicked search
    const [isSearching, setIsSearching] = useState(false); 

    const handleSearch = async () => {
        setHasSearched(true); //set to true as soon as they click search
        setIsSearching(true);
        try {
            //this calls the java controller at localhost:8080
            const response = await fetch(`http://localhost:8080/api/doctors/search?zipCode=${zipCode}`, {
                headers: {
                        'Authorization': `Bearer ${token}`
                    }
            });
            const data = await response.json();
            setDoctors(data);
        } catch (error){
            console.error("Error fetching doctors:", error);
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: '#007bff' }}>Find a Doctor</h2>
            <input
                type="text"
                placeholder="Enter Zip Code (e.g. 90210)"
                value={zipCode}
                onChange={(e) => { setZipCode(e.target.value);
                    setHasSearched(false);
                }}
            />
            <button onClick={handleSearch}>Search</button>

            <DoctorList doctors={doctors} onSelectDoctor={onSelectDoctor} hasSearched={hasSearched} isSearching={isSearching} />
        </div>
    );
};

export default DoctorSearch;