/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Milo Pesce Ares
 * Created: 11/17/25
 * Description: Functional component for the Login Page
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit ,
    formState: { errors, submitCount },
    reset
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  const onSubmit = (data) => {
    alert(`Form submitted with data: ${JSON.stringify(data)}`);
    reset({
      email: "",
      password: ""
    })
  };

  return (
    <div className="form-page">
      <header className="form-header">
        <h1>Gator Learn Login</h1>
        <div className="underline"></div>
      </header>

      <main className="form-main">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

          {/* School Email */}
          <div className="form-row">
            <label htmlFor="school-email">SFSU Email:</label>

            <div className={`input-wrapper 
              ${submitCount > 0 && errors.email ? "input-error" : ""}`}>
              <input
                  id="school-email"
                  placeholder="example@sfsu.edu"
                  {...register("email", {
                    required: "Email is required",
                    validate: value =>
                        value.endsWith("@sfsu.edu") || "Email must end with @sfsu.edu"
                  })}
              />
            </div>
            {submitCount > 0 && errors.email && (
                    <div className="error-text desc-text">{errors.email.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="form-row">
            <label htmlFor="password">Password:</label>
            <div className={`input-wrapper password-wrapper
              ${submitCount > 0 && errors.password ? "input-error" : ""}`}>
              <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Min password length is 6 characters"
                    }
                  })}
              />
              <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {submitCount > 0 && errors.password && (
                    <div className="error-text desc-text">{errors.password.message}</div>
            )}
          </div>

          {/* Cancel/Login Buttons */}
          <div className="button-row">
            <Link className="btn btn-secondary" to="/">
              CANCEL
            </Link>
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </div>
        </form>

        {/* Sign Up */}
        <div className="helper-row">
          <p className="helper-text">Don’t have an account?</p>
            <Link className="btn btn-secondary" to="/register">
              SIGN UP
            </Link>
        </div>

        {/* Forgot Password */}
        <div className="helper-row">
          <button type="button" className="btn btn-light">
            Forgot your password?
          </button>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;