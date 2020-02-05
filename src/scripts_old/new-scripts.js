$(document).ready(function () {
    $('.mobile-btn_menu').on('click', function (e) {
        e.preventDefault();
        $('.header__menu').toggleClass('is-active');
    });

    $('.mobile-btn_basket').on('click', function (e) {
        e.preventDefault();
        console.log(1);
        $('.category__menu').toggleClass('is-active');
        $("body").css("overflow", "hidden");
        $('.category__menu_list').trigger('click');
    });

    $('.aside__row_total').on('click', function (e) {
        e.preventDefault();
        $('.popap-basket').toggleClass('is-active');
    });

    $('.mobile-close').on('click', function (e) {
        e.preventDefault();
        $(this).parent().removeClass('is-active');
        $("body").css("overflow", "auto");

    });

    $('.category__menu_item.has-child').on('click', function (e) {
        var li = $('.category__menu_item.has-child');
        if (li.has(e.target).length === 0) {
            $(this).toggleClass('show-submenu');
        }

    });

    $('.category__submenu_item.has-child').on('click', function () {
        $(this).toggleClass('show-submenu');
    });
    $('.js-dotted').dotdotdot();


    $('.folding-btn').on('click', function (e) {
        var textBtn = $(this).html();
        e.preventDefault();
        $(this).siblings().toggleClass('folding-show');
        if (textBtn == 'Показать еще') {
            $(this).html('Скрыть список');
        } else {
            $(this).html('Показать еще');
        }
    });

})
$(window).resize(function () {
    if (document.documentElement.clientWidth < 490) {

//         $('.goods__list').readmore({
//             speed: 330,
//             moreLink: '<a href="#" class="show-readmore">показать все</a>',
//             lessLink: '<a href="#" class="hide-readmore">скрыть список</a>',
//             embedCSS: true,
// //                blockCSS: 'display: block; width: 225px;',
//             startOpen: false
//         });

        // $('.aside__news_text').readmore({
        //     speed: 200,
        //     moreLink: '<a href="#" class="show-readmore">показать все <i>▼</i></a>',
        //     lessLink: '<a href="#" class="hide-readmore">скрыть список <i>▲</i></a>',
        //     embedCSS: true,
        //     blockCSS: 'display: block; width: 100%;',
        //     startOpen: false
        // });

        $('.js-dotted').dotdotdot();

    } else {
        // $('.goods__list').readmore('destroy');
        // $('.aside__news_text').readmore('destroy');
    }
    ;


});

if (document.documentElement.clientWidth < 490) {

    // $('.goods__list').readmore({
    //     speed: 200,
    //     moreLink: '<a href="#" class="show-readmore">показать все <i>▼</i></a>',
    //     lessLink: '<a href="#" class="hide-readmore">скрыть список <i>▲</i></a>',
    //     embedCSS: true,
    //     maxHeight: 360,
    //     blockCSS: 'display: block; width: 200px;',
    //     startOpen: false
    // });

    // $('.aside__news_text').readmore({
    //     speed: 200,
    //     moreLink: '<a href="#" class="show-readmore">показать еще <i>▼</i></a>',
    //     lessLink: '<a href="#" class="hide-readmore">скрыть список <i>▲</i></a>',
    //     embedCSS: true,
    //     blockCSS: 'display: block; width: 100%;',
    //     startOpen: false
    // });

    $('.js-dotted').dotdotdot();
}
;

$(function () {
    /*простые табы*/
    $(".product-card .tabs-menu a").click(function (event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });


    $('.catalog-filter__title').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.catalog-filter').toggleClass('active');
    })
});
$(document).ready(function () {
    $('.catalog-filter__list .checkbox').change(function () {
        var items = {};
        $.each($('.catalog-filter__list .checkbox'), function (i, item) {
            if ($(this).prop('checked'))
                items[i] = $(this).val();
        });
        showLoader();
        $.ajax({
            method: 'POST',
            data: {
                ajax: true,
                section: items
            },
            success: function (res) {
                $('#replace').html(res);
                setAllHeight();
                endLoader();
            }
        })
    });

    $(document).on('click', '#show_more', function (e) {
        e.preventDefault();
        var page = $(this).data('page');
        var link = $(this).data('link');
        $.ajax({
            url: link,
            success: function (e) {
                var folding = $(e).find('.folding-layout').html();
                $('#pagen_layout').append(folding);
                console.log($(e).find('.c-pagination'))
                $('.c-pagination').html($(e).find('.c-pagination').html());
                initCatalog();
            }
        })
    })

    var ajaxAddCartCall = false;

    // анимация отправки в корзину
    $(document).on('click', '.js-add-cart', function () {
        if (ajaxAddCartCall) {
            return false;
        } else {
            ajaxAddCartCall = true;
        }

        var $this = $(this);
        var url = templateFolder + '/ajax/ajax_add_cart.php';
        var data = {
            id: $this.data('id'),
            quantity: $this.parent().find('input').val()
        };

        $.ajax({
            url: url,
            dataType: "json",
            type: "post",
            data: data,
            success: function (data, textStatus) {
                ajaxAddCartCall = false;

                if (data.result) {
                    $this.parent('.goods__row_buy').addClass('goods__row_buy-js');
                    $this.parent().siblings('.goods__bought').addClass('goods__bought-js');
                    $(document).trigger('addNewItemCartEvent', data);
                    if ($('.basket-fly').length > 0) {
                        $('.basket-fly').removeClass('empty');
                        $('.basket-fly .basket-fly__cnt span').html(data.basket.count)
                    }
                } else {
                    alert(data.error);
                }
            }
        });
    });

});

function showLoader() {
    if (!window.loadingScreen) {
        window.loadingScreen = new BX.PopupWindow("loading_screen", null, {
            overlay: {backgroundColor: 'white', opacity: '80'},
            events: {
                onAfterPopupShow: BX.delegate(function () {
                    BX.cleanNode(window.loadingScreen.popupContainer);
                    BX.removeClass(window.loadingScreen.popupContainer, 'popup-window');
                    this.loadingScreen.popupContainer.appendChild(
                        BX.create('IMG', {props: {src: "/bitrix/templates/main_adaptive/loader.gif"}})
                    );
                    window.loadingScreen.popupContainer.removeAttribute('style');
                    window.loadingScreen.popupContainer.style.display = 'block';
                }, this)
            }
        });
        BX.addClass(window.loadingScreen.popupContainer, 'bx-step-opacity');
    }
    window.loadingScreen.show();
}

function endLoader() {
    if (window.loadingScreen && window.loadingScreen.isShown())
        window.loadingScreen.close();
}


function setAllHeight() {
    setEqualHeight($('.goods__category'), 3);
    setEqualHeight($('.plashka'), 4);
    setEqualHeight($('.goods__name'), 4);
    setEqualHeight($('.goods__price.v2'), 4);
}

function initCatalog() {
    // блоки одинаковой высоты
    setAllHeight();

}