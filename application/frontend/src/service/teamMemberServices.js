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
import teamMembers from "../data/team-member-data";

class TeamMembersService {
    getAllMembers() {
        return Promise.resolve({ data: { members: teamMembers } });
    }

    getMemberByName(name) {
        const decoded = decodeURIComponent(name || "");
        const found = teamMembers.find(m => m.name.toLowerCase() === decoded.toLowerCase());
        return Promise.resolve({ data: found || null });
    }
}


const teamMembersService = new TeamMembersService();

export default teamMembersService;
