const { generateTinyURL, generateFullURL } = require('../services/tinyUrl');

module.exports = {

    async getFullToTiny(req, res) {

        const fullUrl = req.body.url;

        try {

            const tinyUrl = await generateTinyURL(fullUrl);

            res.status(200).send({ tinyUrl });

        }
        catch (err) {

            console.log(err)
            res.status(500).send(err);

        }

    },
    async getTinyToFull(req, res) {

        const tinyUrl = req.body.url;

        try {

            const fullUrl = await generateFullURL(tinyUrl);
  
            res.status(200).send({ fullUrl });

        }
        catch (err) {

            console.log(err)
            res.status(500).send(err);
            
        }
    }

}