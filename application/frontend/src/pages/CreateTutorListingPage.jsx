/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez
 * Created: 11/16/25
 * Description: 
 * Page component for the About Page, displaying information about Team 5 members.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import TutorListingForm from "../component/TutorListingForm";


class CreateTutorListingPage extends Component {
    render () {
        return (
            <main className="create-listing-page">
                <h1>Create Tutor Listing</h1>
                <TutorListingForm/>
            </main>
        );
    }
}

export default CreateTutorListingPage;