var pagesConfig = {
    home:{
        title: "Accueil"
    },
    runs:{
        title: "Runs"
    },
    createRun:{
        title: "Créer un Run"
    }
};
var currentPage = "home"; //also sets default page
document.addEventListener("DOMContentLoaded", function(evt){
    //show home page
    changePage(currentPage);

    //transform into dynamic links
    [...document.body.getElementsByTagName("a")].forEach(link=>setDynamicLink(link))
});
function setDynamicLink(elem){
    console.log("setDynamicLink", elem);
    var href = elem.getAttribute("href");
    var page = href.split("/")[1];
    console.log("aaaa", page)
    if(pagesConfig[page]){
        //add event
        elem.addEventListener("click", function(evt){
            evt.preventDefault();
            elem.removeAttribute("href");
            //change page
            changePage(page);
            //put back href
            requestAnimationFrame(function(frameTime){
                elem.setAttribute("href", href);
            });
        });
    }
}
function changePage(pageName){
    console.log("changePage", pageName);
    //hide current page
    window[currentPage + "Page"].classList.add("none");
    //show page
    window[pageName + "Page"].classList.remove("none");
    //set title
    document.title = pagesConfig[pageName].title;
    //set currentPage
    currentPage = pageName;
}