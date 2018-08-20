const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* axios post call to the store comes here
 * this sets up the email that will be sent to the store,
 * letting them know someone filled out the contact form
 */
app.post('/api/store', (req, res) => {

    //output: what we want the body of our email to be
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

    // credentials for your gmail account go here ( the sender )
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lopresti.chris@gmail.com',
            pass: 'ctrock21',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // email options <{sameEmailAsAbove}>
    let mailOptions = {
        from: '"Website Contact Form" <lopresti.chris@gmail.com>',
        to: 'lopresti.chris@gmail.com',
        subject: 'Customer Question',
        text: 'You have a new message',
        html: output,
    };

    //send the email and wait for a response
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            res.send('fail');
            console.log(error)
        } else {
            res.send('success');
        }
    });
});

/* axios post call to the customer comes here
 * this sets up the email that will be sent to the customer,
 * letting them know that their contact form info was emailed to the store,
 * and they will have a response shortly
 */
app.post('/api/customer', (req, res) => {

    //output: what we want the body of our email to be
    const output = (
        `<div>
            <br/>
            <h3>We recieved your email, ${req.body.firstName}!</h3>
            <br/>
            <p>We will get back to you shortly.</p>
             <br/>
            <p>- Smoke N' Mirrors Team</p>
        </div>`
    );

    // credentials for your gmail account go here ( the sender )
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lopresti.chris@gmail.com',
            pass: 'ctrock21',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // email options <{sameEmailAsAbove}>, this time the "to" is to the email in the form
    let mailOptions = {
        from: '"Smoke N\' Mirrors" <lopresti.chris@gmail.com>',
        to: req.body.email,
        subject: 'We received your email',
        text: 'We will get back to you shortly',
        html: output,
    };

    //send the email and wait for a response
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