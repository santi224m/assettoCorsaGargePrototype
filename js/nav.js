var myNav = document.getElementById('navbar');
window.onscroll = function () { 
    "use strict";
    if (document.querySelector('html').scrollTop >= 200 ) {
        myNav.classList.add("nav-colored");
        myNav.classList.remove("nav-transparent");
    } 
    else {
        myNav.classList.add("nav-transparent");
        myNav.classList.remove("nav-colored");
    }
};

