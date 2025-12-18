package dev.teamfive.tutoring.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService
{
    private final Path root = Paths.get("/var/www/tutoringapp/uploads");
    private final Path resumes = root.resolve("resumes");
    private final Path tutorphotos = root.resolve("tutor-photos");
    private final Path videos = root.resolve("videos");

    public String store(MultipartFile file, String user) throws IOException
    {
        if (file == null || file.isEmpty())
        {
            return null;
        }

        Path path = root;

        String filename = file.getOriginalFilename();
        String type = filename.substring(filename.lastIndexOf('.') + 1);

        if (type.equals("png") || type.equals("jpg") || type.equals("jpeg"))
        {
            path = tutorphotos;
            filename = user + "-pfp." + type;
        }
        if (type.equals("pdf") || type.equals("cv"))
        {
            path = resumes;
            filename = user + "-resume." + type;
        }
        if (type.equals("mp4"))
        {
            path = videos;
            filename = user + "-video." + type;
        }

        Path target = path.resolve(filename);

        System.out.println("TARGET PATH:" + target);

        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        return target.toString(); // store this location in db
    }
}

