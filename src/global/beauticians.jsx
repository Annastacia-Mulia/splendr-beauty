import React, { useState, useEffect } from 'react';

const styles = {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    table: {
        border: '1px solid #000',
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        maxWidth: '100%',
        overflow: 'auto',
        borderCollapse: 'collapse', // Ensures table borders collapse properly
    },
    tableRow: {
        borderBottom: '1px solid #000',
    },
    tableCell: {
        padding: '10px',
        textAlign: 'center',
        borderRight: '1px solid #000', // Adds border to right of each cell
    },
    lastCell: {
        borderRight: 'none', // Removes border from right of last cell
    },
    columnHeader: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        flex: 1,
        padding: '10px',
    },
};

function BeauticiansList() {
    const [beauticians, setBeauticians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBeauticians = async () => {
            try {
                const response = await fetch('http://localhost:8085/beautician');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBeauticians(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchBeauticians();
    }, []);

    if (loading) {
        return <div style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
            <p>Loading...</p>
        </div>;
    }

    if (error) {
        return <div style={styles.container}>
            <p>Error: {error.message}</p>
        </div>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Beauticians List</h1>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableRow}>
                        <th style={{ ...styles.columnHeader, flex: 2 }}>First Name</th>
                        <th style={{ ...styles.columnHeader, flex: 2 }}>Last Name</th>
                        <th style={{ ...styles.columnHeader, flex: 3 }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {beauticians.map(beautician => (
                        <tr key={beautician.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{beautician.beautician_fname}</td>
                            <td style={styles.tableCell}>{beautician.beautician_lname}</td>
                            <td style={{ ...styles.tableCell, ...styles.lastCell }}>{beautician.beautician_email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BeauticiansList;
