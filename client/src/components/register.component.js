import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isAlpha } from "validator";

import AuthService from "../services/auth.service";


let originalPassword = '';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validateFirstname = value => {
    if (value.length < 3 || value.length > 20 || !isAlpha(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                The First Name must be between 3 and 20 alphabetical characters.
            </div>
        );
    }
};

const validateLastname = value => {
    if (value.length < 3 || value.length > 20 || !isAlpha(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                The Last Name must be between 3 and 20 alphabetical characters.
            </div>
        );
    }
};

const validateEmail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const validateUsername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const validatePassword = value => {
    if (value.length < 8 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be at least 8 characters.
            </div>
        );
    }
};

const validateConfirmPassword = (value) => {
    if (value.length < 8 || value.length > 40 || value !== originalPassword) {
        return (
            <div className="alert alert-danger" role="alert">
                The password does not match.
            </div>
        );
    }
};

const validateImage = value => {
    if (!value.match(/\.(jpg|jpeg|png)$/)) {
        return (
            <div className="alert alert-danger" role="alert">
                Please Upload a valid image. Supported extensions: jpg, jpeg, png.
            </div>
        );
    }
}

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);
    const checkBtn = useRef(null);
    const form = useRef(null);

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const onChangeUsername = (e) => {
        setUserName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        originalPassword = e.target.value;
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPass(e.target.value);
    }

    const onChangeImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.register(username, email, password, firstName, lastName, image)
                .then(
                    response => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                        setLoading(false);
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        setLoading(false);
                        setMessage(resMessage);
                        setSuccessful(false);
                    }
                )
        } else {
            setLoading(false);
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleRegister}
                    ref={form}
                    encType="multipart/form-data"
                >

                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="firstname"
                            value={firstName}
                            onChange={onChangeFirstName}
                            validations={[required, validateFirstname]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="lastname"
                            value={lastName}
                            onChange={onChangeLastName}
                            validations={[required, validateLastname]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, validateUsername]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validateEmail]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, validatePassword]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Retype Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="confirm-password"
                            value={confirmPass}
                            onChange={onChangeConfirmPassword}
                            validations={[required, validateConfirmPassword]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Profile Photo</label>
                        <Input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={onChangeImage}
                            validations={[validateImage]}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={loading}
                        >
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Sign Up</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={checkBtn}
                    />
                </Form>
            </div>
        </div>
    );
}

export default Register;