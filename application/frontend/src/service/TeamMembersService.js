import axios from "axios";

class TeamMembersService {
    getMemberByName(name) {
        // This url assumes that the backend is running on http://18.144.101.99
        return axios.get(`http://18.144.101.99/api/team-members/${encodeURIComponent(name)}`);
    }

    getAllMembers() {
        // This url assumes that the backend is running on http://18.144.101.99
        return axios.get("http://18.144.101.99/api/team-members");
    }
}

export default new TeamMembersService();
