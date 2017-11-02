'use strict'

let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let logo, name, description;
let result = [];

let getJSON = (type, channel) => {
    let url =`https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/${type}/${channel}`;
    fetch(url).then(function(data){
        return data.json();
    }).then(function(myData){
        getChannelDetails(myData);
    });
}

channels.forEach(function(name){
    getJSON('channels',name);
});

function getChannelDetails(data){
    result.push({"name": data.display_name, "logo":data.logo, "url": data.url, "description":data.status});
}
