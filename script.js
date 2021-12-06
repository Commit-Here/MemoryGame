/**
 * On load
 * 
 * 1.) assign colors to boxes
 * 2.) each color twice
 * 3.) 4x4 = 16 boxes
 * 4.) We need 8 colors.
 * 5.) colors are hidden intially.
 * 6.) colors should reveal on click. (onClick remove hideColor class)
 * 7.) after clicking two boxes 
 *       7.1) if different hide again.
 *       7.2) if same freeze
 * 8.) after all boxes are revealed then alert YAY.
 */

const colors = ['#caccd1', '#52565e', '#ffdd00', '#3be8b0', '#013ca6', '#a71930', '#ff6319', '#52057f'];
const boxes = document.getElementsByClassName('box');
// const boxes = document.querySelectorAll('.box');
const boxesLen = boxes.length;

var indexJ = 0;
var clickedBoxes = [];

function addId(i){
    boxes[i].id = 'box'+i;
}

function assignColors(i){
        if (i < colors.length)
            boxes[i].style.background = colors[i];
        else{
            boxes[i].style.background = colors[indexJ];
            indexJ++;
        } // else
} // assignColors

function resetClickedArray(){
    clickedBoxes = [];
}

function hideBoxesAfterSomeTime(objOfBox1, objOfBox2){
    setTimeout(function hideColor(){
        objOfBox1.classList.add('hideColor');
        objOfBox2.classList.add('hideColor');
    }, 300);
}

function freezeBoxes(objOfBox1, objOfBox2){
    objOfBox1.classList.add('freeze');
    objOfBox2.classList.add('freeze');
}

function checkIfGameFinished(){
    var frozenBoxes = document.querySelectorAll('.box.freeze');
    if (frozenBoxes.length == 16){
        setTimeout(function endOfGame(){
            alert('YaY!');
            window.location.reload();
        }, 500);
    }
}

function checkClickedBoxes(){
    var idOfBox1 = clickedBoxes[0];
    var idOfBox2 = clickedBoxes[1];
    var objOfBox1 = document.getElementById(idOfBox1);
    var objOfBox2 = document.getElementById(idOfBox2);

    if (clickedBoxes.length == 2)
    {
        if (idOfBox1 != idOfBox2){
            // If Same 
            if (objOfBox1.style.background == objOfBox2.style.background)
                freezeBoxes(objOfBox1, objOfBox2);
            // If different
            else
                hideBoxesAfterSomeTime(objOfBox1, objOfBox2);
        }
        else
            hideBoxesAfterSomeTime(objOfBox1, objOfBox2);
        resetClickedArray();
        checkIfGameFinished();
    }
}

function clickHandler(){
    var clickedBox = this;
    if (clickedBox.classList.contains('freeze') == false){
        clickedBoxes.push(clickedBox.id);
        clickedBox.classList.remove('hideColor');
        checkClickedBoxes();
    }
}

function randomizeColors(i){
        boxes[i].style.order = parseInt(Math.random()*boxesLen)
}

function handleClick(i){
    // Registering the event listener for each of the boxes with parameters as type of event and actionPeformed reponse.
    boxes[i].addEventListener('click', clickHandler);
}

function init(){
    for (var i=0; i<boxesLen; i++){
        addId(i)
        assignColors(i);
        randomizeColors(i);
        handleClick(i)
    }
}

init();