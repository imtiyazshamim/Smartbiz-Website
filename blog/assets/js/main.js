/**
* 
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()


//////////////Progressbar/////////////
$(document).ready(function() {

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 5; //globaly define number of elements per page
    var syncedSecondary = false;

    sync1.owlCarousel({
        items: 5,
        slideSpeed: 2000,
        nav: true,
        center: true,
        autoplay: false, 
        dots: true,
        loop: true,
        responsiveRefreshRate: 200,
		  responsive: {
            0: {
              items: 1,
			  touchDrag : false,
              mouseDrag : false, 
            },
            700: {
              items: 2,
			  touchDrag : false,
              mouseDrag : false, 
            },
            1000: {
              items: 5
            }
          },
        navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
    }).on('dragged.owl.carousel', function (e) {
        var index = e.item.index;

         var carousel = jQuery('#sync1').data('owl.carousel');
      var number = carousel.relative(index);
        carousel.to(carousel.relative(index));
            sync2.data("owl.carousel").to(number, 300, true);
            sync1
            .find(".owl-item")
            .removeClass("center")
            .eq(index)
            .addClass("center");

    });

    sync2
        .on('initialized.owl.carousel', function() {
            //sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            dots: true,
            nav: true,
            center: true,
            smartSpeed: 200,
            slideSpeed: 500,
            loop: true,
            slideBy: 5, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100,
			responsive: {
            0: {
              items: 1
            },
            700: {
              items: 2
            },
            1000: {
              items: 5
            }
          },
        }).on('dragged.owl.carousel', function (e) {
        var index = e.item.index;
         var carousel = jQuery('#sync2').data('owl.carousel');
      var number = carousel.relative(index);
        carousel.to(carousel.relative(index));
      sync1.data("owl.carousel").to(number, 300, true);

    });

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);
        current = current -1;

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        /*sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");*/
        var onscreen = sync2.find('.owl-item.active').length - 4;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();
        if (current > end) {
           // sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
           // sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
         sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e) {
        /*e.preventDefault();
        var number = $(this).index();
       number = number - 5; 
       alert(number);
       sync1.data('owl.carousel').to(number, 300, true);*/
      // jQuery(this).addClass('current');
       var carousel = jQuery('#sync2').data('owl.carousel');
      var number = carousel.relative(jQuery(this).index());
            //alert(number);
            jQuery('.owl-item').each(function(){
                if(jQuery(this).hasClass('center')){
                    jQuery(this).removeClass('center');
                }
            });
      //jQuery('.owl-item.current').removeClass('current');
      //jQuery('.owl-item.center').removeClass('center');
      //jQuery(this).addClass('current');
     jQuery(this).addClass('center');
     carousel.to(carousel.relative(jQuery(this).index()));
      sync1.data("owl.carousel").to(number, 300, true);
    });
});
  
 //////////////Banner images///////////////////
  $(function(){
  $('#bannerCarousel').owlCarousel({
    loop:true,
    nav:true,
     items:1,
    slideSpeed : 300,
      paginationSpeed : 400,
      singleItem: true,
			pagination: false,
    	rewindSpeed: 500,
	touchDrag : false,
    mouseDrag : false, 
      
  });
});
//////////////sticky//////////////////
jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > 0){  
        jQuery('#header').addClass("sticky");
    }
    else{
        jQuery('#header').removeClass("sticky");
    } 
});

/**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
//////////////
 
 
  $(function() {
  // Owl Carousel
  var owl = $(".test1");
  owl.owlCarousel({
    items: 3,
    margin: 10,
    loop: true,
    
    nav: false,
    dots:true,
    responsive:{
        0:{
            items:1,
            autoplay:true,
    autoplayTimeout:5000,
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
  });
});

//For Video custom play button
const video = document.getElementById("videowalk");
const circlePlayButton = document.getElementById("circle-play-b");

function togglePlay() {
	if (video.paused || video.ended) {
		video.play();
	} else {
		video.pause();
	}
}

circlePlayButton.addEventListener("click", togglePlay);
video.addEventListener("playing", function () {
	circlePlayButton.style.opacity = 0;
});
video.addEventListener("pause", function () {
	circlePlayButton.style.opacity = 1;
});

