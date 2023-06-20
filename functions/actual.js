const diainternacionalde = require("../src/api")

module.exports.handler = async () => {
    const did = await diainternacionalde.getCategorizedResults();

    return {
        body: JSON.stringify(did),
        statusCode: 200
    }
}