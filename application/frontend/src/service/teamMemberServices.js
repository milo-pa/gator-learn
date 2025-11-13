/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah 
 * Created: 09/29/25
 * Description: Service for fetching team member data from the backend API
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import api from './api';

class TeamMembersService {
    getMemberByName(name) {
        return api.get(`/api/team-members/${encodeURIComponent(name)}`);
    }

    getAllMembers() {
        return api.get("/api/team-members");
    }
}


const teamMembersService = new TeamMembersService();

export default teamMembersService;
