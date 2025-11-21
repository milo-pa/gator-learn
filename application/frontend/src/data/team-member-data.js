/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah
 * Created: 11/17/2025
 * Description: Data file containing static information on team members, used for the About Page.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const teamMembers = [
    {
        name: "Milo",
        imagePath: "/images/team/milo.webp",
        title: "Team Lead",
        bio: "I'm a 5th year Computer Science student at San Francisco State University. My professional interests are in full stack development and cybersecurity and I look forward to graduating and moving into industry.",
        links: [
            { label: "GitHub", href: "https://github.com/milo-pa" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/milo-pa/" }
        ]
    },
    {
        name: "Sam",
        imagePath: "/images/team/sam.webp",
        title: "Support",
        bio: "I'm a senior at San Francisco State University, studying Computer Science. I'm excited to keep learning, building projects, and preparing for my career after graduation",
        links: [
            { label: "GitHub", href: "https://github.com/smunthe" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/samantha-chombo-rodriguez/" }
        ]
    },
    {
        name: "Enrique",
        imagePath: "/images/team/enrique.webp",
        title: "Frontend Lead",
        bio: "A college student aspiring to make connections and obtain experience in the Computer Science and Information Technology field, while teaching basic internet safety and refurbishing PCs on the side.",
        links: [
            { label: "LinkedIn", href: "https://www.linkedin.com/in/enliganor/" }
        ]
    },
    {
        name: "Jonah",
        imagePath: "/images/team/jonah.webp",
        title: "Backend Lead",
        bio: "Hi, I'm Jonah, a senior CS student at SFSU. I spend a lot of free time working on game development projects, and hope to secure a software engineering job of any type.",
        links: [
            { label: "GitHub", href: "https://github.com/jonuuh" }
        ]
    },
    {
        name: "Hill",
        imagePath: "/images/team/hill.webp",
        title: "GitHub Lead",
        bio: "I'm Hill, a senior Computer Science student at SFSU. I'm aiming for a software engineering role and actively learning more about AI and cybersecurity. I'm excited to collaborate and turn solid specs into working features.",
        links: [
            { label: "LinkedIn", href: "https://www.linkedin.com/in/hill-kalathiya-2bb0a7297/" }
        ]
    }
];

export default teamMembers;
