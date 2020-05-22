import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isAlpha } from "validator";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from "../services/auth.service";


let originalPassword = '';
let imageChanged = false;

const buttonStyle = {
    border: "none",
    padding: 0,
    color: "#069",
    cursor: "pointer",
    background: "none",
    width: "85px",
    fontSize: "19px",
  }

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

const UserUpdateForm = (props) => {
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [image, setImage] = useState(props.image);
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
        imageChanged = true;
    }

    const handleCloseWindow = (e) => {
        props.onChangeEditStatus();
    }

    const handleUpdate = (e) => {
        e.preventDefault();

        setMessage('');
        setLoading(true);

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.update(email, password, firstName, lastName, image)
                .then(
                    response => {
                        setMessage(response.data.message);
                        setSuccessful(true);
                        setLoading(false);
                        let updatedInfo = {email, firstName, lastName, 
                            username: props.currentUser.username,
                            image_path: image, roles: AuthService.getCurrentUser().roles};
                        if (imageChanged) {
                            updatedInfo['image_path'] = response.data.user.image_path;
                        }
                        props.setCurrentUser(updatedInfo);
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
        <div className="col-md-8" style={{marginLeft:"12rem"}}>
            <div className="card card-container">
                <div style={{display:"flex", flexDirection: "row"}}>
                    <img
                        src={props.currentUser.image_path ? process.env.PUBLIC_URL + "/users-profile-pics/" + props.currentUser.image_path : "//ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                        alt="profile-img"
                        className="profile-img-card"
                        style={{height: "400px", width: "400px", marginLeft:"150px"}}
                    />
                    <span style={{marginLeft: "4.4rem", marginTop:"0.3rem"}}>
                        <button style={buttonStyle} onClick={handleCloseWindow}>
                            <FontAwesomeIcon icon={faWindowClose} style={{ marginRight: "0.5rem" }} />
                                Close
                        </button>
                    </span>
                </div>
                

                <Form
                    onSubmit={handleUpdate}
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
                            validations={password ? [required, validatePassword] : []}
                            placeholder="Enter New Password"
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
                            readOnly={password ? false : true}
                            validations={password ? [required, validateConfirmPassword] : []}
                            placeholder="Retype New Password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Profile Photo</label>
                        <Input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={onChangeImage}
                            validations={imageChanged ? [validateImage] : []}
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
                            <span>Update</span>
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

export default UserUpdateForm;