const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { readdir } = require('node:fs/promises');
const router = express.Router();


router.get('/', async (req, res) => {
    res.send('Hello this is bumrungrad');
})

router.post('/', async (req, res) => {
    const {
        fullName,
        hospitalNo,
        dateOfBirth,
        passportNo,
        nationality,
        countryOfResidence,
        preferredAppointmentDate,
        preferredAppointmentTime,
        specificConcern,
        preferredDoctor,
        purposeOfAppointment,
        availableInvestigation,
        requestForInterpreter,
        insuranceDocumentFront,
        insuranceDocumentBack,
    } = req?.body?.appointmentDetails;

    const dirPath = path.join(__dirname, '../images');
    const files = await readdir(dirPath);

    const dirPath2 = path.join(__dirname, '../img');
    const files2 = await readdir(dirPath2);


    var mail = nodemailer.createTransport({
        // service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'shresthaaashish84@gmail.com',
            pass: 'nmhecejhttvfgxvq'
        }
    });

    var mailOptions = {
        from: 'no-reply-bumrungrad-referral-nepal@gmail.com',
        to: 'ashish.shrestha@citytech.global',
        subject: `Appointment Request ${preferredAppointmentDate} // ${fullName} // ${hospitalNo} // ${dateOfBirth}`,
        subject: `Appointment Request`,
        html: `<h1>Basic Information</h1></br>
              <h4>Fullname: ${fullName}</h4></br>
              <h4>Hospital No: ${hospitalNo}</h4></br>
              <h4>Date Of Birth: ${dateOfBirth}</h4></br>
              <h4>Passport No: ${passportNo}</h4></br>
              <h4>Nationality: ${nationality}</h4></br>
              <h4>Country of Residencce: ${countryOfResidence}</h4></br></br>
              <h1>Appointment Details</h1>
              <h4>Preferred Appointment Date: ${preferredAppointmentDate}</h4></br>
              <h4>Preferred Appointment Time:: ${preferredAppointmentTime}</h4></br>
              <h4>Preferred Doctor: ${preferredDoctor}</h4></br>
              <h4>Purpose of Appointment: ${purposeOfAppointment}</h4></br>
              <h4>Available Investigation: ${availableInvestigation}</h4></br>
              <h4>Request for Interpreter: ${requestForInterpreter}</h4></br>
              <h4>Specific Concern: ${specificConcern}</h4></br></br>
              <h1>Payment Method</h1>
              `,


        attachments: [
            {
                path: `${dirPath}/${files?.[0]}`,
            },
            {
                path: `${dirPath2}/${files2?.[0]}`,
            }
        ]

    };


    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.end(error)
        } else {
            fs.unlink(`${dirPath}/${files}`, (err) => {
                if (err) {
                    res.end(err)
                }
            })
            fs.unlink(`${dirPath2}/${files2}`, (err) => {
                if (err) {
                    res.end(err)
                }
            })

            res.send("Your request has been sent")
        }
    });
})


module.exports = router;