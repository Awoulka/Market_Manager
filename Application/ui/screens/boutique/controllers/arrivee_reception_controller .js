// Load all informations about article

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split("&");
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

const bonsortie_id = GetURLParameter("bonsortie_id");
// var bonsortie_id = localStorage.getItem('bonsortie_id')
// const hideButton = GetURLParameter("hideButton");
// hideReceiveButton(hideButton)
// function hideReceiveButton(value) {
//     document.getElementById('hideButton').hidden = value
// }


window.electron.show_new_arrival_details(bonsortie_id);


function receiveBonSortie() {
    window.electron.receiveNewBonSortie(bonsortie_id)
}