const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");
//const multer = require("multer");



const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "salonapp",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lisa.wanjiku@aiesec.net",
    pass: "urqk jlyl urdr ajfy",
  },
  tls: {
    rejectUnauthorized: false, // Ignore SSL certificate errors
  },
});

// Generate verification token
const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

// Multer configuration for file uploads
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});
*/
//------------------------------------------------------------------------------------------------------------

// Serve password reset form
app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reset-password.html"));
});

// Serve password reset form
app.get("/verify-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "verify-password.html"));
});


//-----------------------------------------------------------------------------------
app.post("/api/signup", (req, res) => {
  const { firstName, lastName, phone, gender, userType, email, password, businessID } = req.body;
  const verificationToken = generateToken();

  // Validate input
  if (!firstName) return res.status(400).json({ error: "First name is required." });
  if (!lastName) return res.status(400).json({ error: "Last name is required." });
  if (!phone) return res.status(400).json({ error: "Phone is required." });
  if (!gender) return res.status(400).json({ error: "Gender is required." });
  if (!userType) return res.status(400).json({ error: "User type is required." });
  if (!email) return res.status(400).json({ error: "Email is required." });
  if (!password) return res.status(400).json({ error: "Password is required." });
  if (userType === 'Beautician' && !businessID) return res.status(400).json({ error: "Business ID is required for beauticians." });

  // Check if email already exists
  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking email:", err);
      return res.status(500).json({ error: "Failed to register user" });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Insert into MySQL database
    const insertSql = "INSERT INTO users (firstName, lastName, phone, gender, userType, email, password, verificationToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertSql, [firstName, lastName, phone, gender, userType, email, password, verificationToken], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Failed to register user" });
      }

      // Determine the appropriate table to insert into based on userType
      let insertIntoTable = "";
      let additionalFields = [];
      if (userType === 'Client') {
        insertIntoTable = "clients";
        additionalFields = [firstName, lastName, phone, gender, email];
      } else if (userType === 'Beautician') {
        insertIntoTable = "beauticians";
        additionalFields = [firstName, lastName, phone, gender, email, businessID];
      }

      // Insert into respective table (clients or beauticians)
      const insertDetailsSql = `INSERT INTO ${insertIntoTable} (userID, firstName, lastName, phone, gender, email${userType === 'Beautician' ? ', businessID' : ''}) VALUES (?, ?, ?, ?, ?, ?${userType === 'Beautician' ? ', ?' : ''})`;
      const userID = result.insertId;

      db.query(insertDetailsSql, [userID, ...additionalFields], (err, detailsResult) => {
        if (err) {
          console.error("Error inserting details:", err);
          return res.status(500).json({ error: "Failed to register user details" });
        }

        // Send verification email
        const mailOptions = {
          from: "lisa.wanjiku@aiesec.net",
          to: email,
          subject: "Email Verification - Splendr",
          text: `Please verify your email by clicking the following link: http://192.168.100.39:3000/api/verify-email?token=${verificationToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ error: "Failed to send verification email" });
          }

          console.log("Email sent: " + info.response);
          res.status(200).json({ userID, message: "User registered successfully. Please check your email to verify your account." });
        });
      });
    });
  });
});

//-----------------------------------------------------------------------------------------------------------


app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Check credentials in MySQL
  const sql = "SELECT id, userType FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Error querying user:", err);
      return res.status(500).json({ message: "Login failed. Please try again." });
    }
    if (results.length > 0) {
      // Successful login
      const user = results[0];

      res.status(200).json({
        message: "Login successful.",
        userID: user.id, // Include userID in the response
        userType: user.userType, // Include userType in the response
      });
    } else {
      // Invalid credentials
      res.status(401).json({ message: "Invalid credentials." });
    }
  });
});


//---------------------------------------------------------------------------------------------------

// Endpoint to request password reset
app.post("/api/request-password-reset", (req, res) => {
  const { email } = req.body;

  // Check if the email exists
  const sqlCheck = "SELECT * FROM users WHERE email = ?";
  db.query(sqlCheck, [email], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ message: "Failed to request password reset. Please try again." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Email not found." });
    }

    const token = generateToken();
    const sqlInsert = "UPDATE users SET resetToken = ? WHERE email = ?";
    db.query(sqlInsert, [token, email], (err, result) => {
      if (err) {
        console.error("Error updating reset token:", err);
        return res.status(500).json({ message: "Failed to request password reset. Please try again." });
      }

      // Send password reset email
      const mailOptions = {
        from: "lisa.wanjiku@aiesec.net",
        to: email,
        subject: "Password Reset - Splendr",
        text: `Please reset your password by clicking the following link: http://192.168.100.39:3000/reset-password?token=${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).json({ error: "Failed to send password reset email." });
          return;
        }

        console.log("Password reset email sent: " + info.response);
        res.status(200).json({ message: "Password reset email sent successfully." });
      });
    });
  });
});

