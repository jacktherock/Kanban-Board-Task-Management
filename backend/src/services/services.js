

module.exports.Response = (error, message = "", data = []) => {
    return { error, message, data };
};

