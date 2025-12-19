import api from "./api";

class UserAccountService {
  register(data) {
    return api.post("/api/user/register", data);
  }

  login(data) {
    return api.post("/api/user/login", data, { withCredentials: true });
  }

  me() {
    return api.get("/api/user/me", { withCredentials: true });
  }

  logout() {
    return api.post("/api/user/logout", {}, { withCredentials: true });
  }

  /**
   * Upload a tutor photo file
   * @param {File} file - The photo file to upload
   * @returns {Promise} Promise that resolves with the file path
   */
  uploadPhoto(file) {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/api/upload/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
  }
}

const userAccountService = new UserAccountService();
export default userAccountService;