//--------------------------------------------------------------------------------------------------------

// Endpoint to reset password
app.post("/api/reset-password", (req, res) => {
  const { token, newPassword } = req.body;

  const sql = "UPDATE users SET password = ?, resetToken = NULL WHERE resetToken = ?";
  db.query(sql, [newPassword, token], (err, result) => {
    if (err) {
      console.error("Error resetting password:", err);
      res.status(500).json({ error: "Failed to reset password. Please try again." });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(400).json({ error: "Invalid token or token has expired." });
      return;
    }

    res.status(200).json({ message: "Password reset successfully." });
  });
});

//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------

// API endpoint to get businesses based on service
app.get('/api/businesses', (req, res) => {
  const { service } = req.query;

  const sql = 'SELECT businessID, business_name AS name, address, phone, email, description, image_url FROM business WHERE service = ?';
  db.query(sql, [service], (err, results) => {
    if (err) {
      console.error('Error fetching businesses:', err);
      return res.status(500).json({ error: 'Failed to fetch businesses' });
    }

    console.log('Fetched businesses:', results); // Log the fetched businesses
    res.status(200).json(results);
  });
});

//------------------------------------------------------------------------------------------------------------

// Endpoint to fetch beauticians based on businessID
app.get('/api/beauticians', (req, res) => {
  const { businessID } = req.query;
  const sql = 'SELECT * FROM beauticians WHERE businessID = ?';
  db.query(sql, [businessID], (err, results) => {
    if (err) {
      console.error('Error fetching beauticians:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json(results);
  });
});

//--------------------------------------------------------------------------------------------------

// GET all services from the services table
app.post('/api/services', (req, res) => {
  const { id } = req.body;
  const sql = 'SELECT * FROM services WHERE businessID = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching services:', err);
      return res.status(500).json({ error: 'Failed to fetch services' });
    }

    console.log('Fetched services:', results); // Log the fetched services
    res.status(200).json(results);
  });
});



