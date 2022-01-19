class Slider {
   isPressed = false;
   positionX;
   constructor(sliderId) {
      this.id = sliderId;
      this.sliderElement = document.querySelector(`#${this.id}`);
      this.slideWidth = document.querySelector(
         `#${this.id} .slide`
      ).clientWidth;
      this.buttons = document.querySelectorAll(
         `#${this.id}~.slider__nav .slider__dot`
      );
      this.numberOfControlButtons = this.buttons.length;
      this.maxScrollWidth = this.sliderElement.scrollWidth-this.sliderElement.clientWidth;

   }
   getNumberOfActiveSlide(){
      let value = Math.floor(
         (this.sliderElement.scrollLeft/this.maxScrollWidth*100)/(this.numberOfControlButtons*10)
         )
      if(value > this.numberOfControlButtons-1){
         value = this.numberOfControlButtons-1;
      }
      if(value < 0){
         value = 0
      }   
      return value;
   }
   styleControlButtons(buttons) {
      buttons.forEach((e) => e.classList.remove("slider__dot--active"));
      buttons[this.getNumberOfActiveSlide()].classList.add("slider__dot--active");
   }

   initBtns() {
      this.buttons.forEach((element) =>
         element.addEventListener("click", (e) => {
            this.buttons.forEach((e) =>
               e.classList.remove("slider__dot--active")
            );
            e.target.classList.add("slider__dot--active");
            this.sliderElement.scrollTo(
               sliderControlButtons.indexOf(element) * 0.5 * this.maxScrollWidth,
               0
            );
         })
      );
   }

   start(e) {
      e.preventDefault();
      console.log(this);
     
      this.positionStart = e.pageX - this.sliderElement.offsetLeft;
      this.isPressed = true;
      this.styleControlButtons(this.buttons);
   }
   move(e) {
      if (!this.isPressed) return;

      e.preventDefault();
      this.styleControlButtons(this.buttons);
      this.sliderElement.classList.add("comments__container--grabbing");

      let position =
         e.pageX - this.sliderElement.offsetLeft - this.positionStart;

      if (this.sliderElement.scrollLeft == this.maxScrollWidth && position <= 0) {
         this.sliderElement.classList.toggle("comments__container--scrolling");
         this.sliderElement.scrollTo(1, 0);
         this.sliderElement.classList.toggle("comments__container--scrolling");
      } else if (this.sliderElement.scrollLeft == 0 && position > 0) {
         this.sliderElement.style.transition = 0;
         this.sliderElement.classList.toggle("comments__container--scrolling");
         this.sliderElement.scrollTo(this.maxScrollWidth, 0);
         this.sliderElement.classList.toggle("comments__container--scrolling");
      } else {
         this.sliderElement.scrollTo(this.sliderElement.scrollLeft - position, 0);
      }
   }
   end(e) {
      this.isPressed = false;
      this.sliderElement.classList.remove("comments__container--grabbing");
   }

   init() {
      this.sliderElement.addEventListener("mousedown", this.start.bind(this));
      this.sliderElement.addEventListener("touchstart", this.start.bind(this));

      this.sliderElement.addEventListener("mousemove", this.move.bind(this));
      this.sliderElement.addEventListener("touchmove", this.move.bind(this));

      this.sliderElement.addEventListener("mouseup", this.end.bind(this));
      this.sliderElement.addEventListener("touchend", this.end.bind(this));
      this.sliderElement.addEventListener("mouseleave", this.end.bind(this));

      this.initBtns();
   }
}

let commentsSlider = new Slider("comments__slider");
commentsSlider.init();
