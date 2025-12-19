/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez
 * Created: 12/16/2025
 * Description: sanitizing inputs from users for some security practice
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import DOMPurify from 'dompurify';

export const cleanText = (s) => (s ?? "").trim();

export const cleanFreeText = (s) => 
    DOMPurify.sanitize((s ?? "").trim(), {ALLOWED_TAGS: [], ALLOWED_ATTR: []}); 
