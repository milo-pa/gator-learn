/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Jonah H
 * Created: November 8th 2025
 * Description: An interface defining ways to interact with TutorListing entities from the `tutor_listing` database table.
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
package dev.tutoring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import dev.tutoring.model.TutorListing;

import java.util.List;

/**
 * An interface defining ways to interact with TutorListing entities from the `tutor_listing` database table.
 */
@Repository
public interface TutorListingRepository extends JpaRepository<TutorListing, Long>
{
    @Query(TutorListingSearchQuery.QUERY)
    List<TutorListing> findBySearchQueryCombination(
            @Param("listingId") Long listingId,
            @Param("listingDescSubstring") String listingDescSubstring,
            @Param("accountNameSubstring") String accountNameSubstring,
            @Param("accountId") String accountId,
            @Param("subjectNameSubstring") String subjectNameSubstring,
            @Param("courseNameSubstring") String courseNameSubstring,
            @Param("courseNumberSubstring") String courseNumberSubstring);
}