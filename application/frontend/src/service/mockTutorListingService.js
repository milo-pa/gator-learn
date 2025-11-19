import { MOCK_LISTINGS } from "../mock/mockListings.js";

class MockTutorListingsService {
    getAllListings() {
        return Promise.resolve({ data: MOCK_LISTINGS });
    }

    getListingById(id) {
        return Promise.resolve(MOCK_LISTINGS.find((l) => l.listingId === Number(id)));
    }

    getListingsBySubjectSubstring(str) {
        const lower = str.toLowerCase();
        const filtered = MOCK_LISTINGS.filter((l) => l.subject.subjectName.toLowerCase().includes(lower));
        return Promise.resolve({ data: filtered });
    }

    getListingsByCourseSubstring(str) {
        const lower = str.toLowerCase();
        const filtered = MOCK_LISTINGS.filter(
            (l) =>
                l.course.courseName.toLowerCase().includes(lower) || l.course.courseNumber.toLowerCase().includes(lower)
        );
        return Promise.resolve({ data: filtered });
    }

    getListingsByAccount(accountId) {
        const filtered = MOCK_LISTINGS.filter((l) => l.account.userId === Number(accountId));
        return Promise.resolve({ data: filtered });
    }
}

export const mockListingService = new MockTutorListingsService();
