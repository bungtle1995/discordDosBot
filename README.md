** Commands are at the bottom of README.md **
A Discord bot that uses SSH to execute distributed denial of service attack (DDOS) using the discord.js API and Node.JS.
- Requirements :
```
	Node v12.16.1
	NPM 6.13.4
	Linux-based system
```
(how to install node https://nodejs.org/en/download/package-manager/)
- Recommended : 
```
	Node v12.16.1
	NPM 6.13.4
	Ubuntu 18.04 Server
```
- Database (MongoDB)
```
	Just make an account here : https://account.mongodb.com/
	and get the URI to connect
```
- Instructions (Master Machine)
```
	* Connect to your machine
	* Install Node and NPM
	* Put the following files in any folder :
		discord.js // Our Discord Bot
		guild.js // MongoDB database Schema
		config.json // Configuration file
	* Run the following commands to set up and install the node dependancies :
		npm init -y
		npm i ssh-exec dbip ping gamedig net-scan discord.js
		(OPTIONAL) npm i pm2 -g // We will use it to run our bot 24/7
```
- Instructions (Slave Machine)
```
	* Connect to your machine
	* Install Node and NPM
	* Go to the /root directory if you are root or your home folder if you are an ordinary user (lame)
	* in the slave folder, there is three folders and one file, pour all the contents of the folders and that one file into the machine (must be /root or your whatever home folder) so we have :
		stopdos.sh
		cfbypass.js
		murder.js
		http-null.js
		proxies.txt
		ua.txt
		murder.txt
		(NOTE : ALL SHOULD BE TOGETHER, why? Because I'm a bad coder)
	* Run the following commands :
		npm i randomstring socks-proxy-agent cloudscraper
```
So since we're done, go back to the Master machine and add your Slave machine's credentials over there!
Do `nano discord.js` to edit the file, and change the following :
- If you have one slave machine
```
let Server_Logins = [
	{
		user : 'root',
		host : '192.168.1.1',
		password : 'suckmydick1'
	}
]
```
- If you have two or more than one slave machine
```
	let Server_Logins = [
		{
			user : 'root',
			host : '192.168.1.1',
			password : 'suckmydick1'
		},
		{
			user : 'root',
			host : '192.168.1.2',
			password : 'suckmydick2'
		}
	]
```
Save and let's go to configuration.
- Edit the file by `nano config.json` and edit the following :
```
	* `MONGO_DB` is your MongoDB connection link.
	* `DISCORD_TOKEN` is your Discord Bot token, get one at
		https://discord.com/developers/applications
	* `DISCORD_OWNER_ID` is your Discord ID.
		Go to Discord App, enable Developer tools, right click on your name and left click at `Copy ID` and paste that shit.
```
Done? Congratulations, your DDOS Discord bot is officially set up!
Time to break Discord's Terms of Serivce amrite?
- Run the bot by typing
```
	node discord.js
```
- Run the bot 24/7 by typing
```
	pm2 start discord.js
```
- Commands :
```
	./help // Help Menu
	./ping <IP/Hostname> // Pings IP/Hostname
	./lookup <IP/Hostname> // A whois IP lookup with coordinates and shit
	./server <IP> </PORT> // Counter Strike 1.6 Server Query
	./l7 <IP/hostname> <duration in seconds> <cf/null/murder> // DDOS attack
	./portscan <IP> // Portscan for the first 10k ports
```