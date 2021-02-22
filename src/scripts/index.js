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
    $(document).mousedown(function (e){
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
    
    $(document).mousedown(function (e){
        var element = $('.js-select-city-baloon');
        var parent = $('.js-select-city');
        if (!element.is(e.target) && element.has(e.target).length === 0 && !parent.is(e.target)){
            element.removeClass('active');
        }
    });
    $(document).on('click','.js-show-cart', function(e){
        e.stopPropagation();
        $('.js-cart-baloon').addClass('active');
        $('.js-show-cart').addClass('active');
    });
    $(document).mousedown(function (e){
        var element = $('.js-cart-baloon');
        var parent = $('.js-show-cart');
        if (!element.is(e.target) && element.has(e.target).length === 0 && parent.has(e.target).length === 0){
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
    if ($('.js-custom-scroll-checkout').length){
        window.dima = baron({
            root: '.js-custom-scroll-checkout',
            scroller: '.baron-checkout__scroller',
            bar: '.baron-checkout__bar'
        }).autoUpdate(); 
    }
    
    $('.js-minus').on('click', function(e){
        var $this = $(this);
        var $input = $this.parents('.js-good-item').find('.js-input');
        var result = 0;
        var count = Math.round($input.val()*100) / 100;
        var step = Math.round($input.data('step')*100) / 100;
        if (!step){
            step = 1;
            result = (count-step).toFixed();
        } else{
            result = (count-step).toFixed(1);
        }
        if (count<=step){
            $(this).parents('.js-good-item').removeClass('in-cart');
        }
        if (count > 0){
            $input.val(result);
        }
    });

    var ageModalCallback = function(){
        return 0;
    };

    $('.js-plus').on('click', function(e){
        var $this = $(this);
        var $input = $this.parents('.js-good-item').find('.js-input');
        var result = 0;
        var count = Math.round($input.val()*100) / 100;
        var max = Math.round($input.data('max')*100) / 100;
        var step = Math.round($input.data('step')*100) / 100;
        if (!step){
            step = 1;
            result = (count+step).toFixed();
        } else{
            result = (count+step).toFixed(1);
        }
        if ($(this).hasClass('js-for-adults')){
            if (count<=0){
                ageModalCallback = function(){
                    e.preventDefault();
                    $('.js-plus').removeClass('js-for-adults');
                    $this.parents('.js-good-item').addClass('in-cart');
                    if (count < max){
                        $input.val(result);
                    }
                }
            }
        } else{
            if (count<=0){
                $(this).parents('.js-good-item').addClass('in-cart');
            }
            if (count < max){
                console.log('1');
                $input.val(result);
            }
        }
    });
    
    $('.js-age-accept').on('click', function(e){
        ageModalCallback();
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
    $(document).on('click','.js-show-categories.active', function(e){
        e.preventDefault();
        $('.js-categories').toggleClass("active");
    });
    $(document).on('click','.js-show-categories:not(.active)', function(e){
        e.preventDefault();
        let ref = $(this).attr('href')
        $('.js-categories').addClass("active");
        $('.js-categories-tab').removeClass('active');
        $(ref).addClass('active');
        $('.js-show-categories').removeClass('active');
        $(this).addClass('active');
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
                $( '.js-slider-filter' ).slider( 'values', 0, Number($( ".js-slider-filter" ).data('min')));
                $( '.js-slider-filter' ).slider( 'values', 1, Number($( ".js-slider-filter" ).data('max')));
                $( '.js-slider-min' ).val(Number($( ".js-slider-filter" ).data('min')));
                $( '.js-slider-max' ).val(Number($( ".js-slider-filter" ).data('max')));
                $('.js-purchases-btn').removeClass('active');
                $('.js-purchases-buttons .js-purchases-btn:first-child').addClass('active');
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
        let circlePosition = $('#'+id+'.js-history-more .js-circle-active').position();
        $('#'+id+'.js-history-more .js-tracker').scrollLeft(circlePosition.left - 146);
        $('html').animate({scrollTop: $('#'+id+'.js-history-more').offset().top}, 300);
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

    // checkout
    function checkSnegiri(){
        $('.js-snegiri-input').val();
        if ($('.js-snegiri-button').text()=='Удалить карту'){
            return true;
        } else{
            return false;
        }
    }

    function checkBuys(){
        if ($('.js-buy-item').length){
            return true;
        } else{
            return false;
        }
    }

    function checkDelivery(){
        if ($('.js-delivery-item input:checked').length){
            return true;
        } else{
            return false;
        }
    }

    function checkPayment(){
        if ($('.js-payment-item input:checked').length){
            return true;
        } else{
            return false;
        }
    }

    function checkRequiredInputs(){
        let check = true;
        $('.js-required-input input').each(function(index, element){
            if ($(element).val() == ""){
                check = false;
            }
        })
        return check;
    }
    function checkAcceptPolicy(){
        if ($('.js-accept input:checked').length){
            return true;
        } else{
            return false;
        }
    }
    function checkAll(){
        let check = true;
        if (!checkRequiredInputs()){
            check = false;
        }
        if (!checkAcceptPolicy()){
            check = false;
        }
        if (check){
            $('.js-checkout-button').addClass('active');
        } else{
            $('.js-checkout-button').removeClass('active');
        }
        return check;
    }

    $('.js-required-input').bind('input', function() {
        checkAll();
    });

    $(document).on('click','.js-about-time', function(e){
        let index = Number($(this).data('index'));
        $('.js-about-time').removeClass('active');
        $(this).addClass('active');
        $('.js-about-time-tab').removeClass('active');
        $('.js-about-time-tab').addClass(function (i){
            if (i==index){
                return 'active';
            }
        });
    });

    // $(document).on('click','.js-checkout-head', function(e){
    //     e.stopPropagation();
    //     let startElement = $(this);
    //     $('.js-checkout-head').each(function(index, element){
    //         if ($(element).get(0) == startElement.get(0)){
    //             $(this).parents('.js-checkout-category').toggleClass('closed');
    //             return false;
    //         } else{
    //             if ($(element).parents('.js-checkout-category').hasClass('complete')){

    //             }else{
    //                 return false;
    //             }
    //         }
    //     })
    // });

    $(document).on('click','.js-checkout-next', function(e){
        e.preventDefault();
        $(this).parents('.js-checkout-category').addClass('closed complete');
        var nextEl = $('.js-checkout-category').not('.complete').first();
        nextEl.removeClass('closed');
        var menuHeight = 0,
            top = nextEl.offset().top,
            topIndent = top - menuHeight;
        $('html').animate({scrollTop: topIndent}, 300);
    });

    $(document).on('click','.js-checkout-back', function(e){
        e.preventDefault();
        $(this).parents('.js-checkout-category').addClass('closed').removeClass('complete');
        var prevEl = $('.js-checkout-category.complete').last();
        prevEl.removeClass('closed complete');
        var menuHeight = 0,
            top = prevEl.offset().top,
            topIndent = top - menuHeight;
        $('html').animate({scrollTop: topIndent}, 300);
    });
    
    $(document).on('click','.js-accept', function(e){
        e.stopPropagation();
        checkAll();
    });

    //checkout-pies
    if ($('.js-datepicker').length){
        const $today = new Date();
        const $todayMax = new Date();
        const $dayPeriod = +($today.getDate() + 2);
        $todayMax.setDate(+$dayPeriod);
        $('.js-datepicker').datepicker({
            startDate: $today,
            toggleSelected: false,
            minDate: $today,
            maxDate: $todayMax,
        }).data('datepicker').selectDate($today);

        $(document).on('click','.datepicker--cell-day:not(.-disabled-)', function(e){
            let startElementDate = $(this).data('date');
            let tabs = $('.js-pies-time-tab');
            tabs.removeClass('active');
            $('.datepicker--cell-day:not(.-disabled-)').each(function(index, element){
                if ($(element).data('date') == startElementDate){
                    tabs.addClass(function (i){
                        if (i==index){
                            return 'active';
                        }
                    });
                }
            });
        });
    }
    $(document).on('click','.js-accept-pies', function(e){
        e.stopPropagation();
        if ($('.js-accept-pies input:checked').length){
            $('.js-pies-checkout-button').addClass('active');
        } else{
            $('.js-pies-checkout-button').removeClass('active');
        }
    });

    $(document).on('click','.js-popup-mobile-close', function(e){
        e.stopPropagation();
        $(this).parents('.popup-mobile').addClass('closed');
        $('body').removeClass('mod-overflow');
        $('html').removeClass('mod-overflow');
    });

    //плавный скролл
    function scrollToAnchor (elem) {
        $(document).on("click", elem, function (event) {
            var id  = $(this).attr('href'),
                menuHeight = 0,
                top = $(id).offset().top,
                topIndent = top - menuHeight;
            $('html').animate({scrollTop: topIndent}, 300);
        });
    };

    //пересчет индикатора корзины
    function cartIndicator(){
        if ($('.js-cart-indicator').length){
            const maxPrice = $('.js-show-cart').data('delivery-price');
            const currentPrice = $('.js-show-cart').data('current-price');
            const rightPercent = (1 - (currentPrice / maxPrice)) * 100;
            if (currentPrice < maxPrice){
                if (currentPrice <= 0){
                    $('.js-cart-indicator').addClass('mod-red');
                    $('.js-cart-indicator').css('right', 100 + '%');
                } else{
                    $('.js-cart-indicator').removeClass('mod-red');
                    $('.js-cart-indicator').css('right', rightPercent + '%');
                }
            } else{
                $('.js-cart-indicator').removeClass('mod-red');
                $('.js-cart-indicator').css('right', 0 + '%');
    
            }
        }
    }

    $(document).on('click','.js-fav', function(e){
        $(this).toggleClass('active');
    });

    cartIndicator();

    //попап для проверки 18+
    showPopup('.js-for-adults','.popup-age');

    
    if ($('.js-slider-filter').length){
        $( ".js-slider-filter" ).slider({
            range: true,
            min: Number($( ".js-slider-filter" ).data('min')),
            max: Number($( ".js-slider-filter" ).data('max')),
            values: [ Number($( ".js-slider-filter" ).data('min')), Number($( ".js-slider-filter" ).data('max')) ],
            slide: function( event, ui ) {
                $( ".js-slider-min" ).val( ui.values[ 0 ]);
                $( ".js-slider-max" ).val( ui.values[ 1 ]);
                $('.js-filter-decor').addClass('active');
                $('.js-filter-clear').addClass('active');
            }
        });
    }
    $(document).on('change','.js-slider-min', function(e){
        let value = Number($( ".js-slider-min" ).val());
        let min = Number($( ".js-slider-min" ).attr('min'));
        let max = Number($( ".js-slider-max" ).val());
        if (value > max){
            value = max;
            $( ".js-slider-min" ).val(value);
        }
        if (value < min){
            value = min;
            $( ".js-slider-min" ).val(value);
        }
        $( ".js-slider-filter" ).slider( "values", 0, value);
        $('.js-filter-decor').addClass('active');
        $('.js-filter-clear').addClass('active');

    });
    $(document).on('change','.js-slider-max', function(e){
        let value = Number($( ".js-slider-max" ).val());
        let min = Number($( ".js-slider-min" ).val());
        let max = Number($( ".js-slider-max" ).attr('max'));
        console.log(max);
        if (value < min){
            value = min;
            $( ".js-slider-max" ).val(value);
        }
        if (value > max){
            value = max;
            $( ".js-slider-max" ).val(value);
        }
        $( ".js-slider-filter" ).slider( 'values', 1, value);
        $('.js-filter-decor').addClass('active');
        $('.js-filter-clear').addClass('active');

    });
    
    $(document).on('click','.js-purchases-btn', function(e){
        $(this).parents('.js-purchases-buttons').find('.js-purchases-btn').removeClass('active');
        $(this).addClass('active');
    });

    $(document).on('click','.js-feedback-check', function(e){
        if ($(this).hasClass('good-feedback')){
            $('.js-feedback-check.bad-feedback').prop('checked', false);
        } else {
            if ($(this).hasClass('bad-feedback')){
                $('.js-feedback-check.good-feedback').prop('checked', false);
            }
        }
    });
    
    $(document).on('click','.js-expander-head', function(e){
        $(this).parents('.js-expander').toggleClass('hide');
        $(this).parents('.js-expander').find('.js-expander-body').slideToggle();
    });
};