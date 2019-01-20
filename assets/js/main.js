$(document).scroll(function() {
    if($(document).scrollTop() > 0){
        $('nav.scrolling-navbar').css('background-color','rgba(17, 19, 41, 1)');
    }else{
        $('nav.scrolling-navbar').css('background-color','rgba(17, 19, 41, 0.5)');
    }
});