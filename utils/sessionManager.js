// sessionManager.js
class SessionManager {
    saveRecord(session, email, code) {
        if (!session.myTable) {
            session.myTable = [];
        }
        session.myTable = session.myTable.filter((record) => record.email !== email);
        session.myTable.push({ email: email, code: code });
        setTimeout(() => {
            const index = session.myTable.findIndex((item) => item.email === email);
            if (index !== -1) {
                session.myTable.splice(index, 1);
            } else {
            }
        }, 30000);
    }
}

module.exports = new SessionManager();
