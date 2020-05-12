/*
* ---------------------------- DESCRIPCION -----------------------------------------------------------------------------
* Esta caracteristica de Botkit realiza lo soguiente.
* - Realiza una conversación privada con el usuario donde este actuador pide informacíón acerca de un ticket.
* - El bot entiende la solicitud y manda la información a un grupo de Webex Temas.
* - Dentro del grupo de Webex Teams un usuario puede responder la petición del bot haciéndole mención e indicandole el status del ticket.
* - Una ves que el bot tiene la información acerca del ticket, el bot notifica al usuario.

* *------------------------------- CUESTIONES TECNICAS -------------------------------------------------------------------
* El bot funciona con Microsoft LUIS (Detecta las intenciones y las entidades -Ticket-)
* Relaciona el numero de ticket con un identificador de usuario
* Por el momento la información se almacena en una variable, no existe una base de datos para persistir la información
* */
const ENVIRONMENTS = require('../environments/environments_variables')
var users = [];
module.exports = function (controller) {

    // Intent Saludar
    controller.hears(async(message) => { return (message.intent===ENVIRONMENTS.INTENT_NAMES.GREET) }, 'message, direct_message', async(bot, message) => {
        await bot.reply(message, ENVIRONMENTS.BOT_MESSAGES.GREET);
    });

    // Intent RequestTicketInfo
    controller.hears(async(message) => { return message.intent === ENVIRONMENTS.INTENT_NAMES.REQUEST_TICKET_INFO},'message,direct_message', async(bot, message) => {
        await bot.reply(message, ENVIRONMENTS.BOT_MESSAGES.SEND_REQUEST_INFO_TICKET);

        // Verifica si existe un usuario a través de su ID
        let userExist = users.find(x => x.userId === message.reference.user.id);
        if (userExist != undefined) {
            // Actualiza el número de ticket
            let index = users.indexOf(userExist);
            users[index].ticketNumber = message.entity[0];
        } else {
            // Crea un nuevo usuario y lo almacena en un arreglo
            let user = {
                userId:  message.reference.user.id,
                userName: message.reference.user.name,
                ticketNumber: message.entity[0],
                channel: message.channel
            }
            users.push(user);
        }

        // Inicia conversación en el grupo
        await bot.startConversationInRoom(ENVIRONMENTS.WEBEX_ROOM_IDS.DEMO_SERVICE_DESK, message.reference.user.id).then(async response => {
            await bot.reply(message, `Que tal colegas!!! El usuario ${message.reference.user.name} quiere saber informacíon acerca de su ticket ${message.entity[0]}`);
        });
    });

    // Intent Response Ticket Info
    controller.hears(async(message) => {return message.intent === ENVIRONMENTS.INTENT_NAMES.RESPONSE_TICKET_INFO},'message,direct_mention',  async(bot, message) => {
        // Verifica que el número de ticket esté asosiado a un usuario.
        let userExist = users.find(x => x.ticketNumber === message.entity[0]);
        if (userExist != undefined) {
            await bot.reply(message, ENVIRONMENTS.BOT_MESSAGES.SAY_THANKS);
            // Inicia conversación privada con el usuario asociado al ticket
            await bot.startConversationInRoom(userExist.channel, userExist.userId).then(async response => {
                await bot.reply(message, `La resolución del ticket ${message.entity[0]} es la siguiente: ${message.text}`);
                await bot.reply(message, `Responsable de la información ${message.reference.user.name}`);
            });
        } else {
            await bot.reply(message, `El número de ticket ${message.entity} no existe, por favor de verificarlo`);
        }
    });
}
