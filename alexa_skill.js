exports.handler = (event, context) => {

    if(event.session.new){
        console.log("New Session");
    }

    switch (event.request.type){

        case "LaunchRequest":
            console.log("LaunchRequest");
            break;
        
        case "IntentRequest":
            console.log("IntentRequest");
            break;

        case "SessionEndedRequest":
            console.log("SessionEndedRequest");
            break;
        
        default:
            context.fail(`Invalid request type: ${event.request.type}`);
    }
}