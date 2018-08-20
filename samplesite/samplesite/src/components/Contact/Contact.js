import React from 'react';
import {
    Typography,
    CircularProgress,
} from '@material-ui/core';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import firebase from 'firebase/app'
import 'firebase/database';
import axios from 'axios';
import * as constants from '../../constants/constants';
import './Contact.css'

const validEmail = constants.validEmail;
const validPhoneNumber = constants.validPhoneNumber;

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
    /* lets pre fill the contact form with cached information if the user never hit submit
     * the idea is if the internet goes down, page refreshes, etc, the client will not loose
     * the info they just typed
     */
    constructor() {
        super();
        this.state = {
            firstName: localStorage.getItem('vape-shop-firstName') || '',
            lastName: localStorage.getItem('vape-shop-lastName') || '',
            number: localStorage.getItem('vape-shop-number') || '',
            email: localStorage.getItem('vape-shop-email') || '',
            subject: localStorage.getItem('vape-shop-subject') || '',
            dataPacket: {},
            warning: false,
            success: false,
            processing: false,
        };
    }

    //whenever a character is added to a contact field, the state is updated
    handleChange = value => event => {
        this.setState({
            [value]: event.target.value,
        }, () => localStorage.setItem(`vape-shop-${value}`, this.state[value]))
    };

    //determines whether or not the loading wheel is rendered
    handleProcessing = () => {
        this.setState({
            processing: !this.state.processing,
        })
    };

    /* checks to make sure the form is valid
     * 1 - first name is not an empty string, just spaces, or a number
     * 2 - IF the last name is present, last name is not an empty string, just spaces, or a number
     * 3 - IF the phone number is present, make sure its valid
     * 4 - make sure the email is valid email format, ex: test@provider.co
     * if everything is valid save the form, else issue a warning
     */
    validateForm = () => {
        const {firstName, lastName, email, subject, number} = this.state;

        if (
            /*1*/(!firstName.replace(/\s/g, '').length && !isNaN(firstName)) ||
            /*2*/ (lastName.length > 0 && !lastName.replace(/\s/g, '').length && !isNaN(lastName)) ||
            /*3*/(number.length > 0 && !validPhoneNumber.test(number)) ||
            /*4*/ !validEmail.test(email)) {
            this.setState({
                warning: true,
            });
            return;
        }
        this.saveForm();
    };

    /* attempt to save the form to our firebase DB and then send an email to the store and customer
     */
    saveForm = () => {
        const {firstName, lastName, number, email, subject, dataPacket} = this.state;
        //allow the loading wheel to render, de-rendering the submit button
        this.handleProcessing();
        //if what we have cached is not what we just saved, store it to the db
        if (
            firstName !== dataPacket.firstName
            && lastName !== dataPacket.lastName
            && number !== dataPacket.number
            && email !== dataPacket.email
            && subject !== dataPacket.subject
        ) {
            //try writing to firebase to store the form, else catch and log the error
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

                this.setState({
                    dataPacket: {
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        number: number,
                        subject: subject,
                    },
                })
            } catch (error) {
                console.log(error);
            }
        }
        //send an email letting the store know they got a question
        this.sendStoreEmail();
    };

    //let the store know they have a question: makes an axios post call to send a gmail message
    sendStoreEmail = () => {
        const {firstName, lastName, number, email, subject} = this.state;
        axios.post('/api/store', {
            firstName: firstName,
            lastName: lastName,
            number: number,
            email: email,
            subject: subject,
        }).then(response => {
            this.setState({
                success: response.data === 'success',
            }, () => {
                /*if we successfully emailed the store, email the customer and let them know
                 * that a response will come shortly from the store
                 * then clear the form
                 */
                (this.state.success && this.sendCustomerEmail());
                this.clearForm();
            })
        }).catch((error) => {
            console.log(error);
            // unable to send email, cache the form so we can try again
            this.setState({
                success: false,
            }, () => this.clearForm())
        })
    };

    //axios post call: gmail message to customer letting them know store recieved question
    sendCustomerEmail = () => {
        const {firstName, lastName, number, email, subject} = this.state;
        axios.post('/api/customer', {
            firstName: firstName,
            lastName: lastName,
            number: number,
            email: email,
            subject: subject,
        }).catch((error) => {
            console.log(error);
        })
    };

    /* successful email: clear cache/state/form
     * unsuccessful email: maintain cache/state/form so we can try submitting again
     * */
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
            //snack bar in the top right: email went through notice
            NotificationManager.success('We will get back to you shortly', 'Email sent!', 3000);
        } else {
            //snack bar in the top right: email did not go through through notice
            NotificationManager.error('Please try again', 'Email failed!', 3000);
            this.setState({
                success: false,
                warning: false,
            })
        }
        // de-render the loading wheel and re-render the submit button
        this.handleProcessing();
    };

    render() {
        const {firstName, lastName, number, email, subject, warning, processing} = this.state;

        /* the below warnings are responsible for making sure the form is correct, and if not
         * the corresponding fields will be bordered in red with warning messages
         */

        const missingFirstName = (warning && !firstName.replace(/\s/g, '').length && !isNaN(firstName));
        const firstNameWarning = (missingFirstName &&
            <label className="warning">Please enter a valid fist name</label>);
        const invalidLastName = (warning && lastName.length > 0 && !lastName.replace(/\s/g, '').length && !isNaN(lastName));
        const lastNameWarning = (invalidLastName &&
            <label className="warning">Please enter a valid last name</label>);
        const invalidPhoneNumber = (warning && number.length > 0 && !validPhoneNumber.test(number));
        const phoneNumberWarning = (invalidPhoneNumber &&
            <label className="warning">Please enter a valid phone number</label>);
        const invalidEmail = (warning && !validEmail.test(email));
        const emailWarning = (invalidEmail && <label className="warning">Please enter a valid email</label>);
        const invalidMessage = (warning && !subject.replace(/\s/g, '').length);
        const messageWarning = (invalidMessage && <label className="warning">Please enter a valid message</label>);

        return (
            <div id="contact-section">
                <Typography id="contact-header" variant="title">
                    Contact Us
                </Typography>
                <div className="container">
                    <label htmlFor="fname">First Name</label>
                    <label className="asterisk">*</label>
                    {firstNameWarning}
                    <br/>
                    <input
                        onChange={this.handleChange('firstName')}
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Your name.."
                        className={missingFirstName ? "missing-info" : "safe"}
                        value={firstName}
                    />
                    <br/>
                    <label htmlFor="lname">Last Name</label>
                    {lastNameWarning}
                    <br/>
                    <input
                        onChange={this.handleChange('lastName')}
                        type="text"
                        id="lname"
                        name="lastname"
                        placeholder="Your last name.."
                        className={invalidLastName ? "missing-info" : "safe"}
                        value={lastName}
                    />
                    <br/>
                    <label htmlFor="f_telephone">Phone Number</label>
                    {phoneNumberWarning}
                    <br/>
                    <input
                        onChange={this.handleChange('number')}
                        type="text"
                        id="f_telephone"
                        name="f_telephone"
                        placeholder="Your number.."
                        className={invalidPhoneNumber ? "missing-info" : "safe"}
                        value={number}
                    />
                    <br/>
                    <label htmlFor="email">Email</label>
                    <label className="asterisk">*</label>
                    {emailWarning}
                    <br/>
                    <input
                        onChange={this.handleChange('email')}
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Your email.."
                        className={invalidEmail ? "missing-info" : "safe"}
                        value={email}
                    />
                    <br/>
                    <label htmlFor="subject">Subject</label>
                    <label className="asterisk">*</label>
                    {messageWarning}
                    <br/>
                    <textarea
                        onChange={this.handleChange('subject')}
                        id="subject"
                        name="subject"
                        className={invalidMessage ? "missing-info" : "safe"}
                        placeholder="Write something.."
                        value={subject}/>
                </div>
                <div id="form-buttons">
                    {!processing && <button
                        id="submit"
                        onClick={this.validateForm}
                    >
                        Submit
                    </button>}
                    {processing && <CircularProgress
                        id="processing"
                        size={30}
                    />}
                </div>
                <NotificationContainer/>
            </div>
        )
    }
};

export default Contact;