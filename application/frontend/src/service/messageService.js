import api from "./api";

class MessageService {
    getMessagesSentToUserId(id) {
        return api.get("/api/message/sent-to", {
            params: { userId: id },
            withCredentials: true,
        });
    }

    getMessagesReceivedByUserId(id) {
        return api.get("/api/message/received-by", {
            params: { userId: id },
            withCredentials: true,
        });
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
