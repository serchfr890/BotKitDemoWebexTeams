// Este ejemplo es una demo para que el bot intervenga y pida el status de un tiket en un grupo determinado de webex teams
var users = [];
module.exports = function (controller) {

    // Intent Saludar
    controller.hears(async(message) => { return (message.intent==='Saludar') }, 'message, direct_message', async(bot, message) => {
        await bot.reply(message,'Hola colega. ¿En qué puedo ayudarte?');
    });

    // Intent RequestTicketInfo
    controller.hears(async(message) => {return message.intent === 'RequestTicketInfo'},'message,direct_message', async(bot, message) => {
        await bot.reply(message, 'OK, voy enviar tu solicitud al grupo correspondiente, yo te aviso cuando me den información de tu solicitud');
        let userExist = users.find(x => x.userId === message.reference.user.id);
        console.log()
        if (userExist != undefined) {
            let index = users.indexOf(userExist);
            users[index].ticketNumber = message.entity[0];
            console.log("Usuario existente: ", users);
        } else {
            let user = {
                userId:  message.reference.user.id,
                userName: message.reference.user.name,
                ticketNumber: message.entity[0],
                channel: message.channel
            }
            users.push(user);
            console.log("Usuario nuevo: ", users)
        }


        // if (users.length === 0) {
        //     await bot.reply(message, "Nuevo usuario");
        //     let user = {
        //         userId:  message.reference.user.id,
        //         userName: message.reference.user.name,
        //         ticketNumber: message.entity
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
            await bot.reply(message, `Que tal colegas!!! El usuario ${message.reference.user.name} quiere saber informacíon acerca de su ticket ${message.entity[0]}`);
            // await bot.reply(message, `¿Alguien me puede dar información acerca del ticket ${message.entity[0]}?`);
        });
    });


    controller.hears(async(message) => {return message.intent === "ResponseTicketInfo"},'message,direct_mention',  async(bot, message) => {

        let userExist = users.find(x => x.ticketNumber === message.entity[0]);
        console.log("Entity from response: ", message.entity[0])
        if (userExist != undefined) {
            await bot.reply(message, 'Muchas gracias por tu colaboración, en breve le haré llegar la información del ticket');
            await bot.startConversationInRoom(userExist.channel, userExist.userId).then(async response => {
                await bot.reply(message, `La resolución del ticket ${message.entity[0]} es la siguiente: ${message.text}`)
                await bot.reply(message, `Responsable de la información ${message.reference.user.name}`)
            });
        } else {
            await bot.reply(message, `El número de ticket ${message.entity} no existe, por favor de verificarlo`)
        }

    })
}
