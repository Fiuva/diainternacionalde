module.exports.handler = async (event) => {
    const { path, params } = event;
    console.log(event);

    if (path === "/custom/:mes/:dia") {
        const { mes, dia } = params;
        // L�gica para la ruta /custom/:mes/:dia
        return {
            body: `Custom Function - Mes: ${mes}, D�a: ${dia}`,
            statusCode: 200
        };
    } else {
        // Ruta no encontrada
        return {
            body: "Not Found",
            statusCode: 404
        };
    }
};