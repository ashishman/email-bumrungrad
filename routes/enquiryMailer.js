const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const { readdir } = require('node:fs/promises');
const router = express.Router();


router.post('/', async (req, res) => {
    const {
        fullName,
        hospitalNo,
        dateOfBirth,
        passportNo,
        nationality,
        countryOfResidence,
        chiefComplaint,
        currentCondition,
        historyOfPresentIllness,
        medicationsAllergies,
        isPatientAdmitted,
        specificConcern,
    } = req?.body?.enquiryDetails;

    const enquiryPath1 = path.join(__dirname, '../enquiry1');
    const files = await readdir(enquiryPath1);

    const enquiryPath2 = path.join(__dirname, '../enquiry2');
    const files2 = await readdir(enquiryPath2);


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
        subject: `Enquiry Request ${fullName} // ${hospitalNo} // ${dateOfBirth}`,
        subject: `Enquiry Request`,
        html: `<h1>PATIENT DETAILS</h1></br>
              <h4>Fullname: ${fullName || "-"}</h4></br>
              <h4>Hospital No: ${hospitalNo || "-"}</h4></br>
              <h4>Date Of Birth: ${dateOfBirth || "-"}</h4></br>
              <h4>Passport No: ${passportNo || "-"}</h4></br>
              <h4>Nationality: ${nationality || "-"}</h4></br>
              <h4>Country of Residencce: ${countryOfResidence || "-"}</h4></br></br>
              <h1>ENQUIRY DETAILS</h1>
              <h4>Chief Complaint: ${chiefComplaint || "-"}</h4></br>
              <h4>Current condition:: ${currentCondition || "-"}</h4></br>
              <h4>History of Present Illness: ${historyOfPresentIllness || "-"}</h4></br>
              <h4>Updated Investigations: Please Refer to Attachment Below</h4></br>
              <h4>Updated Medical Summary Report:  Please Refer to Attachment Below</h4></br>
              <h4>Medications, Allergies: ${medicationsAllergies || "-"}</h4></br>
              <h4>Is patient admitted: ${isPatientAdmitted || "-"}</h4></br>
              <h4>Specific Concern: ${specificConcern || "-"}</h4></br></br>
              `,


        attachments: [
            {
                path: `${enquiryPath1}/${files?.[0]}`,
            },
            {
                path: `${enquiryPath2}/${files2?.[0]}`,
            }
        ]

    };


    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.end(error);
        } else {
            fs.unlink(`${enquiryPath1}/${files}`, (err) => {
                if (err) {
                    res.end(err)
                }
            })
            fs.unlink(`${enquiryPath2}/${files2}`, (err) => {
                if (err) {
                    res.end(err)
                }
            })

            res.send("Your request has been sent")
        }
    });
})


module.exports = router;