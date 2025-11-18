/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Enrique Liganor
 * Created: 11/08/25
 * Description:
 * Home Page functional component routed to default.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from "react";
import "../HomePage.css";

export default function HomePage() {
    return (
        <div className="home-hero">
            <img src="/images/HomePage/CoolGator.webp" alt="Gator mascot" className="hero-image"/>

            <div className="hero-text">
                <h1>Studying for Gators by Gators!</h1>
                <p>
                    Peer tutoring made easy by SF State students, for SF State students.
                    Get the help you need from classmates who’ve been there, here at Gator
                    Learn.
                </p>
                <p>
                    Ready to learn? Use the search bar to start your search for tutors
                    that teach your subject!
                </p>
            </div>
        </div>
    );
}