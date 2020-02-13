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
};