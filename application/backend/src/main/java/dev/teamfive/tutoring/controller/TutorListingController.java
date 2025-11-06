package dev.teamfive.tutoring.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.teamfive.tutoring.model.TutorListing;
import dev.teamfive.tutoring.repository.TutorListingRepository;

@RestController
@RequestMapping("api/listings")
public class TutorListingController
{
    private final TutorListingRepository repository;

    public TutorListingController(TutorListingRepository repository)
    {
        this.repository = repository;
    }

    @GetMapping
    public List<TutorListing> getAllListings()
    {
        return repository.findAll();
    }

    @GetMapping("/by-course/{course}")
    public List<TutorListing> getListingsByCourse(@PathVariable String course)
    {
        return repository.findByCourseContaining(course);
    }

    @GetMapping("/by-subject/{subject}")
    public List<TutorListing> getListingsBySubject(@PathVariable String subject)
    {
        return repository.findBySubjectContaining(subject);
    }
}