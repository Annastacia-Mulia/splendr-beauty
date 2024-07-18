import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    actionButton: {
        cursor: 'pointer',
        marginLeft: 10,
    },
};

function ServicesList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:8085/service');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setServices(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this service?')) {
                const response = await axios.delete(`http://localhost:8085/services/${id}`);
                if (response.status === 200) {
                    // If deletion was successful, update state to reflect the changes
                    setServices(services.filter(service => service.id !== id));
                    window.alert('Service successfully deleted!');
                } else {
                    throw new Error('Failed to delete service');
                }
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            // Handle error state if needed
        }
    };

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
            <h1 style={styles.header}>Services List</h1>
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableRow}>
                        <th style={{ ...styles.columnHeader, flex: 3 }}>Name</th>
                        <th style={{ ...styles.columnHeader, flex: 3 }}>Time</th>
                        <th style={{ ...styles.columnHeader, flex: 3 }}>Cost</th>
                        <th style={{ ...styles.columnHeader, flex: 1 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{service.name}</td>
                            <td style={{ ...styles.tableCell, ...styles.lastCell }}>{service.duration}</td>
                            <td style={{ ...styles.tableCell, ...styles.lastCell }}>{service.cost}</td>
                            <td style={styles.tableCell}>
                                {/* Edit button */}
                                <Link to={`/updateService/${service.id}`} style={styles.actionButton}>
                                    Edit
                                </Link>
                                {/* Delete button */}
                                <button
                                    style={styles.actionButton}
                                    onClick={() => handleDelete(service.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServicesList;
