/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Milo Pesce Ares
 * Created: 11/17/25
 * Description: This is the login page. nuff said
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <header className="login-header">
          <h1>Gator Learn Login</h1>
          <div className="underline"></div>
        </header>

        <main className="login-main">
          <form className="login-form">
            {/* School Email */}
            <div className="form-row">
              <label htmlFor="school-email">School Email:</label>
              <div className="input-wrapper with-suffix">
                <input id="school-email" type="email" />
                <span className="email-suffix">@sfsu.edu</span>
              </div>
            </div>
            {/* Password */}
            <div className="form-row">
              <label htmlFor="password">Password:</label>
              <div className="input-wrapper">
                <input id="password" type="password" />
              </div>
            </div>

            {/* Buttons */}
            <div className="button-row">
              <button type="button" className="btn btn-secondary">
                CANCEL
              </button>
              <button type="submit" className="btn btn-primary">
                LOGIN
              </button>
            </div>

            {/* Forgot Password */}
            <div className="helper-row">
              <p className="helper-text">Forgot your password?</p>
              <button type="button" className="btn btn-light">
                Click here
              </button>
            </div>

            {/* Sign Up */}
            <div className="helper-row">
              <p className="helper-text">Don’t have an account?</p>
              <button type="button" className="btn btn-secondary">
                SIGN UP
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default LoginPage;