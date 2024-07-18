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
    },
    tableRow: {
        display: 'flex',
        borderBottom: '1px solid #000',
        padding: '10px 0',
    },
    columnHeader: {
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        flex: 1,
        padding: '10px',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        padding: '10px',
    },
};

function ClientsList() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:8085/client');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClients(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchClients();
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
            <h1 style={styles.header}>Clients</h1>
            <div style={styles.table}>
                <div style={styles.tableRow}>
                    <div style={{ ...styles.columnHeader, flex: 2 }}>First Name</div>
                    <div style={{ ...styles.columnHeader, flex: 2 }}>Last Name</div>
                    <div style={{ ...styles.columnHeader, flex: 3 }}>Email</div>
                    <div style={{ ...styles.columnHeader, flex: 3 }}>Phone</div>
                    <div style={{ ...styles.columnHeader, flex: 3 }}>Gender</div>

                </div>
                {clients.map(client => (
                    <div key={client.id} style={styles.tableRow}>
                        <div style={{ ...styles.cell, flex: 2 }}>{client.client_fname}</div>
                        <div style={{ ...styles.cell, flex: 2 }}>{client.client_lname}</div>
                        <div style={{ ...styles.cell, flex: 3 }}>{client.client_email}</div>
                        <div style={{ ...styles.cell, flex: 3 }}>{client.client_phone}</div>
                        <div style={{ ...styles.cell, flex: 3 }}>{client.client_gender}</div>
                        


                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClientsList;
