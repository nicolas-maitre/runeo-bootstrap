var currentScrollAnimation = false;

document.addEventListener("DOMContentLoaded", function(evt){
    //bootstrap navbar, but native
    setNavbars();
    //setRunsSlider
    setRunsSlider();
});

function setNavbars(){
    //get navbars
    var navBarsList = document.getElementsByClassName("navbar");
    console.log(navBarsList);
    for(var indBar = 0; indBar < navBarsList.length; indBar++){
        setNavbar(navBarsList[indBar]);
    }
}
function setNavbar(elem){
    //__set toggleable navbar
    //get navbar elems
    var togglers = elem.getElementsByClassName("navbar-toggler");
    var navbar = (elem.getElementsByClassName("navbar-collapse")[0] || false);
    if(navbar && togglers.length > 0){
        //add events
        for(var indToggler = 0; indToggler < togglers.length; indToggler++){
            togglers[indToggler].addEventListener("click", function(evt){
                navbar.classList.toggle("collapse");
            });
        }
    }

    //__set toggleable dropdowns
    var dropdowns = elem.getElementsByClassName("dropdown");
    for(var indDrop = 0; indDrop < dropdowns.length; indDrop++){
        setDropdown(dropdowns[indDrop]);
    }
}
function setDropdown(elem){
    var toggle = (elem.getElementsByClassName("dropdown-toggle")[0] || false);
    var menu = (elem.getElementsByClassName("dropdown-menu")[0] || false);
    if(!toggle || !menu){
        return;
    }
    toggle.addEventListener("click", function(evt){
        menu.classList.toggle("show");
    });
}

/*SLIDERS*/
var lastRunSlider = "infos";
var runsSliderParams = {
    infos:{
        title: "Informations générales",
        img: "images/styleguide/calendar.svg",
        btnId: 'calendarBtn'
    },
    itineraires:{
        title: "Itinéraires",
        img: "images/styleguide/mapmarker.svg",
        btnId: 'locationBtn'
    }
};

function setRunsSlider(){
    calendarBtn.addEventListener("click", function(ev){
        sliderContainer.scrollToElem(generalInfosSection, {isHorizontal:true, time:500});
    });
    locationBtn.addEventListener("click", function(ev){
        sliderContainer.scrollToElem(itineraireSection, {isHorizontal:true, time:500});
    });
    sliderContainer.addEventListener('scroll', checkRunSliderScroll);

    cardNextBtn.addEventListener("click", function(ev){
        sliderContainer.scrollToElem(itineraireSection, {isHorizontal:true, time:500});
    });
    cardLastBtn.addEventListener("click", function(ev){
        sliderContainer.scrollToElem(generalInfosSection, {isHorizontal:true, time:500});
    });
}
function checkRunSliderScroll(){
    var selected = "infos";
    if(sliderContainer.scrollIsCloser(itineraireSection, generalInfosSection, true)){
        selected = "itineraires";
    }
    if(selected == lastRunSlider){
        return;
    }
    //set data
    var params = runsSliderParams[selected];
    slideImg.src = params.img;
    slideText.innerText = params.title;
    window[params.btnId].classList.add('selected');
    window[runsSliderParams[lastRunSlider].btnId].classList.remove('selected');
    lastRunSlider = selected;
}

Element.prototype.scrollIsCloser = function(elem1, elem2, isHorizontal = false){//closer to elem 1 than elem 2
    var scrollPosition = this['scroll' + (isHorizontal ? 'Left' : 'Top')];
    var thisPos = this.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
    var dist1 = elem1.getBoundingClientRect()[isHorizontal ? 'left' : 'top'] - thisPos;
    var dist2 = elem2.getBoundingClientRect()[isHorizontal ? 'left' : 'top'] - thisPos;
    return (Math.abs(dist1) < Math.abs(dist2));
}

function getBezierValue(y1, y2, x3){
    return 3 * x3 * Math.pow(1 - x3, 2) * y1 + 3 * Math.pow(x3, 2) * (1 - x3) * y2 + Math.pow(x3, 3);
}

function animateBezier(y1, y2, {time = 1000, animationCallBack = false, callBack = false}){
    startFrameCount = false;
    targetFrameCount = false;
    function advanceAnimation(frameCount){
        if(!startFrameCount){
            startFrameCount = frameCount;
            targetFrameCount = frameCount + time;
        }
        animationCallBack(getBezierValue(y1, y2, (frameCount - startFrameCount) / time));
        if(frameCount < targetFrameCount){
            currentScrollAnimation = requestAnimationFrame(advanceAnimation);
        }else{
            currentScrollAnimation = false;
            if(callBack) callBack();
        }
    }
    currentScrollAnimation = requestAnimationFrame(advanceAnimation);
}

Element.prototype.scrollToElem = function(elem, {isHorizontal = false, time = 1000, animationCallBack = false, callBack = false}){
    this.style['scroll-snap-type'] = "unset";
    if(currentScrollAnimation){
        console.log("cancel current animation");
        cancelAnimationFrame(currentScrollAnimation);
    }
    var initialPosition = this['scroll' + (isHorizontal ? 'Left' : 'Top')]
    var globalContainerPos = this.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
    var globalElemPos = elem.getBoundingClientRect()[isHorizontal ? 'left' : 'top'];
    var scrollFactor = globalElemPos - globalContainerPos;
    //console.log({initialPosition, globalContainerPos, globalElemPos, scrollFactor});

    animateBezier(0.2, 1, {time:time, animationCallBack:(advancement) => {
        this['scroll' + (isHorizontal ? 'Left' : 'Top')] = initialPosition + (scrollFactor * advancement);
        if(animationCallBack) animationCallBack(advancement);
    }, callBack: () => {
        this.style['scroll-snap-type'] = "";
        if(callBack) callBack();
    }});
};