window.onload = function() {
    $('.js-catalog-menu a').on('click', function(){
        $('.js-catalog-menu li').removeClass("active");
        $(this).parents('.js-catalog-menu li').addClass("active");
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
    $('.js-select-city').on('click', function(e){
        e.stopPropagation();
        $('.js-select-city-baloon').addClass('active');
    });
    $('.js-baloon-close').on('click', function(){
        $('.js-select-city-baloon').removeClass('active');
    });
    
    $(document).on('click', function(e){
        var element = $('.js-select-city-baloon');
        if (element.has(e.target).length === 0){
            element.removeClass('active');
        }
    });
};