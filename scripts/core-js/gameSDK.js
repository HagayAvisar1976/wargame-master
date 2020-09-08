
var GameSDK = {

  regiterBot: function (botName,engineers,logicFunction) {
    GameEngineSDK.regiterBot(botName,engineers,logicFunction);
  },

  getCurrentGeneration : function(){
    return GameEngineSDK.currentGeneration();
  },

  getMatrixDimensions : function () {
    return GameEngineSDK.getMatrixDimensions();
  },

  getMyBudget: function(botName) {
    return GameEngineSDK.getMyBudget(botName);
  }
}