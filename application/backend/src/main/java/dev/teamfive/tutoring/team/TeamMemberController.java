package dev.teamfive.tutoring.team;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/team-members")
public class TeamMemberController
{
    private static final TeamMembers teamMembers = new TeamMembers();

    @GetMapping
    public TeamMembers getAll()
    {
        return teamMembers;
    }

    @GetMapping("/{name}")
    public TeamMember getByName(@PathVariable String name)
    {
        return teamMembers.getMembers().stream()
                .filter(member -> member.getName().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
    }
}