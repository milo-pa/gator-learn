import axios from "axios";

class TeamMembersService {
    getMemberByName(name) {
        return axios.get(`/api/team-members/${encodeURIComponent(name)}`);
    }

    getAllMembers() {
        return axios.get("/api/team-members");
    }
}

export default new TeamMembersService();
