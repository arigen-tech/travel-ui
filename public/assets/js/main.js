(function ($) {
	"use strict";

	let device_width = window.innerWidth;

	var windowOn = $(window)
	///////////////////////////////////////////////////
	// 05. PreLoader Js
	windowOn.on('load', function () {
		$('#loading').fadeOut(500);
	});

	$(window).on('load', function () {

		$('#preloader').delay(350).fadeOut('slow');

		$('body').delay(350).css({ 'overflow': 'visible' });

	})


    ///////////////////////////////////////////////////
	// 03. scroll-to-target 
	windowOn.on('scroll', function () {
		var scroll = windowOn.scrollTop();
		if (scroll < 500) {
			$('.scroll-to-target').removeClass('open');

		} else {
			$('.scroll-to-target').addClass('open');
		}
	});


	if ($('.it-tour-package-text').length) {

		$('.contentHidden').remove();
		// Flatpicker activation
		$("#selectingMultipleDates").flatpickr({
			mode: "range",
			altInput: true,
			altFormat: "j, M",
			dateFormat: "m-d",
		});
	
		$("#selectingMultipleDate").flatpickr({
			mode: "range",
			altInput: true,
			altFormat: "F j, Y",
			dateFormat: "Y-m-d",
			defaultDate: ["2024-04-21", "2024-04-24"]
		});
	
	
		// Flatpicker activation
		$("#selectingMultipleDatess").flatpickr({
			mode: "range",
			altInput: true,
			altFormat: "j, M",
			dateFormat: "m-d",
		});
	}


	///////////////////////////////////////////////////
	// 04. Scroll Up Js
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
		var target = $(this).attr('data-target');
		// animate
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 1000);
	
		});
	}
	function smoothSctollTop() {
		$('.smooth a').on('click', function (event) {
			var target = $(this.getAttribute('href'));
			if (target.length) {
				event.preventDefault();
				$('html, body').stop().animate({
					scrollTop: target.offset().top - 150
				}, 1000);
			}
		});
	}
	smoothSctollTop();

	///////////////////////////////////////////////////
	// 01. for header currency
	if ($("#it-header-currency-toggle").length > 0) {
		window.addEventListener('click', function (e) {

			if (document.getElementById('it-header-currency-toggle').contains(e.target)) {
				$(".it-currency-list").toggleClass("it-currency-list-open");
			}
			else {
				$(".it-currency-list").removeClass("it-currency-list-open");
			}
		});
	}

	///////////////////////////////////////////////////
	// 02. for header language
	if ($("#it-header-lang-toggle").length > 0) {
		window.addEventListener('click', function (e) {

			if (document.getElementById('it-header-lang-toggle').contains(e.target)) {
				$(".it-lang-list").toggleClass("it-lang-list-open");
			}
			else {
				$(".it-lang-list").removeClass("it-lang-list-open");
			}
		});
	}

	///////////////////////////////////////////////////
	// 03. for Events language
	if ($("#it-events-toggle").length > 0) {
		window.addEventListener('click', function (e) {

			if (document.getElementById('it-events-toggle').contains(e.target)) {
				$(".it-events-list").toggleClass("it-events-list-open");
			}
			else {
				$(".it-events-list").removeClass("it-events-list-open");
			}
		});
	}

	////////////////////////////////////////////////////
	// 04. Search Js
	$(".search-open-btn").on("click", function () {
		$(".search__popup").addClass("search-opened");
	});

	$(".search-close-btn").on("click", function () {
		$(".search__popup").removeClass("search-opened");
	});

	$(".job-form-open-btn").on("click", function () {
		$(".job__form").slideToggle("job__form");
	});

	$('.it-service-2-item').on('mouseenter', function () {
		$(this).addClass('active').parent().siblings().find('.it-service-2-item').removeClass('active');
	});


	if ($('.header-height').length > 0) {
		var headerHeight = document.querySelector(".header-height");
		var setHeaderHeight = headerHeight.offsetHeight;
		$(".header-height").each(function () {
			$(this).css({
				'height': setHeaderHeight + 'px'
			});
		});

		$(".header-height.header-sticky").each(function () {
			$(this).css({
				'height': inherit,
			});
		});
	}



	///////////////////////////////////////////////////
	// 07. wow animation
	var wow = new WOW(
		{
			mobile: true,
		}
	);
	wow.init();
	var windowOn = $(window);


	///////////////////////////////////////////////////
	// 08. Sticky Header Js
	windowOn.on('scroll', function () {
		var scroll = windowOn.scrollTop();
		if (scroll < 400) {
			$("#header-sticky").removeClass("header-sticky");
		} else {
			$("#header-sticky").addClass("header-sticky");
		}
	});

	////////////////////////////////////////////////////
	// Nice Select Js
	$('.it-header-search-category select, .it-shop-area select, .it-checkout-area select, .profile__area select').niceSelect();


	////////////////////////////////////////////////////
	// 09. Sidebar Js
	$(".it-menu-bar").on("click", function () {
		$(".itoffcanvas").addClass("opened");
		$(".body-overlay").addClass("apply");
	});
	$(".close-btn").on("click", function () {
		$(".itoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});
	$(".body-overlay").on("click", function () {
		$(".itoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});


	if($('.it-menu-content').length && $('.it-menu-mobile').length){
		let navContent = document.querySelector(".it-menu-content").outerHTML;
		let mobileNavContainer = document.querySelector(".it-menu-mobile");
		mobileNavContainer.innerHTML = navContent;
	
		let arrow = $(".it-menu-mobile .has-dropdown > a");
	
		arrow.each(function () {
			let self = $(this);
			let arrowBtn = document.createElement("BUTTON");
			arrowBtn.classList.add("dropdown-toggle-btn");
			arrowBtn.innerHTML = "<i class='fal fa-angle-right'></i>";
			self.append(function () {
			  return arrowBtn;
			});
	
			self.find("button").on("click", function (e) {
			  e.preventDefault();
			  let self = $(this);
			  self.toggleClass("dropdown-opened");
			  self.parent().toggleClass("expanded");
			  self.parent().parent().addClass("dropdown-opened").siblings().removeClass("dropdown-opened");
			  self.parent().parent().children(".it-submenu").slideToggle();
			});
	
		});
	}

	///////////////////////////////////////////////////
	// 10. Magnific Js
	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	////////////////////////////////////////////////////
	// 11. magnificPopup Js
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});


	////////////////////////////////////////////////////
	// 12. Data CSS Js
	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	////////////////////////////////////////////////////
	// 13. Counter Js
	if ($(".purecounter").length) {
		new PureCounter({
			filesizing: true,
			selector: ".filesizecount",
			pulse: 2,
		});
		new PureCounter();
	}


	////////////////////////////////////////////////////
	// 14. Swiper Js
	const sliderswiper = new Swiper('.it-slider-active', {
		// Optional parameters
		speed: 1500,
		slidesPerView: 1,
		loop: true,
		autoplay: true,
		effect: 'fade',
		breakpoints: {
			'1400': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},

	});

	////////////////////////////////////////////////////
	// 15. Swiper Js
	const slider2swiper = new Swiper('.it-slider-2-active', {
		// Optional parameters
		speed: 1000,
		slidesPerView: 1,
		loop: true,
		autoplay: true,
		effect: 'fade',
		breakpoints: {
			'1400': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},

	});

	////////////////////////////////////////////////////
	// 16. Swiper Js
	const destiNationswiper = new Swiper('.it-destination-slider-active', {
		speed: 1000,
		slidesPerView: 4,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},

	});

	////////////////////////////////////////////////////
	// 17. Swiper Js
	const poPularswiper = new Swiper('.it-popular-active', {
		speed: 1000,
		slidesPerView: 6,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 6,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},

	});

	////////////////////////////////////////////////////
	// 18. Swiper Js
	const travelFeatwiper = new Swiper('.it-travel-feat-active', {
		speed: 1000,
		slidesPerView: 4,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},

	});

	////////////////////////////////////////////////////
	// 19. Swiper Js
	const destiNation2swiper = new Swiper('.it-destination-2-active', {
		speed: 1000,
		slidesPerView: 4,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 4,
			},
			'768': {
				slidesPerView: 4,
			},
			'576': {
				slidesPerView: 3,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.destination-2-prev',
			nextEl: '.destination-2-next',
		}

	});

	////////////////////////////////////////////////////
	// 20. Swiper Js
	const testiMonialswiper = new Swiper('.it-testimonial-active', {
		speed: 1000,
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},

	});

	////////////////////////////////////////////////////
	// 21. Swiper Js
	const testi3swiper = new Swiper('.it-testi-3-active', {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.testi-2-prev',
			nextEl: '.testi-2-next',
		}

	});

	////////////////////////////////////////////////////
	// 22. Swiper Js
	const testiMonial2swiper = new Swiper('.it-testi-2-active', {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.testi-2-prev',
			nextEl: '.testi-2-next',
		}

	});

	////////////////////////////////////////////////////
	// 23. Swiper Js
	const testiMonial4swiper = new Swiper('.it-testi-4-active', {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		pagination: {
			el: ".it-testi-4-dots",
			clickable:true,
		}

	});

	////////////////////////////////////////////////////
	// 24. Swiper Js
	const shopSwiper = new Swiper('.it-shop-active', {
		speed: 1000,
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},

	});

	////////////////////////////////////////////////////
	// 25. Swiper Js
	const shop2Swiper = new Swiper('.it-shop-2-active', {
		speed: 1000,
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 2,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},

	});

	////////////////////////////////////////////////////
	// 26. Swiper Js
	const categoriesSwiper = new Swiper('.it-categories-active', {
		speed: 1000,
		slidesPerView: 5,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.it-cat-prev',
			nextEl: '.it-cat-next',
		}

	});

	////////////////////////////////////////////////////
	// 27. Swiper Js
	const instaSwiper = new Swiper('.it-insta-active', {
		speed: 1000,
		slidesPerView: 5,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 5,
			},
			'1200': {
				slidesPerView: 5,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.it-cat-prev',
			nextEl: '.it-cat-next',
		}

	});

	////////////////////////////////////////////////////
	// 28. Swiper Js
	const innerFeatSwiper = new Swiper('.inner-feat-active', {
		speed: 1000,
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.it-cat-prev',
			nextEl: '.it-cat-next',
		}

	});

	////////////////////////////////////////////////////
	// 29. Swiper Js
	const innerTestiSwiper = new Swiper('.inner-testi-active', {
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 1,
			},
			'1200': {
				slidesPerView: 1,
			},
			'992': {
				slidesPerView: 1,
			},
			'768': {
				slidesPerView: 1,
			},
			'576': {
				slidesPerView: 1,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.it-testi-prev',
			nextEl: '.it-testi-next',
		},
		pagination: {
			el: ".it-testi-inner-dots",
			clickable:true,
		}

	});

	////////////////////////////////////////////////////
	// 30. Swiper Js
	const innerTeamSwiper = new Swiper('.it-team-active', {
		speed: 1000,
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 3,
			},
			'1200': {
				slidesPerView: 3,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 2,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.it-testi-prev',
			nextEl: '.it-testi-next',
		},
		pagination: {
			el: ".it-testi-inner-dots",
			clickable:true,
		}

	});

	////////////////////////////////////////////////////
	// 31. Swiper Js
	const innerTeam3Swiper = new Swiper('.it-team-3-active', {
		speed: 1000,
		slidesPerView: 4,
		spaceBetween: 30,
		loop: true,
		autoplay: true,
		breakpoints: {
			'1400': {
				slidesPerView: 4,
			},
			'1200': {
				slidesPerView: 4,
			},
			'992': {
				slidesPerView: 3,
			},
			'768': {
				slidesPerView: 3,
			},
			'576': {
				slidesPerView: 2,
			},
			'0': {
				slidesPerView: 1,
			},
		},
		navigation: {
			prevEl: '.it-testi-prev',
			nextEl: '.it-testi-next',
		},
		pagination: {
			el: ".it-testi-inner-dots",
			clickable:true,
		}

	});


	////////////////////////////////////////////////////
	// 32. magnificPopup Js
	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});




	////////////////////////////////////////////////////
	// 15. MagnificPopup video view Js
	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	////////////////////////////////////////////////////
	//33.isotope
	$('.grid').imagesLoaded(function () {
		// init Isotope
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-item',
			},

		});
		// filter items on button click
		$('.masonary-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue,
				animationOptions: {
					duration: 100,
					easing: "linear",
					queue: true
				}
			});

		});
		//for menu active class
		$('.masonary-menu button').on('click', function (event) {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			event.preventDefault();
		});

	});

	// 34. Search Js
	$(".accordion-items").on("click", function () {
		$(".accordion-items").toggleClass("open");
	});
	$(".accordion-items").on("click", function () {
		$(".accordion-items").removeClass("open");
	});

	////////////////////////////////////////////////////
	// 16. Cart Quantity Js
	$('.it-cart-minus').on('click', function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});

	$('.it-cart-plus').on('click', function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});

	// jarallax
	if ($('.jarallax').length > 0) {
		$('.jarallax').jarallax({
			speed: 0.2,
			imgWidth: 1366,
			imgHeight: 768,
		});

	};


})(jQuery);