const TinyURL = require('tinyurl');
const { isValidUrl, isHostnameIpExist } = require('../utils/tinyUrl');
const tinyUrlHostname = 'tinyurl.com';

module.exports = {

    async generateTinyURL(fullUrl) {
        return new Promise(async (resolve, reject) => {

            try {

                if (!isValidUrl(fullUrl)) reject('Invalid Url (HTTPS / HTTP protocols only)');

                const hostname = new URL(fullUrl).host;
                if (hostname === tinyUrlHostname) reject('Please enter full url address');

                const isUrlPointedToIp = await isHostnameIpExist(hostname);
                if (!isUrlPointedToIp) reject("The given URL don't points to a valid site");

                const tinyUrl = await TinyURL.shorten(fullUrl);
                if (tinyUrl === 'Error') reject('An error has occurred');

                resolve(tinyUrl);


            } catch (err) {

                reject(err);

            }
        });

    },

    async generateFullURL(tinyUrl) {
        return new Promise(async (resolve, reject) => {

            try {

                if (!isValidUrl(tinyUrl)) reject('Invalid Url (HTTPS / HTTP protocols only)');
                const hostname = new URL(tinyUrl).hostname;
                if (hostname !== tinyUrlHostname) reject('Please enter tiny url address');

                const fullUrl = await TinyURL.resolve(tinyUrl);
                if (fullUrl === 'Error') reject('An error has occurred');

                resolve(fullUrl);

            } catch (err) {

                reject(err);

            }
        });
    }


}