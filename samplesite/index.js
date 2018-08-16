const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/form', (req, res) => {

    const output = (
        `<div>
            <br/>
            <h3>Contact Information</h3>
            <ul>
                <li>First name: ${req.body.firstName}</li>
                <li>Last name: ${req.body.lastName}</li>
                <li>Phone number: ${req.body.number}</li>
                <li>Email address: ${req.body.email}</li>
            </ul>
            <br/>
            <p>${req.body.subject}</p>
        </div>`
    );


    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'YOUR INFO',
            pass: 'YOUR INFO',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Website Contact Form" <lopresti.chris@gmail.com>',
        to: 'YOUR INFO',
        subject: 'Customer Question',
        text: 'You have a new message',
        html: output,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            res.send('fail');
            console.log(error)
        } else {
            res.send('success');
        }
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});