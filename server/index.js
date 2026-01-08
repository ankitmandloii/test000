const express = require('express');
const routes = require('./routes');
const { dbConnect } = require("./db");
const cors = require('cors');



const app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));




app.use('/api', routes);
dbConnect();











const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





