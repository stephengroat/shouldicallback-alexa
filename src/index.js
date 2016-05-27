/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * ShouldICallBack is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ShouldICallBack = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ShouldICallBack.prototype = Object.create(AlexaSkill.prototype);
ShouldICallBack.prototype.constructor = ShouldICallBack;

ShouldICallBack.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("ShouldICallBack onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

ShouldICallBack.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("ShouldICallBack onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

ShouldICallBack.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("ShouldICallBack onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

ShouldICallBack.prototype.intentHandlers = {
    // register custom intent handlers
    "ShouldICallBackIntent": function (intent, session, response) {
        response.tellWithCard("Hello World!", "Greeter", "Hello World!");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say hello to me!", "You can say hello to me!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the ShouldICallBack skill.
    var shouldICallBack = new ShouldICallBack();
    shouldICallBack.execute(event, context);
};

