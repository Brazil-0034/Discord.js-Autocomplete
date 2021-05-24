const Discord = require('discord.js');
const client = new Discord.Client();

//execution handler
const exec = require('child_process');

var isProcessing = false;

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', msg => {
    if (msg.content.substring(0, 2) == '!b') {
        var args = msg.content.substring(2, msg.content.length);

        if (isProcessing) {
            msg.reply("Busy");
        }
        else {

            msg.reply("Working");
            isProcessing = true;

            exec('cd gpt-2-Pytorch && python3.9 main.py --text "' + args + '" --length 175 --temperature 0.8', (err, stdout, stderr) => {
                if (err) {
                    msg.reply('there was an error ping barzle');
                    
                    isProcessing = false;
                    return;
                }

                //I've done it, I've mastered JANK
                var fill = stdout;
                fill = fill.replace('======================================== SAMPLE 1 ========================================', '');
                //they'll remember me for this masterpiece
                var lines = fill.split('\n');
                lines.splice(0, 1);
                fill = lines.join('\n');
                fill = fill.replace(/[\r\n]+/gm, '');
                msg.reply(fill);
                isProcessing = false;
            });

        }
    }
});

client.login(tkn);

