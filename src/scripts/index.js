window.onload = function() {
    $(document).on('click','.js-catalog-menu .arrow', function(e){
        if ($(this).parent().hasClass('active')){
            $(this).parent().removeClass('active');
        } else{
            $(this).parent().addClass('active');
        }
    });
    $('.js-input-change').bind('input', function() {
        var $this = $(this);
        var delay = 500;
        clearTimeout($this.data('timer'));
        $this.data('timer', setTimeout(function(){
            if ($this.context.value){
                $('.js-input-change-baloon').addClass('active');
            } else{
                $('.js-input-change-baloon').removeClass('active');
            }
        }, delay));
    });
    $('.js-input-change').focus(function(e) {
        if ($(this).context.value){
            $('.js-input-change-baloon').addClass('active');
        }
    });
    $(document).on('click', function(e){
        var element = $('.js-input-change-baloon');
        var parent = $('.header__search')
        if (element.has(e.target).length === 0 && parent.has(e.target).length === 0){
            element.removeClass('active');
        }
    });
    $(document).on('click','.js-select-city', function(e){
        e.stopPropagation();
        $('.js-select-city-baloon').addClass('active');
    });
    $('.js-baloon-close').on('click', function(e){
        e.preventDefault();
        $('.js-select-city-baloon').removeClass('active');
    });
    
    $(document).on('click', function(e){
        var element = $('.js-select-city-baloon');
        if (element.has(e.target).length === 0){
            element.removeClass('active');
        }
    });
    $(document).on('click','.js-show-cart', function(e){
        e.stopPropagation();
        $('.js-cart-baloon').addClass('active');
        $('.js-show-cart').addClass('active');
    });
    $(document).on('click', function(e){
        var element = $('.js-cart-baloon');
        if (element.has(e.target).length === 0){
            element.removeClass('active');
            $('.js-show-cart').removeClass('active');
        }
    });

    if ($('.js-custom-scroll').length){
        window.dima = baron({
            root: '.js-custom-scroll',
            scroller: '.baron__scroller',
            bar: '.baron__bar'
        }).autoUpdate(); 
    }
    if ($('.js-custom-scroll-menu').length){
        window.dima = baron({
            root: '.js-custom-scroll-menu',
            scroller: '.baron__scroller',
            bar: '.baron__bar'
        }).autoUpdate(); 
    }
    
    $('.js-minus').on('click', function(e){
        var count = parseInt($(this).siblings('.js-input').val());
        if (count==1){
            $(this).parents('.js-good-item').removeClass('in-cart');
        }
        if (count > 0){
            $(this).siblings('.js-input').val(count-1);
        }
    });
    $('.js-plus').on('click', function(e){
        var count = parseInt($(this).siblings('.js-input').val());
        var max = parseInt($(this).siblings('.js-input').data('max'));
        if (count==0){
            $(this).parents('.js-good-item').addClass('in-cart');
        }
        if (count < max){
            $(this).siblings('.js-input').val(count+1);
        }
    });

    $('.js-select-city-link').on('click', function(e){
        $('.js-select-city-link').removeClass('active');
        $(this).addClass('active');
    });

    /* корзина */
    function cartScroll() {
        if (asideWrapper == null) {
            asideWrapper = document.createElement('div');
            asideWrapper.style.cssText = 'box-sizing: border-box; width: ' + asideCart.offsetWidth + 'px;';
            asideCart.insertBefore(asideWrapper, asideCart.firstChild);
            var l = asideCart.childNodes.length;
            for (var i = 1; i < l; i++) {
                asideWrapper.appendChild(asideCart.childNodes[1]);
            }
            asideCart.style.height = asideWrapper.getBoundingClientRect().height + 'px';
        }
        var Ra = asideCart.getBoundingClientRect(),
            R = Math.round(Ra.top + asideWrapper.getBoundingClientRect().height - document.querySelector('.js-cart').getBoundingClientRect().bottom);
        if ((Ra.top - P) <= 0 && window.innerWidth>1170) {
            if ((Ra.top - P) <= R) {
                asideWrapper.className = 'stop';
                asideWrapper.style.top = - R +'px';
            } else {
                asideWrapper.className = 'sticky';
                asideWrapper.style.top = P + 'px';
            }
        } else {
            asideWrapper.className = '';
            asideWrapper.style.top = '';
        }
        window.addEventListener('resize', function() {
            asideCart.children[0].style.width = getComputedStyle(asideCart, '').width;
            if (window.innerWidth<=1170){
                asideWrapper.className = '';
                asideWrapper.style.top = '';
                asideCart.style.height = 'auto';
            }
        }, false);
    }

    if ($('.js-aside').length){
        var asideCart = document.querySelector('.js-aside'), 
            asideWrapper = null, 
            P = 0;
        window.addEventListener('scroll', cartScroll, false);
        document.body.addEventListener('scroll', cartScroll, false);
    }

    $('.js-minus-cart').on('click', function(e){
        var count = parseInt($(this).siblings('.js-input-cart').val());
        if (count > 1){
            $(this).siblings('.js-input-cart').val(count-1);
        }
    });
    $('.js-plus-cart').on('click', function(e){
        var count = parseInt($(this).siblings('.js-input-cart').val());
        var max = parseInt($(this).siblings('.js-input-cart').data('max'));
        if (count < max){
            $(this).siblings('.js-input-cart').val(count+1);
        }
    });

    $('.js-snegiri-button').on('click', function(e){
        e.preventDefault();
        var button = $(this),
            inputParent = $('.js-snegiri-input'),
            input = $('.js-snegiri-input input');
        if (inputParent.hasClass('locked')){
            inputParent.removeClass('locked');
            input.attr('readonly', false);
            button.text('Применить карту');
        } else{
            if (/^[0-9]+$/.test(input.val())){
                inputParent.addClass('locked');
                input.attr('readonly', true);
                button.text('Удалить карту');
            }
        }

    });

    // страница "Товары недели"
    $(document).on('click','.js-show-categories', function(e){
        $('.js-categories').toggleClass("active");
    });
    $(document).on('click','.js-remove-categories', function(e){
        var items = [];
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
                $('.catalog-filter__list .checkbox').prop('checked', false);
                endLoader();
            }
        })
    });

    // личный кабинет
    $(document).on('click','.js-history-item', function(e){
        let id = $(this).data('id');
        $('.js-history').addClass('hide');
        $('.js-history-more').removeClass('show');
        $('#'+id+'.js-history-more').addClass('show');
    });
    $(document).on('click','.js-history-back', function(e){
        $('.js-history').removeClass('hide');
        $('.js-history-more').removeClass('show');
    });
    $(document).on('click','.js-history-delete', function(e){
        e.stopPropagation();
    });
    $(document).on('click','.js-history-repeat', function(e){
        e.stopPropagation();
    });
    $(document).on('click','.js-favorite-add', function(e){
        $(this).toggleClass("active");
    });
    $(document).on('click','.js-address-edit', function(e){
        $(this).parents('.js-address').addClass('editing');
    });
    $(document).on('click','.js-address-edit-exit', function(e){
        $(this).parents('.js-address').removeClass('editing');
    });

    // страница пирогов
    $(document).on('click','.js-pie-minus', function(e){
        var count = parseInt($(this).siblings('.js-pie-input').find('input').val());
        var price = $(this).siblings('.js-pie-input').find('.js-pie-price').data('price').toString().replace(/\,/g,'.');
        if (count==1){
            $(this).parents('.js-pie').removeClass('in-cart');
        }
        if (count > 0){
            $(this).siblings('.js-pie-input').find('input').val(count-1);
        }
        if (count > 1){
            var currentPrice = (price*(count-1)).toFixed(2);
            currentPrice = currentPrice.toString().replace(/\./g,',');
            $(this).siblings('.js-pie-input').find('.js-pie-price').text(currentPrice);
        }
    });
    $(document).on('click','.js-pie-plus', function(e){
        var count = parseInt($(this).siblings('.js-pie-input').find('input').val());
        var max = parseInt($(this).siblings('.js-pie-input').find('input').data('max'));
        var price = $(this).siblings('.js-pie-input').find('.js-pie-price').data('price').toString().replace(/\,/g,'.');
        if (count==0){
            $(this).parents('.js-pie').addClass('in-cart');
        }
        if (count < max){
            $(this).siblings('.js-pie-input').find('input').val(count+1);
            var currentPrice = (price*(count+1)).toFixed(2);
            currentPrice = currentPrice.toString().replace(/\./g,',');
            $(this).siblings('.js-pie-input').find('.js-pie-price').text(currentPrice);
        }
    });

    // корзина пироги
    $(document).on('click','.js-cart-tab-all', function(e){
        $('.js-cart-tab-pies').removeClass('active');
        $(this).addClass('active');
        $('.js-cart-all').removeClass('mod-hide');
        $('.js-cart-pies').addClass('mod-hide');
    });
    $(document).on('click','.js-cart-tab-pies', function(e){
        $('.js-cart-tab-all').removeClass('active');
        $(this).addClass('active');
        $('.js-cart-pies').removeClass('mod-hide');
        $('.js-cart-all').addClass('mod-hide');

    });
    
};