//-------------------------------------------------------------------------------------------------------------
// Endpoint to fetch appointments by userID
// GET all appointments
app.get('/api/appointments-view', async (req, res) => {
  try {
    db.query(`
      SELECT a.*, b.firstName AS beauticianFirstName, b.lastName AS beauticianLastName,
             c.business_name AS businessName, d.name AS serviceName , e.firstName AS clientName
      FROM appointments a
      LEFT JOIN beauticians b ON a.beauticianId = b.userID
      LEFT JOIN business c ON a.businessId = c.businessID
      LEFT JOIN services d ON a.serviceId = d.id
      LEFT JOIN users e ON a.clientId = d.id

    `, (err, results) => {
      if (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


//----------------------------------------------------------------------------------------------------------

app.get('/api/appointments-b-view', async (req, res) => {
  const { beauticianID } = req.query;
  
  if (!beauticianID) {
    return res.status(400).json({ error: 'Beautician ID is required' });
  }

  try {
    const [results] = await pool.query(
      `SELECT 
        a.id,
        c.firstName AS clientName,
        b.business_name AS businessName,
        s.name AS serviceName,
        a.date,
        a.time
      FROM 
        appointments a
      JOIN 
        users c ON a.clientID = c.userID
      JOIN 
        business b ON a.businessId = b.businessID
      JOIN 
        services s ON a.serviceId = s.id
      WHERE 
        a.beauticianID = ?`,
      [beauticianID]
    );
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});


// POST endpoint for creating appointments
// Example data storage (replace with your database integration)
let appointments = [];

// POST endpoint to create a new appointment
/// POST endpoint to create a new appointment



app.post('/api/appointments', async (req, res) => {
  const { beauticianId, businessId, serviceId, clientId, date, time } = req.body; // Added clientId

  try {
    const result = await db.query(
      'INSERT INTO appointments (beauticianId, businessId, serviceId, clientId, date, time) VALUES (?, ?, ?, ?, ?, ?)', // Included clientId in the SQL query
      [beauticianId, businessId, serviceId, clientId, date, time] // Included clientId in the values array
    );
    res.status(201).json({ message: 'Appointment successfully created', appointmentId: result.insertId });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Error creating appointment' });
  }
});


//----------------------------------------------------------------------------------------------------------------


// Assuming you have initialized your Express app and set up your database connection

// Endpoint to fetch user details by userID
app.get('/api/user-details/:userID', async (req, res) => {
  const userID = req.params.userID;

  // Example SQL query to fetch user details from MySQL
  const sql = 'SELECT * FROM users WHERE id = ?';

  try {
    db.query(sql, [userID], (err, results) => {
      if (err) {
        console.error('Error fetching user details:', err);
        return res.status(500).json({ error: 'Error fetching user details' });
      }

      if (results.length > 0) {
        const user = results[0];
        // Send user details as JSON response
        res.status(200).json({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          gender: user.gender,
          email: user.email,
        });
      } else {
        // User with the provided ID not found
        res.status(404).json({ error: 'User not found' });
      }
    });
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Database error' });
  }
});


//-----------------------------------------------------------------------------------------------------

// Endpoint to update user details by userID

app.put('/api/user-details/:userID', async (req, res) => {
  const userID = req.params.userID;
  const { firstName, lastName, phone, email, gender } = req.body;

  // Update SQL query
  const sql = `UPDATE users SET firstName = ?, lastName = ?, phone = ?, email = ?, gender = ? WHERE id = ?`;

  try {
    db.query(sql, [firstName, lastName, phone, email, gender, userID], (err, result) => {
      if (err) {
        console.error('Error updating user details:', err);
        return res.status(500).json({ error: 'Failed to update user details' });
      }

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User details updated successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    });
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

//-----------------------------------------------------------------------------------------------------------

///---------------------------------------------------------------------------------------------------------------
// Start the server

// Example using Express
app.get('/api/beautician-details/:id', async (req, res) => {
  const beauticianId = req.params.id;
  try {
    const beautician = await getBeauticianDetails(beauticianId); // Function to fetch beautician details from DB
    if (!beautician) {
      return res.status(404).json({ message: "Beautician not found" });
    }
    res.json(beautician);
  } catch (error) {
    console.error("Error fetching beautician details:", error);
    res.status(500).json({ message: "Server error" });
  }
});
//---------------------------------------------------------------------------------------------------------------


// Route to handle POST requests for submitting ratings
app.post('/api/ratings', (req, res) => {
  const { beauticianId, businessId, businessRating, beauticianRating, comment } = req.body;

  // Example validation (you should implement more thorough validation as per your needs)
  if (!beauticianId || !businessId || !businessRating || !beauticianRating) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Replace with actual database integration using an ORM or raw SQL queries

  const newRating = {
    id: ratings.length + 1, // Replace with database generated ID
    beauticianId,
    businessId,
    businessRating,
    beauticianRating,
    comment,
    createdAt: new Date().toISOString() // Timestamp of when the rating was submitted
  };

  ratings.push(newRating); // Simulate storing in memory

  // Respond with success message or newly created rating object
  res.status(201).json(newRating);
});

//------------------------------------------------------------------------------------------------------------------

app.delete('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    res.status(204).send(); // Successfully deleted
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


//---------------------------------------------------------------------------------------------------------------------

// Assuming you have Express set up with a MySQL database connection

// PUT endpoint to update appointment details
app.put('/api/appointments/:id', async (req, res) => {
  const appointmentId = req.params.id;
  const { date, time } = req.body;

  try {
    // Update appointment in the database
    const updateQuery = 'UPDATE appointments SET date = ?, time = ? WHERE id = ?';
    db.query(updateQuery, [date, time, appointmentId], (err, result) => {
      if (err) {
        console.error('Error updating appointment:', err);
        res.status(500).json({ message: 'Failed to update appointment' });
      } else {
        console.log('Appointment updated successfully');
        res.json({ message: 'Appointment updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
//-------------------------------------------------------------------------------------------

// Assuming you have a route handler in your Express app
app.get('/api/beauticians/:beauticianId/firstName', async (req, res) => {
  try {
    const { beauticianId } = req.params;
    // Query your database to fetch firstName based on beauticianID
    const beautician = await Beautician.findOne({ where: { userID: beauticianId } });
    if (!beautician) {
      return res.status(404).json({ error: 'Beautician not found' });
    }
    res.status(200).json({ firstName: beautician.firstName });
  } catch (error) {
    console.error('Error fetching beautician:', error);
    res.status(500).json({ error: 'Failed to fetch beautician' });
  }
});
//---------------------------------------------------------------------------------------------------------



//----------------------------------------------------------------------------------------------------------------------
app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});




//---------------------------------------------------------------------------------




