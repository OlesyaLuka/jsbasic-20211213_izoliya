import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = createElement(
      `<div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
    
        <!--Полоска слайдера-->
        <div class="slider__progress"></div>
    
        <!-- Шаги слайдера (вертикальные чёрточки) -->
        <div class="slider__steps">
        </div>
      </div>`
    )
    this.cteateSliderSteps();
    this.sliderClick();
  }

  cteateSliderSteps() {
    let sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = this.value; i < this.steps; i++) {
      sliderSteps.append(createElement(`<span></span>`));
    }
    sliderSteps.firstElementChild.classList.add('slider__step-active');
    this.elem.querySelector('.slider__progress').style.width = 0 + '%';

  }

  sliderClick() {
      this.elem.addEventListener('click', (event) => {

        let leftClick = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = leftClick / this.elem.offsetWidth;
        let approximateValue = leftRelative * (this.steps - 1);
        let value = Math.round(approximateValue);
        let valuePercents = value / (this.steps - 1) * 100;

        this.elem.querySelector('.slider__value').innerHTML = value;

        let sliderSteps = this.elem.querySelector('.slider__steps');
        let steps = sliderSteps.querySelectorAll('span');

        for (let j = 0; j < this.steps; j++) {
          if(j === value) {
            steps.forEach(item => {
              item.classList.remove('slider__step-active');
            })
            steps[j].classList.add('slider__step-active');
            this.elem.querySelector('.slider__thumb').style.left = valuePercents + '%';
            this.elem.querySelector('.slider__progress').style.width = valuePercents + '%';
          } else continue;
        
        let customEvent = new CustomEvent('slider-change', {
          detail: value,
          bubbles: true
        })
        this.elem.dispatchEvent(customEvent);
        //console.log(customEvent);
      }
    })
  }
}
