const dns = require('dns');
const dnsPromises = dns.promises; 
module.exports = {

    isValidUrl(str) {
        try {
            
            return Boolean(new URL(str));
        }
        catch (err) {

            return false;

        }
    },
    async isHostnameIpExist(hostname){

        try{

            return Boolean(await dnsPromises.lookup(hostname));
        
        }catch(err){

            return false;

        }

    }
    
}