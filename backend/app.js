const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
