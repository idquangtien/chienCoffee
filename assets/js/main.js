class Slideshow {
	constructor(props){
		// required
		this.container = props && props.container;
		this.btnNext = props && props.btnNext; 
		this.btnPrev = props && props.btnPrev; 
		// default
		this.width = props && props.width ? props.width : 0;
		this.total = props && props.total ? props.total : 0;
		this.current = props && props.current ? props.current : 0;
		this.list = props && props.list ? props.list : [];
		this.time = props && props.time ? props.time : 700;
		this.pause = props && props.pause ? props.pause : null;
		this.stop = props && props.stop ? props.stop : false;
	}
	getCurrent(isNext){
		if(isNext){
			if(this.current < this.total - 1){
				this.current++;
			} else {
				this.current = 0;
			}
		} else {
			if(this.current > 0) {
				this.current--;
			} else {
				this.current = this.total - 1;
			}
		}
		return this.current;
	}
	moveSlide(){
		this.container.animate({
			marginLeft: -(this.width * this.current)
		},this.time, function(){
			// ...
		});
		var self = this;
		if(self.list.length > 0) {
			self.list.siblings().removeClass("active");
			self.list.each(function(index){
				if(self.current == index) {
					$(this).addClass("active");
				}
			});
		}
	}
	nextSlide(){
		this.current = this.getCurrent(true);
		this.moveSlide();
	}
	prevSlide(){
		this.current = this.getCurrent(false);
		this.moveSlide();
	}
	runSlide() {
	}
	stopSlide(){
	}
	init() {
		var self = this;
		self.container.width(self.width * self.total);

		self.btnPrev.click(function(){
			self.prevSlide();
		});
		self.btnNext.click(function(){
			self.nextSlide();
		});
		
		var run = setInterval(function(){
			self.nextSlide();
		}, self.pause);

		if(self.stop == true) {
			clearInterval(run);
		}
	}
}

$(document).ready(function(){
	// let slideshow = new Slideshow({
	// 	container: $(".carousels"),
	// 	btnPrev: $(".carousel-prev"),
	// 	btnNext: $(".carousel-next"),
	// 	width: $(".carousels").width(),
	// 	total: $(".carousel").length,
	// 	current: 0,
	// 	list: $(".carousel"),
	// 	time: 500,
	// 	pause: 3000,
	// 	stop: false
	// });

	// slideshow.init();


	// let resultLottery = new Slideshow({
	// 	container: $(".results"),
	// 	btnPrev: $(".result-prev"),
	// 	btnNext: $(".result-next"),
	// 	width: $(".result").width(),
	// 	total: $(".result").length,
	// 	current: 0,
	// 	list: $(".result"),
	// 	time: 500,
	// 	// pause: 9000,
	// 	stop: true
	// });
	// resultLottery.init();

	// console.log("slideshow.stop", slideshow.stop);
	// console.log("resultLottery.container", resultLottery.container.width());
	

	$(".aside__content ul li, .menu-top ul li").click(function(){
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
	// --------------------------------------------------------------------
	$(".button-cart").click(function(){
		$("body").toggleClass("no-scroll");
		$(".aside-cart").toggleClass("active");
	});
	$(".button-toggle").click(function(){
		$("body").toggleClass("no-scroll");
		$(".aside-menu").toggleClass("active");
	});
	$(".aside__dimmer").click(function(){
		$("body").removeClass("no-scroll");
		$(".aside").removeClass("active");
	});

	// --------------------------------------------------------------------
	$(window).scroll(function(){
		var scrollTrigger = 200;	
		var scrollTop = $(window).scrollTop();
		if(scrollTop > scrollTrigger) {
			$(".header").addClass("scroll");
		} else {
			$(".header").removeClass("scroll");
		}
	});
	// --------------------------------------------------------------------
	
	
});

var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn");

function myFunction() {
	if (video.paused) {
		video.play();
		btn.innerHTML = '<i class="ic ic_video_pause"></i>';
	} else {
		video.pause();
		btn.innerHTML = '<i class="ic ic_video_play"></i>';
	}
}

function scrollToElement(target){
	
	var header = $('.header').width() >= 992 ? 70 : 70;
	var heightHeader = $(".header").outerHeight();
    var position = $("." + target).offset().top - heightHeader + 1;

    $("html, body").animate({
        scrollTop: position,
    },1000);   
}