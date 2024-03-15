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
            console.log(index);
            if (index !== -1) {
                console.log(session.myTable);
                session.myTable.splice(index, 1);
                console.log("Đã xóa hàng thành công.",session.myTable);
            } else {
                console.log("Không tìm thấy hàng để xóa.");
            }
        }, 30000);
    }
}

module.exports = new SessionManager();
