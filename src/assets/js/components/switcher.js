const switcher = document.querySelector('.test__left');
const sliderYearsSwitch = document.querySelector('.test__list-link-year');
const sliderMonthSwitch = document.querySelector('.test__list-link-month');
const sliderMonths = document.querySelectorAll('.test__month');
function toggleActive(elems) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].classList.toggle('__active')
        
    }
}
switcher.addEventListener('click', (e) => {
    let target = e.target;
    console.log(target)
    if (target.classList.contains('test__list-link-month')) {
        sliderYearsSwitch.classList.remove('__active')
        target.classList.add('__active')
        toggleActive(sliderMonths); 
    }
    if (target.classList.contains('test__list-link-year')) {
        sliderMonthSwitch.classList.remove('__active')
        target.classList.add('__active')
        toggleActive(sliderMonths);
        
    }
})
