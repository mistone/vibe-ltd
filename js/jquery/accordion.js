$(document).ready(function() {


    $('.accordionButton').click(function() {


        $('.accordionButton').removeClass('on');


        $('.accordionContent').slideUp('normal');


        if ($(this).next().is(':hidden') == true) {

            //ADD THE ON CLASS TO THE BUTTON
            $(this).addClass('on');

            //OPEN THE SLIDE
            $(this).next().slideDown('normal');
        }

    });

$('.accordionButton').mouseover(function() {
        $(this).addClass('over');


    }).mouseout(function() {
        $(this).removeClass('over');
    });


    $('.accordionContent').hide();

});