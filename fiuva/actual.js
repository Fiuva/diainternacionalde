const diainternacionalde = require("../src/api")

module.exports.handler = async () => {
    const did = await diainternacionalde.getCategorizedResults();

    return {
        body: did,
        statusCode: 200
    }
}