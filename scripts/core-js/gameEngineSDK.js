
var GameEngineSDK = {
    _registredBots:[],

    regiterBot: function (botName,engineers,logicFunction) {
        var botExe = new playerBotExe(botName,engineers,logicFunction);
        this._registredBots.push(botExe);
    },

    getBot : function(botName){

        if(this._registredBots == null || this._registredBots.length  == 0)
        {
            console.error("There are no registered bots.");
            return null;
        }

        return this._registredBots.find(function (bot) { return bot._botName == botName });

    },

    getRegisteredBotsNames : function () {

        var registeredBots = [];
        this._registredBots.forEach(function (bot){
            registeredBots.push(bot.getBotName());
        })

        return registeredBots;
    },

    getBotEngineers : function (botName) {
        var engineers = [];
        this._registredBots.forEach(function (bot){
            if(bot.getBotName() == botName){
                engineers = bot.getBotEngineers();
            }
        })
        return engineers;

    }

}

function playerBotExe(botName, engineers,logicFunction){

    this._botName = botName;
    this._engineers = engineers;
    this._logicFunction = logicFunction;

    this.getBotName = function () {
        return this._botName;

    },

    this.getBotEngineers = function () {
        return this._engineers;
    }

}
