const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const routes = require('./routes');


const app = express();
mongoose.connect('mongodb+srv://Aircncdb:sergio@aircnc-jczki.mongodb.net/Aircnc?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//GET , POST, PUT, DELETE

// requ.query = access query params ( for filters)
// requ.params = access route params ( for edit, delete)
// requ.body = access body of the requisiton ( for edit and create)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3334);
