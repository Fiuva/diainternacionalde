const diainternacionalde = require("../src/api");

module.exports.handler = async (event) => {
    const { path } = event;

    const split = path.split('/custom')[1].split("/")

    if (split.length >= 3) {
        const mes = split[1];
        const dia = split[2];

        const did = await diainternacionalde.getCategorizedResultsWithDate(mes, dia);

        // Lógica para la ruta /custom/:mes/:dia
        return {
            body: JSON.stringify(did),
            statusCode: 200
        };
    } else {
        // Ruta no encontrada
        return {
            body: "Error -> /.netlify/functions/custom/:mes/:dia",
            statusCode: 404
        };
    }
};