import api from './api';

class TutorListingService {
    getListings() {
        return api.get("/api/listings");
    }

    getListingsByCourseSubstring(str) {
        return api.get(`/api/listings/by-course/${str}`);
    }

    getListingsBySubjectSubstring(str) {
        return api.get(`/api/listings/by-subject/${str}`);
    }
}

export default new TutorListingService();