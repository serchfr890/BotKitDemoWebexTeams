// Este ejemplo es una demo para que el bot intervenga y pida el status de un tiket en un grupo determinado de webex teams
//var usersID = ["Y2lzY29zcGFyazovL3VzL1BFT1BMRS8zMWFkOTlhYS1kOTM5LTRjNWUtYTQwYy1iZjVhYzBjZTZhMzA"];
module.exports = function (controller) {


    controller.hears('Quiero saber el status del tiket 123','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'OK, voy enviar tu solicitud al grupo correspondiente, por favor de esperar!!!');
        await bot.startConversationInRoom("Y2lzY29zcGFyazovL3VzL1JPT00vM2I3NTIxMzAtOTE0ZS0xMWVhLWEzZjUtMzFmNzNkMjMyNzBm", "Y2lzY29zcGFyazovL3VzL1BFT1BMRS8zMWFkOTlhYS1kOTM5LTRjNWUtYTQwYy1iZjVhYzBjZTZhMzA").then(async response => {
            await bot.reply(message, `Que tal colegas, necesito que alguien me pueda dar información del ticket 122`)
        })


    });

    controller.on('message,direct_mention',  async(bot, message) => {

        await bot.reply(message, 'Muchas gracias por tu colaboración, en breve le haré llegar la información del ticket');
        await bot.startConversationInRoom("Y2lzY29zcGFyazovL3VzL1JPT00vMjBlN2VhMGMtYWVlNS0zYzUxLTg4YjctM2E1NTY2Y2Y4MGU2","Y2lzY29zcGFyazovL3VzL1BFT1BMRS8zMWFkOTlhYS1kOTM5LTRjNWUtYTQwYy1iZjVhYzBjZTZhMzA").then(async response => {
            await bot.reply(message, `La resoluación del ticket 123 es la siguiente: ${message.text}`)
        })
    })
}
