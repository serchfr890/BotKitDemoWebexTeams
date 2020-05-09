/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */


module.exports = function(controller) {

    controller.hears('sample','message,direct_message', async(bot, message) => {
        await bot.reply(message, `Channel Info: ${message.reference}`);
        await bot.reply(message, `User Info: ${message.user}`);
        await  bot.startConversationWithUser(message).then(response =>  {
            console.log("response")
        })
    });

}
