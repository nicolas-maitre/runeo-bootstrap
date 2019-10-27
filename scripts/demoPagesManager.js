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
var currentPage = "createRun"; //also sets default page
document.addEventListener("DOMContentLoaded", function(evt){
    //show home page
    changePage(currentPage);

    //transform into dynamic links
    var allLinks = document.getElementsByTagName("a");
    for(var indLink = 0; indLink < allLinks.length; indLink++){
        setDynamicLink(allLinks[indLink]);
    }
});
function setDynamicLink(elem){
    //console.log("setDynamicLink", elem);
    var href = elem.pathname;
    var page = href.split("/")[1];
    if(pagesConfig[page]){
        //add event
        elem.addEventListener("click", function(evt){
            elem.removeAttribute("href");
            evt.preventDefault();
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