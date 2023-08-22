let widthLine = 100;
let widthOfYear;
let widthOfMonth;

let line = document.querySelectorAll('.test__line');

function createTool(parent, triangleClass, infoMonth, infoYear) {
    let monthNames = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    let parentEl = parent;
    let toolWrap = document.createElement('div');
    let toolMonth = document.createElement('p');
    let toolYear = document.createElement('p');
    toolWrap.classList.add('tooltip');
    toolWrap.classList.add(triangleClass);
    toolMonth.classList.add("tooltip__month");
    toolYear.classList.add("tooltip__year");
    toolMonth.innerText = monthNames[infoMonth];
    toolYear.innerText = infoYear;
    toolWrap.appendChild(toolMonth);
    toolWrap.appendChild(toolYear);
    parentEl.appendChild(toolWrap);
}
function deleteTool(parent) {
    let parentEl = parent;
    let toolWrap = parent.querySelector('.tooltip');
    parentEl.removeChild(toolWrap);
}

function createYears(parents, amount, elemClass) {
    for (let i = 0; i < parents.length; i++) {
        for (let k = 0; k < amount; k++) {
            let year = document.createElement('div');
            year.classList.add(elemClass);
            parents[i].appendChild(year);
        }   
    }
}

function setStyle(elements, value) {
    const elems = document.querySelectorAll(elements);
    for (let i = 0; i < elems.length; i++) {
        elems[i].style.width = value + "%";
    }
}
function drawPoint(year, month, parent, min) {
    // найди в parent элемент с годом year
    let needYear = parent.querySelector(".test__year[data-year='"+year+"']");
    // найди в этом элементе элемент под номером month
    let allMonthInNeedYear = needYear.getElementsByTagName("*");
    let point = allMonthInNeedYear[month];
    point.style.position = "relative";
    point.style.display = "flex";
    point.style.alignItems = "center";
    // нарисуй там точку
    let dott = document.createElement('div');
    dott.classList.add("__point")
    point.appendChild(dott)
    // создай тултип с этими параметрами - если мин - хвостик сверху, если макс - хвостик снизу
    // если desktop - наведение, если tablet - клик
    if (window.innerWidth>800) {
        if (min) {
            dott.onmouseover = function(event) {
                setTimeout(() => {
                    createTool(dott, 'tooltip--top', month, year);
                }, 200)
            };
            dott.onmouseout = function(event) {
                setTimeout(() => {
                    deleteTool(dott);
                }, 200)
            };
        } else {
            dott.onmouseover = function(event) {
                setTimeout(() => {
                    createTool(dott, 'tooltip--bottom', month, year);
                }, 200)  
            };
            dott.onmouseout = function(event) {
                setTimeout(() => {
                    deleteTool(dott);
                }, 200)
            };
        }  
    } else if (window.innerWidth<800) {
        if (min) {
            let isShow = false;
            dott.addEventListener('click', function () {
                if (isShow) {
                    setTimeout(() => {
                        deleteTool(dott);
                    }, 200)
                    isShow = false;
                } else {
                    setTimeout(() => {
                        createTool(dott, 'tooltip--top', month, year);
                    }, 200)
                    isShow = true;
                }
            })
        } else {
            let isShow = false;
            dott.addEventListener('click', function () {
                if (isShow) {
                    setTimeout(() => {
                        deleteTool(dott);
                    }, 200)
                    isShow = false;
                } else {
                    setTimeout(() => {
                        createTool(dott, 'tooltip--bottom', month, year);
                    }, 200)  
                    isShow = true;
                }
            })
            
        } 
    }
    
}
function fillDefault(parent, minDataYear, maxDataYear, minDataMonth, maxDataMonth) {
        // найди год 1.
        let needYearMin = parent.querySelector(".test__year[data-year='"+minDataYear+"']");
        // найди точку год1.месяц1
        let allMonthInNeedYearMin = needYearMin.getElementsByTagName("*");
        let minPoint = allMonthInNeedYearMin[minDataMonth];
        // в году один начиная с точки г1м1, разукрась все месяца до последнего
        for (let i = minDataMonth; i < allMonthInNeedYearMin.length; i++) {
            allMonthInNeedYearMin[i].classList.add("__betweenPoint");
        }
        // найди год 2
        let needYearMax = parent.querySelector(".test__year[data-year='"+maxDataYear+"']");
        // найди точку год2 месяц2
        let allMonthInNeedYearMax = needYearMax.getElementsByTagName("*");
        let maxPoint = allMonthInNeedYearMax[maxDataMonth];
        // в году начиная с нуля до точки г2м2 разукрась все месяца
        for (let i = 0; i < maxDataMonth; i++) {
            allMonthInNeedYearMax[i].classList.add("__betweenPoint");
        }
}
function searchFill(data1, data2, parent) {
    let minData = data1;
    let maxData = data2;
    let minDataYear = minData.getFullYear();
    let minDataMonth = minData.getMonth();
    let maxDataYear = maxData.getFullYear();
    let maxDataMonth = maxData.getMonth();
    let diffYear = maxDataYear-minDataYear;
    let diffMonth = maxDataMonth-minDataMonth;
    drawPoint(minDataYear, minDataMonth, parent, 'min')
    drawPoint(maxDataYear, maxDataMonth, parent)
    
    // если больше одного года разукрасить расстояние этих лет
    if (diffYear>1) {
        // найди необходимые года и закрась все месяца в них
        for (let i = 1; i < diffYear; i++) {
            let sum = minDataYear + i;
            let needYear = parent.querySelector(".test__year[data-year='"+sum+"']");
            let allMonthInNeedYear = needYear.getElementsByTagName("*");
            for (let i = 0; i < allMonthInNeedYear.length; i++) {
                allMonthInNeedYear[i].classList.add("__betweenPoint");
            }
        }
        fillDefault(parent, minDataYear, maxDataYear, minDataMonth, maxDataMonth);
    } else if (diffYear==1) {
        fillDefault(parent, minDataYear, maxDataYear, minDataMonth, maxDataMonth);
    } else if (diffYear==0 && diffMonth>0) {
        // найди год1
        let needYear = parent.querySelector(".test__year[data-year='"+minDataYear+"']");
        let allMonthInNeedYear = needYear.getElementsByTagName("*");
        // найди точку год1.месяц1. это мин
        // найди точку год1.месяц2. это макс
        let minPoint = allMonthInNeedYear[minDataMonth];
        let maxPoint = allMonthInNeedYear[maxDataMonth];
        // найди год и перекрась с мин до макс
        for (let i = minDataMonth; i < maxDataMonth; i++) {
            allMonthInNeedYear[i].classList.add("__betweenPoint");
            
        }        
    } 
}

