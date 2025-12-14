/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Milo Pesce Ares
 * Created: 11/17/25
 * Description: Functional Component for Registration page
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {Component, useState} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit ,
    formState: { errors, submitCount },
    reset,
    watch
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  const passwordValue = watch("password");

  const onSubmit = (data) => {
    alert(`Form submitted with data: ${JSON.stringify(data)}`);
    reset({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      pronouns: "",
      photo: null,
      description: "",
      terms: false,
    })
  };

  return (
    <div className="form-page registration-page">
      <header className="form-header">
        <h1>Gator Learn Registration</h1>
        <div className="underline"></div>
      </header>

      <main className="form-main">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-row">
            <label htmlFor="name" className="required-label">Name:</label>
            <div className={`input-wrapper
              ${submitCount > 0 && errors.name ? "input-error" : ""}`}>
              <input
                id="name"
                placeholder="John Doe"
                {...register("name", {
                  required: "Name is required"
                })}
              />
            </div>
            {submitCount > 0 && errors.name &&
                    (<div className="error-text desc-text">{errors.name.message}</div>)
            }
          </div>

          {/* School Email */}
          <div className="form-row">
            <label htmlFor="school-email" className="required-label">SFSU Email:</label>
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
            {submitCount > 0 && errors.email &&
                    (<div className="error-text desc-text">{errors.email.message}</div>)
            }
          </div>

          {/* Password */}
          <div className="form-row">
            <label htmlFor="password" className="required-label">Password:</label>
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
            {submitCount > 0 && errors.password &&
                    (<div className="error-text desc-text">{errors.password.message}</div>)
            }
          </div>

          {/* Confirm Password */}
          <div className="form-row">
            <label htmlFor="confirm-password" className="required-label">Confirm Password:</label>
            <div
              className={`input-wrapper password-wrapper
                ${submitCount > 0 && errors.confirmPassword ? "input-error" : ""}`}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="confirm-password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                          value === passwordValue || "Passwords do not match",
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
            {submitCount > 0 && errors.confirmPassword &&
                    (<div className="error-text desc-text">{errors.confirmPassword.message}</div>)
            }
          </div>

          {/* Pronouns */}
          <div className={"form-row"}>
            <label htmlFor="name">Pronouns:</label>
            <div className={"input-wrapper small-input-wrapper"}>
              <input
                      id="name"
                      placeholder="She/Her"
              />
            </div>
            <div style={{ width: "195px" }}></div>
          </div>

          {/* Profile Photo upload */}
          <div className="form-row">
            <label htmlFor="profile-photo">Photo:</label>
            <div className={"input-wrapper"}>
              <input
                type="file"
                id="profile-photo"
                accept="image/jpeg, image/png, image/webp"
                {...register("photo")}
              />
            </div>
            <span className="hci-text desc-text">
                      Allows JPG, PNG, and WEBP
            </span>
          </div>

          {/* Description */}
          <div className="form-row description-area">
            <label htmlFor="description">Description:</label>
            <div className="input-wrapper textarea-wrapper">
              <textarea
                id="description"
                rows="5"
                {...register("description")}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="form-row">
            <div className="terms-box-container required-label">
              <input
                      className="terms-input"
                      type="checkbox"
                      id="terms"
                      {...register("terms", {
                        required: "You must agree to the terms and conditions",
                      })}
              />
            </div>
            <div className="terms-content">
              <span className="terms-text">
                Check box to agree to{" "}
                <button type="button" className="btn btn-light">
                    terms and conditions
                </button>
              </span>
            </div>
            {submitCount > 0 && errors.terms && (<div className="error-text desc-text">{errors.terms.message}</div>)}
          </div>

          {/* Cancel/Sign up Buttons */}
          <div className="button-row">
            <Link className="btn btn-secondary" to="/">
              CANCEL
            </Link>
            <button type="submit" className="btn btn-primary">
              SIGN UP
            </button>
          </div>
        </form>

        {/* Login */}
        <div className="helper-row">
          <p className="helper-text">Already have an account?</p>
            <Link className="btn btn-secondary" to="/login">
              LOGIN
            </Link>
        </div>
      </main>
    </div>
  );
}

export default RegistrationPage;