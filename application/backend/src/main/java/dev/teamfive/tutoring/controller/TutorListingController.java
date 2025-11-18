/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah H
 * Created: November 8th 2025
 * Description: This class defines the API endpoint for managing tutor listings.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
package dev.teamfive.tutoring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
     * API endpoint for retrieving a list of all TutorListings
     *
     * @return The list of all TutorListings
     */
    @GetMapping
    public List<TutorListing> getAllListings()
    {
        return repository.findAll();
    }

    /**
     * API endpoint for retrieving a list of TutorListings, each of whose properties match ALL the given search parameters.
     * <p>
     * An api call might look like {@code api/listings/search?listingDescription=calc&accountName=Alice}.
     * The key value pairs (search parameters) for this call are {@code listingDescription : calc} and {@code accountName : Alice}.
     * <p>
     * An api call can have an infinite number of search parameters, however a finite number are actually recognized.
     * Currently, the recognized parameters, as well as their corresponding fields of a TutorListing object,
     * and columns in database tables are:
     * <pre>{@code
     * ----------------------------------------------------------------------------------
     * |  Search Parameter    |  TutorListing Field     |  Database Table/Col           |
     * ----------------------------------------------------------------------------------
     * |  listingId           |  listingId              |  tutor_listing / listing_id   |
     * |  listingDescription  |  description            |  tutor_listing / description  |
     * |  accountName         |  account#name           |  user_account / name          |
     * |  subjectName         |  subject#subjectName    |  subject / subject_name       |
     * |  courseName          |  course#courseName      |  course / course_name         |
     * |  courseNumber        |  course#courseNumber    |  course / course_number       |
     * ----------------------------------------------------------------------------------
     * }</pre>
     *
     * @param params A map of search parameters, where a key is the query key of the api call, and a value is a query value.
     * @return A list of TutorListings that match the search parameters
     */
    @GetMapping("/search")
    public List<TutorListing> searchListings(@RequestParam Map<String, String> params)
    {
        boolean allBlank = params.values().stream().allMatch(value -> value == null || value.isBlank());

        if (allBlank)
        {
            return getAllListings();
        }

        Long listingId = params.containsKey("listingId") ? Long.valueOf(params.get("listingId")) : null;

        String listingDesc = params.get("listingDescription");

        String accountName = params.get("accountName");

        String subjectName = params.get("subjectName");

        String courseName = params.get("courseName");
        String courseNumber = params.get("courseNumber");

        return repository.findBySearchQueryCombination(listingId, listingDesc, accountName, subjectName, courseName, courseNumber);
    }
}