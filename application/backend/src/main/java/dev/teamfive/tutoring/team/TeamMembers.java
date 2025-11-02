package dev.teamfive.tutoring.team;

import java.util.ArrayList;
import java.util.List;
import dev.teamfive.tutoring.team.TeamMember.Link;

public class TeamMembers
{
    private List<TeamMember> members = new ArrayList<>();

    public TeamMembers()
    {
        this.members = new ArrayList<>();
        members.add(new TeamMember(
            "Milo",
             "/images/team/milo.webp",
             "Team Lead",
             "I'm a 5th year Computer Science student at San Francisco State University. My professional interests are in full stack development and cybersecurity and I look forward to graduating and moving into industry. ",
             List.of(
                 new Link("GitHub", "https://github.com/milo-pa"),
                 new Link("LinkedIn", "https://www.linkedin.com/in/milo-pa/")
             )));
        members.add(new TeamMember(
            "Sam",
             "/images/team/sam.webp",
             "Github Lead",
             "I’m a senior at San Francisco State University, studying Computer Science. I’m excited to keep learning, building projects, and preparing for my career after graduation",
             List.of(
                 new Link("GitHub", "https://github.com/smunthe"),
                 new Link("LinkedIn", "https://www.linkedin.com/in/samantha-chombo-rodriguez/")
             )));
        members.add(new TeamMember(
            "Enrique", 
            "/images/team/enrique.webp",
            "Frontend Lead",
            "A college student aspiring to make connections and obtain experience in the Computer Science and Information Technology field, while teaching basic internet safety and refurbishing PCs on the side.",
            List.of(
                new Link("LinkedIn", "https://www.linkedin.com/in/enliganor/")
            )));
        members.add(new TeamMember(
            "Jonah",
            "/images/team/jonah.webp",
            "Backend Lead",
            "Hi, I'm Jonah, a senior CS student at SFSU. I spend a lot of free time working on game development projects, and hope to secure a software engineering job of any type.",
            List.of(
                new Link("GitHub", "https://github.com/jonuuh")
            )));
        members.add(new TeamMember(
            "Hill",
            "/images/team/hill.webp",
            "Support",
            "I’m Hill, a senior Computer Science student at SFSU. I’m aiming for a software engineering role and actively learning more about AI and cybersecurity. I’m excited to collaborate and turn solid specs into working features.",
            List.of(
                new Link("LinkedIn", "https://www.linkedin.com/in/hill-kalathiya-2bb0a7297/")
            )));
    }

    public List<TeamMember> getMembers()
    {
        return members;
    }
}
