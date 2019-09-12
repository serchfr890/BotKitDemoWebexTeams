/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { BotkitConversation } = require('botkit');
const request = require('request');


module.exports = function (controller) {

    const NEW_ROOM_DIALOG = 'new_room_dialog';
    const dialog = new BotkitConversation(NEW_ROOM_DIALOG, controller);
    dialog.say('I created this room so we could continue our conversation in private...');
    dialog.ask('How does that sound?', async (response, convo, bot) => {

    }, { key: 'how_it_sounds' });
    dialog.say('Ah, {{vars.how_it_sounds}}, eh?');
    dialog.say('I guess that is that.');
    controller.addDialog(dialog);

    // create a very simple dialog with 2 messages.
    let DIALOG_ID = 'my_dialog_1';
    let myDialog = new BotkitConversation(DIALOG_ID, controller);
    //myDialog.ask('¿A que grupo de webex teams lo voy a enviar?', async (answer) => { }, { key: 'groupName' });
    //myDialog.ask('Escribe el mensaje a enviar', async (answer) => { }, { key: 'messageToWebexTeams' });
    myDialog.say('Ok, un momento por favor.');
    myDialog.after(async (results, bot) => {
        const body = {

            'To': ["ticket:123"],
            'Params': ["123"],
            'TemplateNumber': 4
        }
        const options = {
            uri: 'https://axitytwiliointegrationtest.azurewebsites.net/whatnotifier/message',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        request.post(options, (error, response, body) => {
        });
    });
    myDialog.say('Gracias por la espera, la notificación ha sido enviada exitosamente.');
    controller.addDialog(myDialog);

    controller.hears('delete', 'message,direct_message', async (bot, message) => {

        let reply = await bot.reply(message, 'This message will be deleted in a few seconds.');
        setTimeout(async () => {
            let res = await bot.deleteMessage(reply);
        }, 5000);

    });


    controller.hears('create a room', 'message,direct_message', async (bot, message) => {

        // create a room
        let room = await bot.api.rooms.create({ title: 'botkit test room' });

        // add user as member (bot is automatically added)
        let membership2 = await bot.api.memberships.create({
            roomId: room.id,
            personId: message.user,
        });

        await bot.startConversationInRoom(room.id, message.user);
        await bot.beginDialog(NEW_ROOM_DIALOG);

    });

    controller.on('memberships.created', async (bot, message) => {
        console.log('memberships created', message);
    });

    controller.hears(['notifica el status del ticket 123 ha sido procesada', 'notifica que el status del ticket 123 ha sido procesada','notifica que el ticket 123 ha sido procesada'], 'message,direct_mention', async (bot, message) => {
        await bot.beginDialog(DIALOG_ID);
    });

    controller.hears(['notifica el status del ticket 123 ha sido procesada', 'notifica que el status del ticket 123 ha sido procesada','notifica que el ticket 123 ha sido procesada'], 'direct_message', async (bot, message) => {
        await bot.beginDialog(DIALOG_ID);
    });
}