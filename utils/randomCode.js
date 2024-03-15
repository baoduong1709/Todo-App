exports.randomCode = (length, type) => {
    var code = "";
    if (type === "integer") {
        var characters = "0123456789";
    } else {
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }
    for (var i = 0; i < length; i++) {
        code += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return code;
};