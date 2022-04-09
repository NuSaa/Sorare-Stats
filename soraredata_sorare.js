console.log("SorareStats");

var oldHref = document.location.href;

window.onload = function() {
    var bodyList = document.querySelector("body")

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;
                /* Changed ! your code here */
                if (document.location.href.includes("cards") /*&& !url.includes("tab=cards")*/) {
                  getPlayer();
                }
                else if (document.location.href.includes("soraredata.com/player/"))
                {
                  add_button_on_sorare_data();
                }
            }
        });
    });
    
    var config = {
        childList: true,
        subtree: true
    };
    
    observer.observe(bodyList, config);
};


window.addEventListener("load", add_button_on_sorare_data());

// function for get infomation on soraredata api
async function getPlayerInfo(url, param)
{
  let urlRequest = url + param;
  var myHeaders = new Headers();
  var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
  try
  {
    let jsonResult;
    return await fetch(urlRequest,myInit).then(resp => resp.json().then(data => ({
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

        if (document.getElementsByClassName("MuiPaper-root").length == 1)
        {
          playerName = document.getElementsByClassName("webp")[0].children[1].children[0].children[1].lastChild.children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("webp")[0].children[1].children[0].children[1].lastChild.children[1].children[0].children[1].children[0].innerHTML;
        }
        else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children.length == 6)
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
        /*else (document.getElementsByClassName("MuiPaper-root")[2].children[1].children[1].children.length == 8) // from GW
        {
          playerName = document.getElementsByClassName("MuiPaper-root")[2].children[1].children[1].children[7].children[0].children[0].children[1].children[0].innerHTML;
          clubName = document.getElementsByClassName("MuiPaper-root")[2].children[1].children[1].children[7].children[1].children[0].children[1].children[0].innerHTML;
        }*/
        

        var result;
        
        getPlayerInfo("https://api.lafoneddy.eu/SorareData/", playerName + '/' + clubName).then(result => 
        {          
          result = return_sorare_data_url(result.data, clubName, playerName);
        });

    }, 1000);
}

// function for add button on player page
function return_sorare_data_url(json, clubName, playerName)
{
  const play = Object.create(json);

  var urlPlayer = play.urlPage;
  var L5 = play.l5;
  var L15 = play.l15;
  var L40 = play.l40;
  var playerStatus = play.playerStatus;

  Add_Stats_On_Page(L5, L15, L40, playerStatus);


  //Bouton soraredata
  var button = document.createElement("div");

  button.setAttribute('style', "margin-top:15%");
  
  var link = document.createElement("a");

  link.setAttribute('href', urlPlayer);
  link.setAttribute('target', "_blank");

  var img = document.createElement("img");
  img.setAttribute('src', "https://i.ibb.co/Q846wRd/soraredata-logo.png");
  img.setAttribute('width', "40");
  img.setAttribute('height', "40");
  img.setAttribute('style', "border-radius:5px 5px")

  link.appendChild(img);

  //Bouton transfertmarkt
  var buttont = document.createElement("div");

  buttont.setAttribute('style', "margin-top:15%");

  var linkt = document.createElement("a");

  linkt.setAttribute('href', "https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=" + playerName);
  linkt.setAttribute('target', "_blank");

  var imgt = document.createElement("img");
  imgt.setAttribute('src', "https://media-exp1.licdn.com/dms/image/C560BAQEKoqF4x09Y3g/company-logo_200_200/0/1620654198278?e=2159024400&v=beta&t=ddAL2J7Ssly4H7Qt4-PQ8_GR3M8FypcY9UqgR9hv5PQ");
  imgt.setAttribute('width', "40");
  imgt.setAttribute('height', "40");
  imgt.setAttribute('style', "border-radius:5px 5px")

  linkt.appendChild(imgt);

  //Bouton transfertmarkt
  var buttonSofa = document.createElement("div");

  buttonSofa.setAttribute('style', "margin-top:15%");

  var linkSofa = document.createElement("a");

  linkSofa.setAttribute('href', "https://www.sofascore.com/search?q=" + playerName);
  linkSofa.setAttribute('target', "_blank");

  var imgSofa = document.createElement("img");
  imgSofa.setAttribute('src', "https://yt3.ggpht.com/ytc/AKedOLRXkWgKnrK4xlgol3j5r08WV6Ny_s5gVUfTLwt63g=s88-c-k-c0x00ffffff-no-rj");
  imgSofa.setAttribute('width', "40");
  imgSofa.setAttribute('height', "40");
  imgSofa.setAttribute('style', "border-radius:5px 5px")

  linkSofa.appendChild(imgSofa);
  

  button.appendChild(link);
  buttont.appendChild(linkt);
  buttonSofa.appendChild(linkSofa);

  var body;

  if (document.getElementsByClassName("MuiPaper-root").length == 1 && document.getElementsByClassName("webp")[0].children[1].children[0].children[0].children.length == 2)
  {
    body = document.getElementsByClassName("webp")[0].children[1].children[0].children[0].children[1];
  }
  else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children.length == 3)
  {
    body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[2];
  }
  else if (document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children.length == 2)
  {
    body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[0].children[1];
  }

  body.appendChild(button);
  body.appendChild(buttont);
  body.appendChild(buttonSofa);
}

function Add_Stats_On_Page(_L5, _L15, _L40, _playerStatus)
{
  const L5 = Math.trunc(_L5);
  const L15 = Math.trunc(_L15);
  const L40 = Math.trunc(_L40);

  var body;
  var classStyle;

  if (document.getElementsByClassName("MuiPaper-root").length == 1)
  {
    body = document.getElementsByClassName("webp")[0].children[1].children[0].children[1].children[0].children[0].children[0];
  }
  else
  {
    body = document.getElementsByClassName("MuiPaper-root")[1].children[1].children[1].children[0].children[0].children[0];
  }

  classStyle = body.children[0].children[0].children[0].className.split(' ')[0];

  var DrawPlayerStatus = document.createElement('div');
  DrawPlayerStatus.setAttribute('style', "font-family: apercu-pro, system-ui, sans-serif; font-style: normal; font-weight: 700; line-height: 26px;");
  DrawPlayerStatus.textContent = getPlayingStatus(_playerStatus);

  var DrawL5 = CreateAVGElement('div', classStyle + " " + returnStyleAverage(L5), FindDNP(L5));
  DrawL5.setAttribute('title', "L5");
  DrawL5.setAttribute('style', "margin-right:10px")

  var DrawL15 = CreateAVGElement('div', classStyle + " " + returnStyleAverage(L15), FindDNP(L15));
  DrawL15.setAttribute('title', "L15");
  DrawL15.setAttribute('style', "margin-right:10px")

  var DrawL40 = CreateAVGElement('div', classStyle + " " + returnStyleAverage(L40), FindDNP(L40));
  DrawL40.setAttribute('title', "L40");
  DrawL40.setAttribute('style', "margin-right:10px")

  var DrawInformation = document.createElement("div");

  DrawInformation.setAttribute('class', "playerInformationPlus");
  //DrawInformation.setAttribute('style', "gap:10px")

  DrawInformation.appendChild(DrawPlayerStatus);
  DrawInformation.appendChild(DrawL5);
  DrawInformation.appendChild(DrawL15);
  DrawInformation.appendChild(DrawL40);

  body.parentElement.insertBefore(DrawInformation, body.parentElement.children[1]);
}


//SORARE DATA PART

function add_button_on_sorare_data()
{
  
    setTimeout(() => {
      var player_Name = document.title

      var div_icon;
      var append;
      if (document.location.href.includes("soraredata.com/player/"))
      {
        div_icon = document.children[0].children[1].children[1].children[0].children[0].children[1].children[2].children[0].children[0].children[0].children[2].children[3].children[0].children[0];
        append = false;
      }
      else if (document.location.href.includes("soraredata.com/card/"))
      {
        div_icon = document.children[0].children[1].children[1].children[0].children[0].children[1].children[2].children[0].children[1];
        append = true;
      }

      var temp = "oui";

       //Bouton SofaScore
      var buttonSofa = document.createElement("div");

      buttonSofa.setAttribute('class', "SofaScoreButton");

      var linkSofa = document.createElement("a");

      linkSofa.setAttribute('href', "https://www.sofascore.com/search?q=" + player_Name);
      linkSofa.setAttribute('target', "_blank");

      var imgSofa = document.createElement("img");
      imgSofa.setAttribute('src', "https://yt3.ggpht.com/ytc/AKedOLRXkWgKnrK4xlgol3j5r08WV6Ny_s5gVUfTLwt63g=s88-c-k-c0x00ffffff-no-rj");
      imgSofa.setAttribute('width', "40");
      imgSofa.setAttribute('height', "40");
      imgSofa.setAttribute('style', "border-radius:5px 5px")

      linkSofa.appendChild(imgSofa);
      buttonSofa.appendChild(linkSofa);

      //Bouton transfertmarkt
      var buttont = document.createElement("div");

      buttont.setAttribute('class', "TransferMarktButton");

      var linkt = document.createElement("a");

      linkt.setAttribute('href', "https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=" + player_Name);
      linkt.setAttribute('target', "_blank");

      var imgt = document.createElement("img");
      imgt.setAttribute('src', "https://media-exp1.licdn.com/dms/image/C560BAQEKoqF4x09Y3g/company-logo_200_200/0/1620654198278?e=2159024400&v=beta&t=ddAL2J7Ssly4H7Qt4-PQ8_GR3M8FypcY9UqgR9hv5PQ");
      imgt.setAttribute('width', "40");
      imgt.setAttribute('height', "40");
      imgt.setAttribute('style', "border-radius:5px 5px")

      linkt.appendChild(imgt);

      buttont.appendChild(linkt);

      if (!append)
      {
        div_icon.insertBefore(buttonSofa, div_icon.children[0]);
        div_icon.insertBefore(buttont, div_icon.children[0]);
      }
      else
      {
        div_icon.append(buttonSofa);
        div_icon.append(buttont);
      }
    }, 1000);
  
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