const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { readdir } = require('node:fs/promises')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({ storage: storage })

router.post('/file1/upload', upload.single('image'), async (req, res) => {
    res.send('File1 Uploaded')
})


const storages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

const uploads = multer({ storage: storages })
router.post('/file2/upload', uploads.single('img'), async (req, res) => {
    res.send('File2 Uploaded')
})


const enquirystorage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'enquiry1')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

const enquiryupload1 = multer({ storage: enquirystorage1 })
router.post('/enquiry1/upload', enquiryupload1.single('enquiry1'), async (req, res) => {
    res.send('Enquiry1 File Uploaded')
})


const enquirystorage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'enquiry2')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }

})

const enquiryupload2 = multer({ storage: enquirystorage2 })
router.post('/enquiry2/upload', enquiryupload2.single('enquiry2'), async (req, res) => {
    res.send('Enquiry2 File Uploaded')
})


module.exports = router;