/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez 
 * Created: 11/18/25
 * Description: Component for hosting page navigation menu links.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";


function PopUpComponent({title,content,onClose}) {
    return(
        <div className="popup-backdrop">
            <div className="popup">
                {title && <h3 className="popup-title">{title}</h3>}
                <div className = "popup-body">{content}</div>
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>

            </div>
        </div>
    )
}

export default PopUpComponent;