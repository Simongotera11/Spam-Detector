import React, { useState, useEffect } from 'react';

const SpamComponent = () => {
    const [spam, setSpam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpam = async () => {
            const apiUrl = 'http://localhost:8080/api/v1/spam';
            try {
                const res = await fetch(apiUrl);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                console.log("Fetched data:", data);
                if (Array.isArray(data)) {
                    setSpam(data);
                } else {
                    console.error("Expected data to be an array, but got:", data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpam();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {spam.length > 0 ? (
                spam.map((item, index) => (
                    <div key={index}>
                        {/* Render your data here */}
                        {JSON.stringify(item)}
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default SpamComponent;
