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
