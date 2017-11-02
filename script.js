'use strict'

let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let logo, name, description, counter = 0;
let result = [];

let getJSON = (type, channel) => {
    let url =`https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/${type}/${channel}`;
    fetch(url).then(function(data){
        return data.json();
    }).then(function(myData){
        type == "channels" ? getChannelDetails(myData) : getStatus(myData);
    });
}

channels.forEach(function(name){
    getJSON('channels',name);
    getJSON('streams',name);
});

let getChannelDetails = (data) => {
    result.push({"name": data.display_name, "logo":data.logo, "url": data.url, "description":data.status});
}

let getStatus = (data) => {
    console.log(typeof(data.stream));
    counter++;
    if (data.stream === null) {
        // result[counter]["description"] = "Offline";
        // console.log(data.stream,counter);
    }
}
console.log(result);
