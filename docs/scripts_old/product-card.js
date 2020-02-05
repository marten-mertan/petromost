$(function(){

    $('#pie-popup-form input').on('change', function() {
        var deliveryVAlue = $('input[name=pie-radio-delivery]:checked').val();
        // console.log(deliveryVAlue);
        if(deliveryVAlue == 'delivery-2'){
            $('.popup-pie-address').slideUp(300);
            $('.popup-pie-pickup').slideDown(300);
        }else{
            $('.popup-pie-pickup').slideUp(300);
            $('.popup-pie-address').slideDown(300);
        }
    });

    if( $('.c-select').length>0) {
        $('.c-select').SumoSelect();
    }

    var $datepicker = $('.datepicker-custom');
    var date = new Date();
    date.setDate(date.getDate()+2);
    if($datepicker.length>0) {
        $datepicker.datepicker({
            autoClose: true,
            minDate: date
        });
    }

    $(document).on('click', '.datepicker-layout__icon', function(e){
        e.preventDefault();
        $('.datepicker-custom').trigger('focus');
    });
if($('.js-input-phone').length>0) {
    $('.js-input-phone').mask('+7(000)000-00-00');
}


    $(document).on('click', '.js-popup-close', function (e) {
        e.preventDefault();
        var $html = $('html');
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('lock-html');
        $('.wrapper').removeClass('fixed-input');
        $('.header.sticky').css({
            // 'right':'0'
        });
    });



    showPopup(".js-pie-popup", '.popup-pie-order');


    $('.pie .number span').click(function () {
        var id = $(this).data('id');
        totalPie(id);
    });

    $('#pie-popup-form .number span').click(function () {
        var id = $(this).attr('data-id');
        var card = $('#'+id);
        var form = $('#pie-popup-form');
        card.find('input.inp').val(form.find('input.inp').val());
        totalPie(id);
    });

    $('.popup-pie-order-success .goods__in_cart').click(function (e) {
        e.preventDefault();
        $('.js-popup-close').click();
    });


});

var windowWidth = (window.innerWidth ); // вся ширина окна
var documentWidth = (document.documentElement.clientWidth );
function showPopup(icon, popup) {
    $(document).on('click', icon, function (e) {
        var $html = $('html');
        e.preventDefault();
        $(popup).addClass('is-visible');
        $('.mfp-bg').addClass('is-visible');


        $html.addClass('lock-html');
        $('body').addClass('fixed-input');
        if(windowWidth > documentWidth){
            $html.css({
                'margin-right':'17px'
            });
            $('.mfp-wrap').css({
                'overflow-y':'scroll'
            });
            // console.log('Есть полоса прокрутки');
        }else {
            // console.log('Нет полосы прокрутки');
        }
    });
}

function openPopup(popup) {
    var $html = $('html');
    $(popup).addClass('is-visible');
    $('.mfp-bg').addClass('is-visible');

    $html.addClass('lock-html');
    $('body').addClass('fixed-input');
    if(windowWidth > documentWidth){
        $html.css({
            'margin-right':'17px'
        });
        $('.mfp-wrap').css({
            'overflow-y':'scroll'
        });
        // console.log('Есть полоса прокрутки');
    }else {
        // console.log('Нет полосы прокрутки');
    }
}


showPopup('.auth__reg','.popup_auth');