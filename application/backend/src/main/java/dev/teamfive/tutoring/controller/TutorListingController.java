package dev.teamfive.tutoring.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.teamfive.tutoring.model.TutorListing;
import dev.teamfive.tutoring.repository.TutorListingRepository;

/**
 * This class defines the API endpoint for managing tutor listings.
 * <p>
 * Currently, it only has GET endpoints, which when accessed externally will return json data:
 * TutorListing object(s) serialized by Jackson library
 */
@RestController
@RequestMapping("api/listings")
public class TutorListingController
{
    private final TutorListingRepository repository;

    public TutorListingController(TutorListingRepository repository)
    {
        this.repository = repository;
    }

    /**
     * API endpoint for retrieving a list of TutorListings
     *
     * @return The list of TutorListings
     */
    @GetMapping
    public List<TutorListing> getAllListings()
    {
        return repository.findAll();
    }

    /**
     * API endpoint for retrieving a TutorListing by listing id
     *
     * @param id An id
     * @return A TutorListing whose listingId matches the given id
     */
    @GetMapping("/{id}")
    public TutorListing getListingById(@PathVariable Long id)
    {
        return repository.findById(id).orElse(null);
    }

    /**
     * API endpoint for retrieving a list of TutorListings whose course name contains a string
     *
     * @param str A string
     * @return A list of TutorListings whose course name contains the given string
     */
    @GetMapping("/by-course/{str}")
    public List<TutorListing> getListingsByCourse(@PathVariable String str)
    {
        return repository.findByCourseContaining(str);
    }

    /**
     * API endpoint for retrieving a list of TutorListings whose subject name contains a string
     *
     * @param str A string
     * @return A list of TutorListings whose subject name contains the given string
     */
    @GetMapping("/by-subject/{str}")
    public List<TutorListing> getListingsBySubject(@PathVariable String str)
    {
        return repository.findBySubjectContaining(str);
    }
}