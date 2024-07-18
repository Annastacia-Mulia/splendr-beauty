import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

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
function BusinessList() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get('http://localhost:8085/business');
                if (!response.data || response.data.length === 0) {
                    throw new Error('No data available');
                }
                setBusinesses(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const handleEdit = (business_id) => {
        // Navigate to edit page or perform edit action
        console.log(`Edit business with ID ${business_id}`);
    };

    const handleDelete = async (business_id) => {
        try {
            const response = await axios.delete(`http://localhost:8085/business/${business_id}`);
            if (response.status === 200) {
                // If deletion was successful, update state to reflect the changes
                setBusinesses(businesses.filter(business => business.id !== business_id));
            } else {
                throw new Error('Failed to delete business');
            }
        } catch (error) {
            console.error('Error deleting business:', error);
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
            <h1 style={styles.header}>Businesses</h1>
            <div style={styles.table}>
                <div style={styles.tableRow}>
                    <div style={styles.columnHeader}>Business Name</div>
                    <div style={styles.columnHeader}>Business Phone</div>
                    <div style={styles.columnHeader}>Email Address</div>
                    <div style={styles.columnHeader}>Address</div>
                    <div style={styles.columnHeader}>Service</div>
                    <div style={styles.columnHeader}>Description</div>
                    <div style={styles.columnHeader}>Actions</div>
                </div>
                {businesses.map((business) => (
                    <div key={business.id} style={styles.tableRow}>
                        <div style={styles.cell}>{business.business_name}</div>
                        <div style={styles.cell}>{business.phone}</div>
                        <div style={styles.cell}>{business.email}</div>
                        <div style={styles.cell}>{business.address}</div>
                        <div style={styles.cell}>{business.service}</div>
                        <div style={styles.cell}>{business.description}</div>
                        <div style={styles.actionCell}>
                            <Link
                                to={`/updateBusiness/${business.business_id}`} // Adjust the path as per your routing setup
                                style={styles.actionButton}
                                onClick={() => handleEdit(business.business_id)}
                            >
                                Edit
                            </Link>
                            <button
                                style={styles.actionButton}
                                onClick={() => handleDelete(business.business_id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BusinessList;
