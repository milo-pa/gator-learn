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
