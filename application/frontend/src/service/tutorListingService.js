/*
 * Institution: San Francisco State University
 * Class: CSC 648 Project, Team 05
 * Project: Gator Learn, Tutoring Website
 * Author: Samantha Chombo-Rodriguez
 * Created: 11/08/25
 * Description: Service for fetching tutor listings from the backend API
 *
 * Copyright (c) 2025 San Francisco State University Team 05
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import api from "./api";

class TutorListingService {
    getAllListings() {
        return api.get("/api/listings");
    }

    async getListingById(id) {
        const res = await api.get("/api/listings/search", {
            params: { listingId: id },
        });
        return res.data[0];;
    }

    getListingsBySubjectSubstring(str) {
        return api.get("/api/listings/search", {
            params: { subjectName: str },
        });
    }

    getListingsByCourseSubstring(str) {
        return api.get("/api/listings/search", {
            params: {
                courseName: str,
                courseNumber: str,
            },
        });
    }

    searchListings(params) {
        return api.get("/api/listings/search", { params });
    }
}
const tutorListingService = new TutorListingService();
export default tutorListingService;
