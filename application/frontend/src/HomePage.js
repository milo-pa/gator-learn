import React, { Component } from "react";
import "./HomePage.css";

export default function HomePage() {
    return (
        <div className="home-hero">
            <img
                src="/images/HomePage/CoolGator.webp"
                alt="Gator mascot"
                className="hero-image"
            />

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