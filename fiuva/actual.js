const diainternacionalde = require("../src/api")

module.exports.handler = async () => {
    const did = diainternacionalde.getCategorizedResults();

    return {
        body: did,
        statusCode: 200
    }
}