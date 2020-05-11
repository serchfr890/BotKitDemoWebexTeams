// Este ejemplo es una demo para que el bot intervenga y pida el status de un tiket en un grupo determinado de webex teams

module.exports = function (controller) {

// var users = [];

    controller.hears('Quiero saber el status del tiket 123','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'OK, voy enviar tu solicitud al grupo correspondiente, por favor de esperar!!!');

        // if (users.length === 0) {
        //     await bot.reply(message, "Nuevo usuario");
        //     let user = {
        //         userId:  message.reference.user.id,
        //         userName: message.reference.user.name,
        //         ticketNumber: 123
        //     }
        //     users.push(user);
        // } else {
        //     await bot.reply(message, "Usuario registrado")
        //     let index = users.indexOf(users.find(x => x.userId = message.reference.user.id));
        //
        // }

        // let roomId = message.channel;
        // await bot.reply(message, `RoomID: ${roomId}`)

        await bot.startConversationInRoom("Y2lzY29zcGFyazovL3VzL1JPT00vM2I3NTIxMzAtOTE0ZS0xMWVhLWEzZjUtMzFmNzNkMjMyNzBm", message.reference.user.id).then(async response => {
            await bot.reply(message, `Que tal colegas, necesito que alguien me pueda dar información del ticket 122`)
        });
    });


    controller.on('message,direct_mention',  async(bot, message) => {

        await bot.reply(message, 'Muchas gracias por tu colaboración, en breve le haré llegar la información del ticket');
        await bot.startConversationInRoom("Y2lzY29zcGFyazovL3VzL1JPT00vMjBlN2VhMGMtYWVlNS0zYzUxLTg4YjctM2E1NTY2Y2Y4MGU2",message.reference.user.id).then(async response => {
            await bot.reply(message, `La resolución del ticket 123 es la siguiente: ${message.text}`)
        })
    })
}
