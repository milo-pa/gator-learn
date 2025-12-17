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
}

const userAccountService = new UserAccountService();
export default userAccountService;
