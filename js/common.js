sliderLeft();
var left = 0;
var timer;
                                            //IMAGE SLIDER FOR PAGES
function sliderLeft() {
    timer = setTimeout( function () {
            var polosa = document.getElementById('polosa');
            // var polosa = document.getElementById('banner');
            left -= 1300;
            if (left < -9100) {
                left = 0;
                clearTimeout(timer);
            }
            polosa.style.left = left + 'px';
            sliderLeft();
        },4000);
};

const $body = $('html');
const div = $('div#main div');
                                            // BUTTON PAGE DOWN
$(document).ready(function() {
    var elm_class = '.down'; // Adjust this accordingly.
    //Check to see if the window is top if not then display button
    $(window).scroll(function(){
        if ($(this).scrollTop() > 300) { // 300px from top
            $(elm_class).fadeOut();      // HIDE BUTTON
        } else {
            $(elm_class).fadeIn();      // SHOW BUTTON
        }
    });
    $(".down").mouseover(function() {      // ANIMATION BUTTON - PAGE GO DOWN
        $('html, body').animate({
            scrollTop: $body.height()
        }, 3000);
    });
    $('html, body').click(function () { // STOP ANIMATION
        $('html, body').stop();
    });
});
// animation button page down and stop it

                                            //LOGIN SLIDE DOWN
$(document).ready(function () {
    $('#authorization').click(function () {
        $('#slide').slideToggle('slow');
    });
});
//
// $(document).ready(function () {
//     div.hide();
//     $(this).scroll(function () {
//         div
//     });
// });