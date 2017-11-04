let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
let result = [];
function getData() {
    let fetchAPI = (type,channel) => {
        let url = `https://wind-bow.glitch.me/twitch-api/${type}/${channel}`;
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
}
getData();
setTimeout(renderHTML,3000);

function renderHTML(){
    var table = document.querySelector('table');
    for (let i=0;i<channels.length;i++){
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var img = document.createElement('img');
        result[i].logo = result[i].logo ? result[i].logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F"
        img.setAttribute("src",result[i].logo);
        td1.appendChild(img);

        var td2 = document.createElement('td');
        var link = document.createElement('a');
        link.setAttribute("href",result[i].url);
        link.setAttribute("target","_blank");
        var text = document.createTextNode(result[i].name);
        link.appendChild(text);
        td2.appendChild(link);

        var td3 = document.createElement('td');
        var statusText = document.createTextNode(result[i].description);
        td3.appendChild(statusText);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
}
