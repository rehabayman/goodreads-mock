import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const checkBtn = useRef(null);
  const form = useRef(null)

  const onChangeUsername = (e) => {
    setUserName(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleLogin = (e) => {
    e.preventDefault()

    setMessage('')
    setLoading(true)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {

      AuthService.login(username, password).then(() => {
        props.history.push("/profile")
        window.location.reload()
      },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false)
          setMessage(resMessage)


        }

      )
    } else {
      setLoading(false)
    }


  }


  return (
    <div className="container mt-3 w-50">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
          style={{height:"400px"}}
        />

        <Form
          onSubmit={handleLogin}
          ref={form}
        >
          <div className="form-group mt-3">
            <label htmlFor="username" className="ml-5">Username</label>
            <Input
              type="text"
              className="form-control w-75 ml-5"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="ml-5">Password</label>
            <Input
              type="password"
              className="form-control w-75 ml-5"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary btn-block w-25"
              disabled={loading}
              style={{marginLeft:"11.8rem"}}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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
export default Login