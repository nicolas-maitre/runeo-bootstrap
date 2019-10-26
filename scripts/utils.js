document.addEventListener("DOMContentLoaded", function(evt){
    //bootstrap navbar, but native
    setNavbars();
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