// Load All Received Bills Total Amount

const date = new Date();
const [month, day, year] = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear(),
];
const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
];

window.electron.show_store_account_status(new Date().toJSON().slice(0, 10))

function checkAllBillsTotalAmountDetails() {
    document.getElementById('real_amount').value = 0
    var choosenDate = new Date(document.getElementById('chosenDate').value)
    // console.log(choosenDate.getFullYear() + '-' + (choosenDate.getMonth() + 1) + '-' + choosenDate.getDate())
    window.electron.show_store_account_status(choosenDate.getFullYear() + '-' + (choosenDate.getMonth() + 1) + '-' + choosenDate.getDate())
}


function missingAmountCalculation() {
    document.getElementById('missing_amount').value = parseInt(document.getElementById('final_amount').value) - parseInt(document.getElementById('real_amount').value)
}