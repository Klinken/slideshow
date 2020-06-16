//This keeps track of the position, when changing slides in the slider, starts at the first image
var currentPosition = 0;

var timeBetweenSlides = 7000; //This is set in milliseconds
var animationLength = 1; //This is set in seconds

var automaticSliderOn = true;

//On load, set buttons svg
document.getElementById("button-backward").innerHTML = "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='m24 21c-2.7-11.9-16-14-16-14v-4l-8 8 8 8v-4s10.2-0.2 16 6z'/></svg>";
document.getElementById("button-forward").innerHTML = "<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M16 15v4l8-8.035-8-7.965v4s-13.277 2.144-16 14c5.796-6.206 16-6 16-6z'/></svg>";

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
    var imageStyle = images[position].style;
    imageStyle.display = "block";
    imageStyle.animation = "slideanimation " + animationLength + "s";

    document.getElementById("slide-text").innerHTML = "<p>" + images[position].alt + "</p>";

//This part makes sure, that the first image gets its title set
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