import React from 'react';
import {
    Typography,
    Button,
} from '@material-ui/core';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import firebase from 'firebase/app'
import 'firebase/database';
import axios from 'axios';
import * as constants from '../../constants/constants';
import './Contact.css'

const config = {
    apiKey: "AIzaSyBEIaW4yTdJKTJM5rU1AMAAubGudF89U7Q",
    authDomain: "samplesite-31721.firebaseapp.com",
    databaseURL: "https://samplesite-31721.firebaseio.com",
    projectId: "samplesite-31721",
    storageBucket: "samplesite-31721.appspot.com",
    messagingSenderId: "1055366073256"
};
firebase.initializeApp(config);

class Contact extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: localStorage.getItem('vape-shop-firstName') || '',
            lastName: localStorage.getItem('vape-shop-lastName') || '',
            number: localStorage.getItem('vape-shop-number') || '',
            email: localStorage.getItem('vape-shop-email') || '',
            subject: localStorage.getItem('vape-shop-subject') || '',
            warning: false,
            success: false,
        };
    }

    handleChange = value => event => {
        this.setState({
            [value]: event.target.value,
        }, () => localStorage.setItem(`vape-shop-${value}`, this.state[value]))
    };

    validateForm = () => {

        const {firstName, email, subject} = this.state;

        if (firstName === '') {
            document.getElementById('fname').classList.add("missing-info");
        }
        if (email === '' || !constants.re.test(email)) {
            document.getElementById('email').classList.add("missing-info");
        }
        if (subject === '') {
            document.getElementById('subject').classList.add("missing-info");
        }

        if (firstName === '' || email === '' || !constants.re.test(email) || subject === '') {
            this.setState({
                warning: true,
            });
            return;
        }

        this.saveForm();

    };

    saveForm = () => {

        const {firstName, lastName, number, email, subject} = this.state;

        try {
            const emailContent = firebase.database().ref('emails');
            let newEmailContent = emailContent.push();
            newEmailContent.set({
                firstName: firstName,
                lastName: lastName,
                number: number,
                email: email,
                subject: subject,
            });
        } catch (error) {
            console.log(error);
        }

        axios.post('/api/form', {
            firstName: firstName,
            lastName: lastName,
            number: number,
            email: email,
            subject: subject,
        }).then(response => {
            console.log(response.data)
            console.log(response.data === 'success')
            this.setState({
                success: response.data === 'success',
            }, () => this.clearForm())
        })
    };

    clearForm = () => {

        if (this.state.success) {
            this.setState({
                firstName: '',
                lastName: '',
                number: '',
                email: '',
                subject: '',
                warning: false,
            }, () => {
                localStorage.removeItem("vape-shop-firstName");
                localStorage.removeItem("vape-shop-lastName");
                localStorage.removeItem("vape-shop-number");
                localStorage.removeItem("vape-shop-email");
                localStorage.removeItem("vape-shop-subject");
            });

            document.getElementById('fname').classList.remove("missing-info");
            document.getElementById('email').classList.remove("missing-info");
            document.getElementById('subject').classList.remove("missing-info");
            NotificationManager.success('We will get back to you shortly', 'Email sent!', 3000);
        } else {
            NotificationManager.error('Please try again', 'Email failed!', 3000);
            this.setState({
                success: false,
                warning: false,
            })
        }
    };

    render() {
        const {firstName, lastName, number, email, subject, warning} = this.state;
        return (
            <div id="#contact-section">
                <Typography id="contact-header" variant="title">
                    Contact Us
                </Typography>
                <div className="container">
                    <label htmlFor="fname">First Name</label>
                    <label className="asterisk">*</label>
                    {(warning && firstName === '') && <label className="warning">Please enter a fist name</label>}
                    <input onChange={this.handleChange('firstName')} type="text" id="fname" name="firstname"
                           placeholder="Your name.." value={firstName}/>
                    <label htmlFor="lname">Last Name</label>
                    <input onChange={this.handleChange('lastName')} type="text" id="lname" name="lastname"
                           placeholder="Your last name.." value={lastName}/>
                    <label htmlFor="f_telephone">Phone Number</label>
                    <input onChange={this.handleChange('number')} type="text" id="f_telephone" name="f_telephone"
                           placeholder="Your number.." value={number}/>
                    <label htmlFor="email">Email</label>
                    <label className="asterisk">*</label>
                    {(warning && (!constants.re.test(email) || email === '')) &&
                    <label className="warning">Please enter a valid email</label>}
                    <input onChange={this.handleChange('email')} type="text" id="email" name="email"
                           placeholder="Your email.." value={email}/>
                    <label htmlFor="subject">Subject</label>
                    <label className="asterisk">*</label>
                    {(warning && subject === '') && <label className="warning">Please enter a message</label>}
                    <textarea onChange={this.handleChange('subject')} id="subject" name="subject"
                              placeholder="Write something.." value={subject}/>
                </div>
                <div id="form-buttons">
                    <Button id="submit" onClick={this.validateForm}>
                        Submit
                    </Button>
                </div>
                <NotificationContainer/>
            </div>
        )
    }
};

export default Contact;