function main (min, max, data1, data2) {
    // получить все даты
    let minPoint = new Date(min);
    let maxPoint = new Date(max);
    let data1Point = new Date(data1);
    let data2Point = new Date(data2);

    // проверить, правильность данных
    if (minPoint>=maxPoint || minPoint>data1Point || maxPoint<data2Point) {
        return;
    } 
    else {
        // в датах мин и макс нужен только год
        let minYear = minPoint.getFullYear();
        let maxYear = maxPoint.getFullYear();
        let data1Year = data1Point.getFullYear();
        let data2Year = data2Point.getFullYear();
        let data1Month = data1Point.getMonth();
        let data2Month = data2Point.getMonth();

        // найдем разницу
        let diff = maxYear-minYear;
        let diffPoints = data2Year-data1Year; 

        // сколько лет разницы, столько и участков-годов в html 
        createYears(line, diff+1, "test__year")
        // сколько годов, на столько частей таймлайн и делится по ширине
        widthOfYear = Math.round(widthLine/diff);
        setStyle(".test__year", widthOfYear)

        // поделим года на месяца
        const years = document.querySelectorAll(".test__year");
        createYears(years, 12, "test__month")

        const descr = document.querySelector(".test__time-bottom")
        const descrBottom = descr.querySelectorAll('.test__year');


        const top = document.querySelector(".test__time-top")
        const lineTop = top.querySelectorAll('.test__year');

        // точкам мин и макс задаем data-атрибуты и наполняем их в html текстом - датой
        descrBottom[0].firstChild.innerText = minYear;
        descrBottom[0].firstChild.style.textAlign = 'left';
        descrBottom[0].firstChild.classList.add("__title");
        let theLastYearBottom = descrBottom[descrBottom.length-1];
        let theLastYearTop = lineTop[lineTop.length-1];
        theLastYearBottom.firstChild.innerText = maxYear;
        theLastYearBottom.firstChild.classList.add("__title");
        descrBottom[0].dataset.year = `${minYear}`;
        lineTop[0].dataset.year = `${minYear}`;
        theLastYearBottom.dataset.year= `${maxYear}`;
        theLastYearTop.dataset.year = `${maxYear}`;
        // задаем data-атрибуты и всем остальным годам. Каково значение атрибута, таков и текст в html
        for (let i = 1; i < descrBottom.length-1; i++) {
            for (let k = 1; k < diff; k++) {
                descrBottom[k].firstChild.innerText = minYear+k;
                descrBottom[k].firstChild.classList.add('__title')
                descrBottom[k].dataset.year = `${minYear+k}`;
                lineTop[k].dataset.year = `${minYear+k}`;
            }
        }
        // все элементы месяца заполняем их именами (кроме января, в нем - год)
        for (let k = 0; k < descrBottom.length; k++) {
            let allMonths = descrBottom[k].getElementsByTagName("*");
            let monthsNames = ['фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'];
            for (let i = 1; i < allMonths.length; i++) {
                allMonths[i].innerText = monthsNames[i-1]
            }
        }
        let lastYearMonths = theLastYearBottom.getElementsByTagName("*");
        let lastYearMonthsTop = theLastYearTop.getElementsByTagName("*");

        while (lastYearMonths.length>1) {
            theLastYearBottom.removeChild(theLastYearBottom.lastChild);
            theLastYearTop.removeChild(theLastYearTop.lastChild);
        }
        theLastYearBottom.style.gridTemplateColumns ="1fr";
        theLastYearBottom.style.width = "auto";
        theLastYearTop.style.gridTemplateColumns ="1fr";
        theLastYearTop.style.width = "auto";
        
        searchFill(data1Point, data2Point, top)
            
    }       
}
// месяцы идут с нуля. 1 в дате = 0 в месяцах (январь). 2 в дате = 1 в месяцах (февраль). 3 в дате = 2 в месяцах (март). Т.е. в дате мы пишем, как обычно, а получаем массив от 0 до 11
main ("2020-01-10", "2023-11-20", "2020-05-08", "2021-09-10")

