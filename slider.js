

//This keeps track of the position where in the slider, starts at first image
var currentPosition = 0;

//This counts the amount of images in the slider
var images = document.getElementById("slides").children; 

//This makes the first image visible
images[currentPosition].id = "visible";

//This function changes the current position by 1, if given the word "add", it goes forward, else it goes backwards
function changePosition(addOrSubstract){
    images[currentPosition].id = "";

    addOrSubstract == "add" ? currentPosition++ : currentPosition--;

    if(currentPosition >= images.length){
        currentPosition = 0;
        images[currentPosition].id = "visible";

    } else if(currentPosition < 0){
        currentPosition = images.length - 1;
        images[currentPosition].id = "visible";

    } else {
        images[currentPosition].id = "visible";
        
    }
}



/* Sets the onclick event on the buttons used to control the slide */

document.getElementById("button-forward").addEventListener("click", function(){
    changePosition("add");
});
document.getElementById("button-backward").addEventListener("click", function(){
    changePosition("substract");
})