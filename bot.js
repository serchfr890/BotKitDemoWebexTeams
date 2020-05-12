//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the WebexDemoBot bot.

// Import Botkit's core features


const ENVIRONMENTS = require('./environments/environments_variables');
const { Botkit }  = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');
const config = require("./config.json");

// Import a platform-specific adapter for webex.
const { WebexAdapter } = require('botbuilder-adapter-webex');

const { MongoDbStorage } = require('botbuilder-storage-mongodb');

// Load process.env values from .env file
require('dotenv').config();

//if (process.env.MONGO_URI) {

const { LuisRecognizer } = require('botbuilder-ai');
// Configuración para LUIS
const recognizer = new LuisRecognizer({
    applicationId: "ca51c6c1-0ed2-4795-8e76-bb50927d5a6a",
    endpointKey: "71b54188faf14158ac61563a80287642",
    endpoint: "https://westus.api.cognitive.microsoft.com/"
});


// Configuración de base de datos mongo para BotState
let storage = mongoStorage = new MongoDbStorage({
    url : "mongodb://localhost:27017/",
    database: "botframework",
    collection: "botframework"
});

// Configuración para el adaptador de Webex Teamns
const adapter = new WebexAdapter({
    secret: process.env.secret,
    access_token: config.token,
    public_address: config.webhookUrl
})    

const controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter: adapter,
    storage: storage
});

// Configuración del Middleware LUIS
controller.middleware.ingest.use(async (bot, message, next) => {
    if (message.incoming_message.type === 'message') {
        const results = await recognizer.recognize(message.context);
        message.intent = LuisRecognizer.topIntent(results, ENVIRONMENTS.INTENT_NAMES.NONE, 0 || 0.7);
        message.entity = results.entities.Ticket;
        console.log('recognized', message.intent);
    }
    next();
});

if (process.env.cms_uri) {
    controller.usePlugin(new BotkitCMSHelper({
        uri: process.env.cms_uri,
        token: process.env.cms_token,
    }));
}

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');
    /* catch-all that uses the CMS to trigger dialogs */

    if (controller.plugins.cms) {
        controller.on('message,direct_message', async (bot, message) => {
            console.log('bot', bot)
            let results = false;
            results = await controller.plugins.cms.testTrigger(bot, message);

            if (results !== false) {
                // do not continue middleware!
                return false;
            }
        });
      }
});

controller.webserver.get('/', (req, res) => {
    res.send(`This app is running Botkit ${ controller.version }.`);
});
