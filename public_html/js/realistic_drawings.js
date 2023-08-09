/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var exibitionTime;
var picture;
var maxPic;
var currentPic = 1;

function startSlide() {
    exibitionTime = 5000;
    picture = document.getElementById("picture");
    maxPic = 4;
    setInterval(nextPic, exibitionTime);
}

function nextPic() {
    currentPic = currentPic + 1;
    if (currentPic > maxPic){
        currentPic = 1;
    }
    picture.src = "../img_realistic/img_"+currentPic+".jpg";
}

function prevPic() {
    currentPic = currentPic - 1;
    if (currentPic < 1){
        currentPic = maxPic;
    }
    picture.src = "../img_realistic/img_"+currentPic+".jpg";
}