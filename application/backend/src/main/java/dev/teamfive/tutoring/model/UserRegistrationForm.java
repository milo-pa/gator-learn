package dev.teamfive.tutoring.model;

import org.springframework.web.multipart.MultipartFile;

public class UserRegistrationForm
{
    private String name;

    private String email;

    private String password;

    private MultipartFile photoFile;

    private String description;

    private String pronouns;

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public MultipartFile getPhotoFile()
    {
        return photoFile;
    }

    public void setPhotoFile(MultipartFile photoFile)
    {
        this.photoFile = photoFile;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getPronouns()
    {
        return pronouns;
    }

    public void setPronouns(String pronouns)
    {
        this.pronouns = pronouns;
    }
}

