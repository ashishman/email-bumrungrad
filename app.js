const express = require('express');
const bodyParser = require('body-parser');
const mailerRouter = require('./routes/mailer');
const imgUpload = require('./routes/uploader');
const enquiryRouter = require('./routes/enquiryMailer');
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(
    cors({
        origin: "*",
    })
)

app.use(express.json())

app.use('/mail', mailerRouter);
app.use('/enquiry', enquiryRouter);
app.use('/uploader', imgUpload)

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
    
})