/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah
 * Created: 09/29/25
 * Description: API client configuration for backend communication
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({baseURL});

export default api;
