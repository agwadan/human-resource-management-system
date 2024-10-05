const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const staffRoutes = require('./routes/staff.routes');
require('dotenv').config();
const sequelize = require('./config/db.config');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('API is working!');
});


/* Accessing Staff Routes
-------------------------*/
app.use('/api/staff', staffRoutes);


/* Synchronizing sequelize models with database
------------------------------------------------*/
sequelize.sync().then(() => {
    console.log("Models synced successfully.");
}).catch(err => {
    console.error("Error syncing models:", err);
});

/* Starting the server 
----------------------*/
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
