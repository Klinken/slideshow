//This keeps track of the position, when changing slides in the slider, starts at first image
var currentPosition = 0;

var timeBetweenSlides = 5000; //This is set in milliseconds
var animationTime = 1; //This is set in seconds

var automaticSliderOn = true;

//This counts the amount of images in the slider
var images = document.getElementById("slides").children;

//This adds ID to images within the slides
for (var i = 0; i < images.length; i++) {
    images[i].id = "image-" + i;
    images[i].className = "slide-image";
}

//This makes the first image visible
styleSlide(currentPosition);

//This function changes the current position by 1, if given the word "add", it goes forward, else it goes backwards
function changePosition(addOrSubstract) {

    images[currentPosition].style.display = "";

    addOrSubstract == "add" ? currentPosition++ : currentPosition--;

    if (currentPosition >= images.length) {
        currentPosition = 0;
        styleSlide(currentPosition);

    } else if (currentPosition < 0) {
        currentPosition = images.length - 1;
        styleSlide(currentPosition);

    } else {
        styleSlide(currentPosition);

    }
}

//Helper function, used for styling the current slide
function styleSlide(position) {
    images[position].style.display = "block";
    images[position].style.animation = "slideanimation " + animationTime + "s";

    document.getElementById("slide-text").innerHTML = "<p>" + images[position].alt + "</p>";

    if (automaticSliderOn) {
        images[currentPosition].title = "Click to stop the slideshow";
    }
}


//The following automatically changes the images after a given time
var automaticSlider = setInterval(function () {
    changePosition("add");
}, timeBetweenSlides);


/* Sets the onclick event on the buttons used to control the slide */

document.getElementById("button-forward").addEventListener("click", function () {
    changePosition("add");
    clearInterval(automaticSlider);
});

document.getElementById("button-backward").addEventListener("click", function () {
    changePosition("substract");
    clearInterval(automaticSlider);
});

document.getElementById("slides").addEventListener("click", function () {

    if (automaticSliderOn) {
        automaticSliderOn = false;
        clearInterval(automaticSlider);
        images[currentPosition].title = "Click to start the slideshow";

    } else {
        automaticSlider = setInterval(function () {
            changePosition("add");
        }, timeBetweenSlides);
        automaticSliderOn = true;
        images[currentPosition].title = "Click to stop the slideshow";
    }

});