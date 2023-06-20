const cheerio = require('cheerio');
const axios = require('axios');

const URL = 'https://www.diainternacionalde.com';


const diainternacionalde = {
    URL: URL,
    getCategorizedResults: async function (url = this.URL) {
        try {
            const response = await axios.get(url);
            const html = response.data;

            const $ = cheerio.load(html);

            const sectionId = "contenido";
            const articles = $(`#${sectionId} article`);
            var foundWeek = false;

            var results = await Promise.all(articles.map(async (index, element) => {
                if (foundWeek) return null;
                const article = $(element);
                const date = article.find(".fecha").text();
                if (date == '') return null;
                const paises = article.find(".paises").text() || ' ';
                const titleElement = article.find("h3 a");
                const title = titleElement.text();
                const link = URL + titleElement.attr("href");
                const type = getType(titleElement);
                foundWeek = /semana/i.test(title);

                try {
                    const imageUrl = URL + article.find("img").attr("src");
                    // Descargar la imagen y guardarla como un Buffer
                    /*
                    const imageResponse = await axios.get(imageUrl, {
                        responseType: 'arraybuffer'
                    });
                    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
                    */

                    return { title, paises, link, date, isWeek: /semana/i.test(title), type, imageUrl };
                } catch {
                    return { title, paises, link, date, isWeek: /semana/i.test(title), type, imageUrl: null };
                }
            }));

            results = results.filter((result) => result !== null);

            const today = [];
            const tomorrow = [];
            let week;
            const afterTomorrow = [];

            let dateAnt;
            let dia = 0;

            results.forEach((event) => {
                if (dateAnt && dateAnt != event.date) {
                    dia++;
                }
                dateAnt = event.date;

                if (!event.isWeek) {
                    switch (dia) {
                        case 0:
                            today.push(event);
                            break;
                        case 1:
                            tomorrow.push(event);
                            break;
                        case 2:
                            afterTomorrow.push(event);
                            break;
                    }
                } else {
                    week = event;
                }
            });

            const categorizedResults = {
                today,
                tomorrow,
                afterTomorrow,
                week
            };

            return categorizedResults;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getCategorizedResultsWithDate: async function (mes, dia) {
        return await this.getCategorizedResults(this.URL + `/calendario/${mes}/${dia}`)
    }
}

const TIPO = Object.freeze({
    oficial: {
        nombre: "oficial",
        color: "#0258a1"
    },
    popular: {
        nombre: "popular",
        color: "#5f8b03"
    },
    raro: {
        nombre: "raro",
        color: "#520e63"
    },
    nacional: {
        nombre: "nacional",
        color: "#ce5d02"
    },
    religioso: {
        nombre: "religioso",
        color: "#850401"
    },
    no_oficial: {
        nombre: "no oficial",
        color: "#3b3b3b"
    }
})

function getType(titleElement) {
    if (titleElement.hasClass('diaOficial')) {
        return TIPO.oficial;
    } else if (titleElement.hasClass("diaPopular")) {
        return TIPO.popular;
    } else if (titleElement.hasClass("diaRaro")) {
        return TIPO.raro;
    } else if (titleElement.hasClass("diaNacional")) {
        return TIPO.nacional;
    } else if (titleElement.hasClass("celebRelig")) {
        return TIPO.religioso;
    } else {
        return TIPO.no_oficial;
    }
}

module.exports = diainternacionalde;