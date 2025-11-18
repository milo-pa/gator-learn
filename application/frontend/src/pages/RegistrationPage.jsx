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
        reset
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onBlur"
    });

    const onSubmit = (data) => {
        alert(`Form submitted with data: ${JSON.stringify(data)}`);
        reset({
            // fill this
        })
    };

    return (
        <div className="form-page">
            <header className="form-header">
                <h1>Gator Learn Registration</h1>
                <div className="underline"></div>
            </header>

            <main className="form-main">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    {/* Name */}
                    <div className={"form-row"}>
                        <label htmlFor="name">Name:</label>
                        <div className={`input-wrapper
                            ${submitCount > 0 && errors.name ? "input-error" : ""}`}>
                            <input
                                id="name"
                                {...register("name", {
                                    required: "Name is required"
                                })}
                            />
                        </div>
                    </div>

                    {/* School Email */}
                    <div className="form-row">
                        <label htmlFor="school-email">School Email:</label>
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
                    </div>

                    {/* Confirm Password */}
                    <div className="form-row">
                        <label htmlFor="password">Confirm Password:</label>
                        <div className={`input-wrapper password-wrapper
                            ${submitCount > 0 && errors.password ? "input-error" : ""}`}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Pronouns */}
                    <div className={"form-row"}>
                        <label htmlFor="name">(Opt.) Pronouns:</label>
                        <div className={`input-wrapper
                            ${submitCount > 0}`}>
                            <input id="name" />
                        </div>
                    </div>

                    {/* Profile Photo upload */}
                    <div className="form-row photo-row">
                        <label htmlFor="profile-photo">(Opt.) Photo:</label>
                        <div className="input-wrapper">
                            <input
                                type="file"
                                id="profile-photo"
                                accept="image/jpeg, image/png, image/webp"
                                {...register("photo")}
                            />
                        </div>
                        <span className="hci-text">
                            Only JPG, PNG, and WEBP images are allowed.
                        </span>
                    </div>

                    {/* Description */}
                    <div className="form-row description-row">
                        <label htmlFor="description">(Opt.) Description:</label>
                        <div className="description-wrapper input-wrapper">
                            <textarea
                                id="description"
                                rows={4}
                                {...register("description")}
                            />
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="form-row terms-row">
                        <label htmlFor="terms"></label>
                        <div className="terms-content">
                            <input
                                type="checkbox"
                                id="terms"
                                {...register("terms", {
                                    required: "You must agree to the terms and conditions",
                                })}
                            />
                            <span className="terms-text">
                                Check box to agree to{" "}
                                <button type="button" className="btn btn-light">
                                    terms and conditions
                                </button>
                            </span>
                        </div>
                    </div>

                    {/* Error Message Popups*/}
                    {submitCount > 0 && (errors.email || errors.password || errors.name) && (
                        <div className="error-popup-container">
                            {errors.name && (
                                <div className="error-popup">{errors.name.message}</div>
                            )}
                            {errors.email && (
                                <div className="error-popup">{errors.email.message}</div>
                            )}
                            {errors.password && (
                                <div className="error-popup">{errors.password.message}</div>
                            )}
                        </div>
                    )}

                    {/* Cancel/Login Buttons */}
                    <div className="button-row">
                        <button type="button" className="btn btn-secondary">
                            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                                CANCEL
                            </Link>
                        </button>
                        <button type="submit" className="btn btn-primary">
                            SIGN UP
                        </button>
                    </div>
                </form>

                {/* Login */}
                <div className="helper-row">
                    <p className="helper-text">Already have an account?</p>
                    <button type="button" className="btn btn-secondary">
                        <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
                            LOGIN
                        </Link>
                    </button>
                </div>
            </main>
        </div>
    );
}

export default RegistrationPage;