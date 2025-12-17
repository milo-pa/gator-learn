import api from "./api";

class MessageService {
    getMessagesSentByUserId(id) {
        return api.get(`/api/message/sent-by/${id}`, { withCredentials: true });
    }

    getMessagesReceivedByUserId(id) {
        return api.get(`/api/message/received-by/${id}`, { withCredentials: true });
    }

    createMessage(data) {
        return api.post("/api/message/create", data, { withCredentials: true });
    }

    // TODO: correct syntax?
    deleteMessage(id) {
        return api.delete("/api/message/delete", { id }, { withCredentials: true });
    }
}

const messageService = new MessageService();
export default messageService;
