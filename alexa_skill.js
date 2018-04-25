const Alexa = require('alexa-sdk');
const baseballLib = require('./baseballLib');
const SKILL_NAME = 'ACC Baseball';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
var ACCData = {};


//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.response.speak("Hello welcome to " + SKILL_NAME);
        baseballLib.getACCData().then(result => {
            ACCData = result;
            console.log(result);
        }).catch(console.log);
                

        //this.emit('GetNewFactIntent');
        this.emit(':tell', "Hello!");
    },
    // 'GetNewFactIntent': function () {
    //     const factArr = data;
    //     const factIndex = Math.floor(Math.random() * factArr.length);
    //     const randomFact = factArr[factIndex];
    //     const speechOutput = GET_FACT_MESSAGE + randomFact;

    //     this.response.cardRenderer(SKILL_NAME, randomFact);
    //     this.response.speak(speechOutput);
    //     this.emit(':responseReady');
    // },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
        this.emit(':tell', "Help!");
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
        this.emit(':tell', "Cancel!");
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
        this.emit(':tell', "Goodbye!");
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
