package dev.teamfive.tutoring.team;

import java.util.List;

public class TeamMember {
    private String name;
    private String imagePath;
    private String title;
    private String bio;
    private List<Link> links;

    public TeamMember(String name, String imagePath, String title, String bio, List<Link> links) {
        this.name = name;
        this.imagePath = imagePath;
        this.title = title;
        this.bio = bio;
        this.links = links;
    }

    public String getTitle() {
        return title;
    }

    public String getName() {
        return name;
    }

    public String getBio() {
        return bio;
    }

    public List<Link> getLinks() {
        return links;
    }

    public String getImagePath() {
        return imagePath;
    }

    public static class Link
    {
        private String label;
        private String href;

        public Link(String label, String href) {
            this.label = label;
            this.href = href;
        }

        public String getLabel() {
            return label;
        }

        public String getHref() {
            return href;
        }
    }
}

