//main.js

const {prefix, token } = require('./config.json')

const Discord = require('discord.js');
const client = new Discord.Client();


client.once('ready', () => {
    console.log('Ready!');
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();


    if (command === 'args-info'){
        if (!args.length){
            return message.channel.send(`You didn't provide and arguments, ${message.author}`)
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar')
        }

        message.channel.send(`Command name:${command} \nArguments: ${args} \nArgument length: ${args.length}`)
    }
    else if (command === 'kick') {
        if (!message.mentions.users.size)
            return message.reply('You need to tag a user in order to kick them!')

        const taggedUser =  message.mentions.users.first();
        message.channel.send(`you wanted to kick : ${taggedUser.username}`)
    }
    else if (command === 'whisper') {
        if (!message.mentions.users.size){
            // return message.reply('No user mentioned.')

        }else{
            const m = message
            message.delete()
            .then( msg => console.log(`Deleted message`))
            .catch(console.error)
            
            const taggedUser = m.mentions.users.first();       
            taggedUser.send(`${args}`)
        }
    }
    else {
        console.log(message.content)
    }
})

client.login(token)