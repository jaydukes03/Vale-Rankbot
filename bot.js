// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NjI4MzA1OTE0MDg0MDY1MzMw.XZJbLQ.vgNLSuhel-14XsCcC1mtBoM6nyY";

client.login(token)
 
var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_AA3D818D74CFDAF6AFCDDA8902C97FF1A228337DEA19ECD37DC016655249380DB606E923A7993F18B67E03CB486DD4670D28D3920482F1B3D40FA917D21C3F0BA9CC5DD2A98D8C63B8FB0B624B8C42563AFD93EB1E069D8BC7EF5D4261C55F1982B5E2B111B55DC2FBB6AD91E3D657D36F2C15FD20E2AF93A2D77EB7D06B5FA701FA991D80037B1633545B28D018C76C5E1296409EA4BE711C95D734A8B913BC2E449D982E846C98D40EFCA7737A683175A9E323823C6F3D63EB7B6AB6C8CF84D3B2D817A831A70704FF3B27F5EE66C4A7CA49299130579AD6521D7E64FAE34F0C8BA7FF562473F77E6C0439890D37F832A1272ABCE1242BF9758D65D3C4347520B0E3FC25F53CF2B3C238C2B784DA4324C7CAD7437F8CBE0E5442D0FB88E16DEA0B98C4";
var prefix = ';';
var groupId = 2997840;
var maximumRank = 17;

function login() {
    return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["Ranking Bot Perms"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})
