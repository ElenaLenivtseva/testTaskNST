$(document).ready(function () {
    $('.test__time-top').slick({
        dots: false,
        infinite: false,
        asNavFor: ".test__time-bottom"
    });
    $(".test__time-bottom").slick({
        arrows: false,
        dots: false,
        infinite: false,
        asNavFor: ".test__time-top"
      });
})
