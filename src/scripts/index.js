window.onload = function() {
    $(document).on('click','.js-catalog-menu span', function(e){
        if ($(this).parent().hasClass('active')){
            $(this).parent().removeClass('active');
        } else{
            $(this).parent().addClass('active');
        }
        $('.js-catalog-menu span').not('.arrow').parent().removeClass("active");
    });
    $(document).on('click','.js-catalog-menu span', function(e){
        
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
    window.dima = baron({
        root: '.js-custom-scroll',
        scroller: '.baron__scroller',
        bar: '.baron__bar'
    }).autoUpdate(); 
    window.dima = baron({
        root: '.js-custom-scroll-menu',
        scroller: '.baron__scroller',
        bar: '.baron__bar'
    }).autoUpdate(); 

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
};