let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let result = [];

let fetchAPI = (type,channel) => {
    let url = `http://wind-bow.glitch.me/twitch-api/${type}/${channel}`;
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(data){
        return data;
    }); 
};

channels.forEach(function(channel){
    let channelsData = fetchAPI("channels", channel);
    channelsData.then(function(apiData){
        let channelInfo = {"name":apiData.display_name, "logo": apiData.logo, "url": apiData.url, "description":apiData.status};
        let channelStatus = fetchAPI("streams", channel);
        channelStatus.then(function(streamData){
            if (streamData.stream === null){
                channelInfo.description = "Offline";
            }
        });
        result.push(channelInfo);
    });
});

