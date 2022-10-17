(function ($) {

  var $window = $(window);

  $window.resize(function resize() {
    if ($window.width() < 1200) {
	
      function hideLeft() {
        event.preventDefault();
        $('.backpage').animate({
          scrollLeft: "+=100px" },
        "slow");
      }

      function showLeft() {
        event.preventDefault();
        $('.backpage').animate({
          scrollLeft: "-=100px" },
        "slow");
      }
      $(document).on("pageinit", "#my_view", function () {
        $('.list-items').bind('swiperight', showLeft);
        $('.list-items').bind('swipeleft', hideLeft);
      });

      $('.backpage').scroll(function () {
        if ($('.backpage').scrollLeft() > 10) {
          $('#leftArrow').attr("src", "assets/img/arrows-mage.svg");
        } else {
          $('#leftArrow').attr("src", "assets/img/arrows-gray.svg");
        }

        if ($('.backpage').scrollLeft() > 400) {
          $('#rightArrow').attr("src", "assets/img/arrows-gray.svg");
        } else {
          $('#rightArrow').attr("src", "assets/img/arrows-mage.svg");
        }
      });

      $('.previous').click(function () {
        event.preventDefault();
        $('.backpage').animate({
          scrollLeft: "-=100px" },
        "slow");
      });

      $('.dots li').click(function (e) {	  
	  e.preventDefault();
	  var clicker=$(this);
	  $('.dots li').each(function(){
	  	$(this).removeClass('current');
	  });
	  $(this).addClass('current');
        var href = $(this).attr('href');
        var size = parseInt($(this).attr('data-fill'));
        var margin = parseInt($(this).css('marginLeft')) + 20;
        var active = $('.active.actived').length;
        if ($(this).hasClass('active')) {
          if ($(".line-fill").css('width') == '120') {

          } else {
            $(".line-fill").animate({ width: +(margin * size) + 30 }, 300);
          }
        } else {
          $(".line-fill").animate({ width: "+=" + margin * (size - active) }, 300);
        }
        $('.dots li').removeClass('active');
        $('.dots li').removeClass('actived');
        $('.dots li').removeClass('was');
        clicker.addClass('active');
        clicker.prevAll().addClass('active');
        clicker.addClass('actived');
        clicker.prevAll().addClass('actived');
        clicker.prevAll().addClass('was');
        $('.timeline-size').removeClass('on');
        $('.timeline-size').removeClass('out');
        $(href).addClass('on');
        $(href).prevAll().addClass('out');
      });
    } else {
      $('.prox').click(function () {
        event.preventDefault();
        $('.backpage').animate({
          scrollLeft: "+=100px" },
        "slow");
      });

      $('.backpage').scroll(function () {
        if ($('.backpage').scrollLeft() > 10) {
          $('#leftArrow').attr("src", "assets/img/arrows-mage.svg");
        } else {
          $('#leftArrow').attr("src", "assets/img/arrows-gray.svg");
        }

        if ($('.backpage').scrollLeft() > 700) {
          $('#rightArrow').attr("src", "assets/img/arrows-gray.svg");
        } else {
          $('#rightArrow').attr("src", "assets/img/arrows-mage.svg");
        }
      });

      $('.previous').click(function () {
        event.preventDefault();
        $('.backpage').animate({
          scrollLeft: "-=100px" },
        "slow");
      });

      $('.dots li').click(function (event) {
          	  var target = $('#timeline_tab');
if (target.length) {
        $('html,body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }
	  $('.dots li').each(function(){
	  	$(this).removeClass('current');
	  });
	  $(this).addClass('current');
        var href = $(this).attr('href');
        var size = parseInt($(this).attr('data-fill'));
        var margin = parseInt($(this).css('marginLeft')) + 20;
        var active = $('.active.actived').length;
        if ($(this).hasClass('active')) {
          if ($(".line-fill").css('width') == '220') {

          } else {
            $(".line-fill").animate({ width: +(margin * size) + 30 }, 300);
          }
        } else {
          $(".line-fill").animate({ width: "+=" + margin * (size - active) }, 300);
        }
        $('.dots li').removeClass('active');
        $('.dots li').removeClass('actived');
        $('.dots li').removeClass('was');
        $(this).addClass('active');
        $(this).prevAll().addClass('active');
        $(this).addClass('actived');
        $(this).prevAll().addClass('actived');
        $(this).prevAll().addClass('was');
        $('.timeline-size').removeClass('on');
        $('.timeline-size').removeClass('out');
        $(href).addClass('on');
        $(href).prevAll().addClass('out');
      });
    }


  }).trigger('resize');
})(jQuery);
//# sourceURL=pen.js