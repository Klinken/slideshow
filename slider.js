

//This keeps track of the position, when changing slides in the slider, starts at first image
var currentPosition = 0;

var timeBetweenSlides = 1000; //This is set in milliseconds

var automaticSliderOn = true;

//This counts the amount of images in the slider
var images = document.getElementById("slides").children;

console.log(images);

//This adds ID to images within the slides
for(var i = 0; i < images.length; i++){
    images[i].id = `image-${i}`;
    images[i].className = "slide-image";
}

//This makes the first image visible
images[currentPosition].style.display = "block";

//This function changes the current position by 1, if given the word "add", it goes forward, else it goes backwards
function changePosition(addOrSubstract){

    images[currentPosition].style.display = "";

    addOrSubstract == "add" ? currentPosition++ : currentPosition--;

    if(currentPosition >= images.length){
        currentPosition = 0;
        images[currentPosition].style.display = "block";

    } else if(currentPosition < 0){
        currentPosition = images.length - 1;
        images[currentPosition].style.display = "block";

    } else {
        images[currentPosition].style.display = "block";

    }
}

//The following automatically changes the images after a given time
var automaticSlider = setInterval(function(){changePosition("add")}, timeBetweenSlides);


//Visual cues for the play/pause functions




/* Sets the onclick event on the buttons used to control the slide */

document.getElementById("button-forward").addEventListener("click", function(){
    changePosition("add");
    clearInterval(automaticSlider);
});

document.getElementById("button-backward").addEventListener("click", function(){
    changePosition("substract");
    clearInterval(automaticSlider);
})

document.getElementById("slides").addEventListener("click", function () {
    
    if(automaticSliderOn){
        clearInterval(automaticSlider);
        automaticSliderOn = false;
    } else {
        automaticSlider = setInterval(function(){changePosition("add")}, timeBetweenSlides);
        automaticSliderOn = true;
    }
    
});