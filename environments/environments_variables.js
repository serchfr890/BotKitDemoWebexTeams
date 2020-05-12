const INTENT_NAMES = {
    GREET: 'Saludar',
    NONE: 'None',
    REQUEST_TICKET_INFO: 'RequestTicketInfo',
    RESPONSE_TICKET_INFO: 'ResponseTicketInfo'
}
exports.INTENT_NAMES = INTENT_NAMES;

const BOT_MESSAGES = {
    GREET: 'Hola colega. ¿En qué puedo ayudarte?',
     SEND_REQUEST_INFO_TICKET: 'OK, voy enviar tu solicitud al grupo correspondiente, yo te aviso cuando me den información de tu solicitud',
    SAY_THANKS: 'Muchas gracias por tu colaboración, en breve le haré llegar la información del ticket'
 }
 exports.BOT_MESSAGES = BOT_MESSAGES;

 const WEBEX_ROOM_IDS = {
    DEMO_SERVICE_DESK: 'Y2lzY29zcGFyazovL3VzL1JPT00vM2I3NTIxMzAtOTE0ZS0xMWVhLWEzZjUtMzFmNzNkMjMyNzBm'
 }
 exports.WEBEX_ROOM_IDS = WEBEX_ROOM_IDS;
