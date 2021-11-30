// Menu sidebar

function w3_open()
{
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close()
{
  document.getElementById("mySidebar").style.display = "none";
}

String.prototype.capitalize = function()
{
   return this.charAt(0).toUpperCase() + this.slice(1);
}

$.ajax( // Prix de vente des cartes rewards
{
  url: 'https://api2.splinterlands.com/cards/get_details',
  dataType: 'json',
  type : 'GET',
  success: function(cards)
  {
    loadInfo(cards);
  }
});

const queryString = window.location.search;
const weburl      = window.location.pathname;
const urlParams = new URLSearchParams(queryString);
const username  = urlParams.get('username');

function loadInfo(cards)
{
  $.ajax(
  {
    url: 'https://api2.splinterlands.com/market/history?player='+username,
    dataType: 'json',
    type : 'GET',
    crossDomain: true,
    success: function(datas)
    {
       $("#viewh1").append(`<b>${username.capitalize()}</b>'s market tx`);
       datas.forEach((element) =>
       {
        card = cards.filter(obj => obj.id == element.card_detail_id);
        console.log(card);
        console.log(element);
        day      = new Date(element.completed_date);
        daycreat = new Date(element.created_date);
        element.seller = element.seller.capitalize();
        switch(card[0].color)
        {
          case 'Black' :
            img = "<img src='https://d36mxiodymuqjm.cloudfront.net/website/icons/icon-element-death-2.svg'>";
          break;
          case 'Gray' :
            img = "<img src='https://d36mxiodymuqjm.cloudfront.net/website/icons/icon-element-neutral-2.svg'>";
          break;
          case 'Gold' :
            img = "<img src='https://d36mxiodymuqjm.cloudfront.net/website/icons/icon-element-dragon-2.svg'>";
          break;
          case 'Green' :
            img = "<img src='https://d36mxiodymuqjm.cloudfront.net/website/icons/icon-element-earth-2.svg'>";
          break;
          case 'Red' :
            img = "<img src='https://d36mxiodymuqjm.cloudfront.net/website/icons/icon-element-fire-2.svg'>";
          break;
          case 'White' :
            img = "<img src='https://d36mxiodymuqjm.cloudfront.net/website/icons/icon-element-life-2.svg'>";
          break;
          case 'Blue' :
            img = "<img src='https://d36mxiodymuqjm.cloudfront.net/website/icons/icon-element-water-2.svg'>";
          break;
        }

        if(element.seller === username.capitalize())
        {
          $("#view").append(`<tr>
                            <td class='w3-text-red'><b>SELL</b></td>
                            <td>${day.toLocaleString()}</td>
                            <td>${img} - <a href="https://splinterlands.com/?p=card_details&id=${element.card_detail_id}&gold=${element.gold}&edition=${element.edition}&tab=market" target="_blank">${card[0].name}</a></td>
                            <td>${element.seller}</td>
                            <td>${element.purchaser.capitalize()}</td>
                            <td>${element.buy_price.toLocaleString()} $</td>
                            <td>${element.payment}</td>
                          </tr>`);
        }
        else
        {
          $("#view").append(`<tr>
                            <td class='w3-text-green'><b>BUY</b></td>
                            <td>${day.toLocaleString()}</td>
                            <td>${img} - <a href="https://splinterlands.com/?p=card_details&id=${element.card_detail_id}&gold=${element.gold}&edition=${element.edition}&tab=market" target="_blank">${card[0].name}</a></td>
                            <td>${element.seller}</td>
                            <td>${element.purchaser.capitalize()}</td>
                            <td>${element.buy_price.toLocaleString()} $</td>
                            <td>${element.payment}</td>
                          </tr>`);
        }

        $("#spin").addClass(" w3-hide");

       });
    },
    error:function(datas){ console.log(datas);}
  });
}