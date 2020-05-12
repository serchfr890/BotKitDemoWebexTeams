# Botkit Starter Kit

This is a Botkit starter kit for webex, created with the [Yeoman generator](https://github.com/howdyai/botkit/tree/master/packages/generator-botkit#readme).

To complete the configuration of this bot, make sure to update the included `.env` file with your platform tokens and credentials.

[Botkit Docs](https://botkit.ai/docs/v4)

This bot is powered by [a folder full of modules](https://botkit.ai/docs/v4/core.html#organize-your-bot-code). 
Edit the samples, and add your own in the [features/](features/) folder.

# Configuración
Para utilizar la computadora como server se debe exponer http://localhost:3000/api/messages a internet con ngrok con el siguiente comando.
    
    ngrok http 3000

Posteriormente la url que nos proporciona NGROK la colocamos en el archivo config.json en la variable "webhookUrl" como se muestra a continuación
    
    "webhookUrl": "https://c07ded68.ngrok.io"
    
Por ultimo colocar el token del bot que proporciona Webex Teams Developer también en el archivo config.json en la varible Token.

    "token": "YWIwYjhiNDctMzViNC00NDkzLTg2ZTktNTUwZTg2MDBhZjljZTU4YYmYtZDVl_PF84_b4e50a79-b7de-4ee2-940a-a983d1e5c35b",



