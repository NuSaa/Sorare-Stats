// event when page is load
window.addEventListener("load", getPlayer);

//browser.browserAction.onClicked.addListener(handleClick);

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

// function for get player name and club name
async function getPlayer()
{
    setTimeout(() => {
       
        var playerName;
        var clubName;

        if (document.getElementsByClassName("MuiPaper-root").length === 3) //home page
        {
          playerName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children[7].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children[7].children[1].children[0].children[1].children[0].innerHTML;
        }
        else if (document.getElementsByClassName("MuiPaper-root").length === 19) // market
        {
          playerName = document.getElementsByClassName("MuiPaper-root")[18].children[1].children[0].children[1].children[7].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("MuiPaper-root")[18].children[1].children[0].children[1].children[7].children[1].children[0].children[1].children[0].innerHTML;
        }
        else if (document.getElementsByClassName("MuiPaper-root").length === 1) // market solo player
        {          
          playerName = document.getElementById("root").children[0].children[1].children[0].children[1].children[7].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementById("root").children[0].children[1].children[0].children[1].children[7].children[1].children[0].children[1].children[0].innerHTML;
        }
        else if (document.getElementsByClassName("MuiPaper-root").length === 8) // player page
        {
          playerName = document.getElementsByClassName("MuiPaper-root")[7].children[1].children[0].children[1].children[7].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("MuiPaper-root")[7].children[1].children[0].children[1].children[7].children[1].children[0].children[1].children[0].innerHTML;
        }
        else if (document.getElementsByClassName("MuiPaper-root").length === 18) // my club my cards
        {
          if (document.getElementsByClassName("MuiPaper-root")[17].children[1].children[0].children[1].children.length === 7) // common cards
          {
            playerName = document.getElementsByClassName("MuiPaper-root")[17].children[1].children[0].children[1].children[6].children[0].children[0].children[1].children[0].innerHTML;
            clubName = document.getElementsByClassName("MuiPaper-root")[17].children[1].children[0].children[1].children[6].children[1].children[0].children[1].children[0].innerHTML;
          }
          else if (document.getElementsByClassName("MuiPaper-root")[17].children[1].children[0].children[1].children.length === 9) // other cards
          {
            playerName = document.getElementsByClassName("MuiPaper-root")[17].children[1].children[0].children[1].children[8].children[0].children[0].children[1].children[0].innerHTML;
            clubName = document.getElementsByClassName("MuiPaper-root")[17].children[1].children[0].children[1].children[8].children[1].children[0].children[1].children[0].innerHTML;
          }          
        }
        else if (document.getElementsByClassName("MuiPaper-root").length === 2) // personal bid && offer send (receive) && BEST 5 && hall of fame
        {
          if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children.length === 7) // BEST 5 common cards && hall of fame common cards
          {
            playerName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children[6].children[0].children[0].children[1].children[0].innerHTML;
            clubName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children[6].children[1].children[0].children[1].children[0].innerHTML;
          }
          else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children.length === 8) // personal bid && offer send (receive) && offer received && hall of fame other cards
          {
            playerName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children[7].children[0].children[0].children[1].children[0].innerHTML;
            clubName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children[7].children[1].children[0].children[1].children[0].innerHTML;
          }
          else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children.length === 9) // BEST 5 other cards && personal buy && personal sell offer send (send)
          {
            playerName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children[8].children[0].children[0].children[1].children[0].innerHTML;
            clubName = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1].children[8].children[1].children[0].children[1].children[0].innerHTML;
          }
        }

        var result;
        
        getPlayerInfo("https://www.soraredata.com/api/players/search/", playerName).then(result => 
        {          
          result = return_sorare_data_url(result.data);
        });

    }, 1000);
}

// function for get infomation on soraredata api
async function getPlayerInfo(url, name)
{
  let urlRequest = url + name;
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

// function for add button on player page
function return_sorare_data_url(json, clubName)
{
  var urlData;
  const play = Object.create(json);
  const licensed = Object.create(play.licensed_players);

  var dataUrl = "https://www.soraredata.com/player/";

  play.licensed_players.forEach (player =>{
    if (player.team.displayName === clubName)
    {
      dataUrl = dataUrl + player.player.PlayerId;
    }
  } );

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

  if (document.getElementsByClassName("MuiPaper-root").length === 19) // via market
  {
    body = document.getElementsByClassName("MuiPaper-root")[18].children[1].children[0].children[0].children[2];
  }
  else if (document.getElementsByClassName("MuiPaper-root").length === 1) // via market player solo
  {
    body = document.getElementsByClassName("MuiButtonBase-root")[10].parentElement;
  }
  else if (document.getElementsByClassName("MuiPaper-root").length === 8) // player page 
  {
    body = document.getElementsByClassName("MuiPaper-root")[7].children[1].children[0].children[0].children[1];
  }
  else if (document.getElementsByClassName("MuiPaper-root").length === 2) // personal bid && personal buy && personal sell && offer received && offer send (send) && offer send (receive) && BEST 5 my club all cards && hall of fame
  {
    body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[0].children[1];
  }
  else if (document.getElementsByClassName("MuiPaper-root").length === 18) // my club my card
  {
    body = document.getElementsByClassName("MuiPaper-root")[17].children[1].children[0].children[0].children[1];
  }
  else if (document.getElementsByClassName("MuiPaper-root").length === 3) // home page && squad page
  {
    if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[0].children.length === 2) // squad page && home selling
    {
      body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[0].children[1];
    }
    else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[0].children.length === 3) // home page bid
    {
      body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[0].children[2];
    }
  }

  body.appendChild(button);
}