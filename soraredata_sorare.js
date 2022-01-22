// event when page is load
window.addEventListener("load", getPlayer);

console.log("SorareStats");

// event when url change
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;  
  if (url !== lastUrl && url.includes("cards") && !url.includes("tab=cards")) {    
    //onUrlChange();
    getPlayer();
  }
  lastUrl = url;
}).observe(document, {subtree: true, childList: true});

// function for get infomation on soraredata api
async function getPlayerInfo(url, param)
{
  let urlRequest = url + param;
  try
  {
    let jsonResult;
    return await fetch(urlRequest).then(resp => resp.json().then(data => ({
      data: data,
      status: resp.status
    })
    ).then(res => {
      return res;      
    }));
  }
  catch (error)
  {
    console.log("SorareData on Sorare Error : " + error);
  }
}

// function for get player name and club name
async function getPlayer()
{
    setTimeout(() => {
       
        var playerName;
        var clubName;

        if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children.length == 6)
        {
          playerName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[5].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[5].children[1].children[0].children[1].children[0].innerHTML;
        }
        else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children.length == 7)
        {
          playerName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[6].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[6].children[1].children[0].children[1].children[0].innerHTML;
        }
        else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children.length == 8)
        {
          playerName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[7].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[7].children[1].children[0].children[1].children[0].innerHTML;
        }
        else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children.length == 9)
        {
          playerName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[8].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[8].children[1].children[0].children[1].children[0].innerHTML;
        }

        var result;
        
        getPlayerInfo("https://www.soraredata.com/api/players/search/", playerName).then(result => 
        {          
          result = return_sorare_data_url(result.data, clubName);
        });

    }, 1000);
}

// function for add button on player page
function return_sorare_data_url(json, clubName)
{
  var urlData = 'https://www.soraredata.com/api/players/info/';
  var PlayerID;
  const play = Object.create(json);
  const licensed = Object.create(play.licensed_players);

  var dataUrl = "https://www.soraredata.com/player/";

  play.licensed_players.forEach (player =>{
    if (player.team.DisplayName === clubName)
    {
      dataUrl = dataUrl + player.player.PlayerId;
      PlayerID = player.player.PlayerId;
    }
  } );

  // Get Player infomation
  getPlayerInfo(urlData, PlayerID).then(result => 
  {          
    result = Add_Stats_On_Page(result.data);
  });

  var button = document.createElement("div");

  button.setAttribute('style', "margin-top:15%");

  var link = document.createElement("a");

  link.setAttribute('href', dataUrl);
  link.setAttribute('target', "_blank");

  var img = document.createElement("img");
  img.setAttribute('src', "https://i.ibb.co/Q846wRd/soraredata-logo.png");
  img.setAttribute('width', "40");
  img.setAttribute('height', "40");

  link.appendChild(img);

  button.appendChild(link);

  var body;
  if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children.length == 3)
  {
    body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[2];
  }
  else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children.length == 2)
  {
    body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1];
  }

  body.appendChild(button);
}

function Add_Stats_On_Page(json)
{
  const playerInfo = Object.create(json);
  const Average = Object.create(playerInfo.averages);
  const playerStatus = getPlayingStatus(playerInfo.player.PlayingStatus);

  const L5 = Math.trunc(Average.avg_5);
  const L15 = Math.trunc(Average.avg_15);
  const L40 = Math.trunc(Average.avg_40);

  var body;
  var classStyle;

  body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[0].children[0].children[0];
  classStyle = body.children[0].children[0].children[0].className.split(' ')[0];

  var DrawPlayerStatus = document.createElement('div');
  DrawPlayerStatus.setAttribute('style', "font-family: apercu-pro, system-ui, sans-serif; font-style: normal; font-weight: 700; line-height: 26px;");
  DrawPlayerStatus.textContent = playerStatus;

  var DrawL5 = CreateAVGElement('div', classStyle + " " + returnStyleAverage(L5), FindDNP(L5));
  DrawL5.setAttribute('title', "L5");

  var DrawL15 = CreateAVGElement('div', classStyle + " " + returnStyleAverage(L15), FindDNP(L15));
  DrawL15.setAttribute('title', "L15");

  var DrawL40 = CreateAVGElement('div', classStyle + " " + returnStyleAverage(L40), FindDNP(L40));
  DrawL40.setAttribute('title', "L40");

  var DrawInformation = document.createElement("div");

  DrawInformation.setAttribute('class', "playerInformationPlus");

  DrawInformation.appendChild(DrawPlayerStatus);
  DrawInformation.appendChild(DrawL5);
  DrawInformation.appendChild(DrawL15);
  DrawInformation.appendChild(DrawL40);

  body.parentElement.insertBefore(DrawInformation, body.parentElement.children[1]);
}


/* --------------------------------------------------------
 *                     HELP FUNCTION
 * ----------------------------------------------------------- */

/// Function for convert 0 score in DNP string
function FindDNP(score)
{
  if (score < 1)
  {
    return "DNP";
  }
  else 
  {
    return score;
  }
}

/// Function for get css style from score
function returnStyleAverage(avg)
{
  var res;

  if (avg < 1)
  {
    res = "noScore solid";
  }
  if (avg >= 1 && avg <= 14)
  {
    res = "veryLow solid";
  }
  else if (avg >= 15 && avg <= 29)
  {
    res = "low solid";
  } 
  else if (avg >= 30 && avg <= 45)
  {
    res = "mediumLow solid";
  }
  else if (avg >= 45 && avg <= 59)
  {
    res = "medium solid";
  }
  else if (avg >= 60 && avg <= 74)
  {
    res = "mediumHigh solid";
  }
  else if (avg >= 75 && avg <= 100)
  {
    res = "high solid";
  }

  return res;
}

function getPlayingStatus(status)
{
  var res;

  switch (status)
  {    
    case "not_playing" :
      res = "Status : Reserve";
      break;
    case "starter" :
      res = "Status : Starter";
      break;
    case "substitute" :
      res = "Status : Substitute";
      break;    
  }
  return res;
}

/// Function for create element AVG
function CreateAVGElement(element, contentClass, text)
{
  var AVG = document.createElement(element);
  AVG.setAttribute('class', contentClass);
  AVG.textContent = text;

  return AVG;
}