const grid = document.querySelector('.grid');
const black = document.querySelector('.black');
const rgb = document.querySelector('.rgb');
const greyscale = document.querySelector('.greyscale');
const eraser = document.querySelector('.eraser');
const container = document.querySelector('.container');
const clear = document.querySelector('.clear');
let gridSize = 16;
let color = 'black';
let a = 0.1;


let makeGrid = (gridSize) => {
    container.style['grid-template-columns'] = `repeat(${gridSize}, 1fr)`;
    container.style['grid-template-rows'] = `repeat(${gridSize}, 1fr)`;

    for (let i = 1; i<=gridSize; i++) {
        for (let x = 1; x<=gridSize; x++) {
            const div = document.createElement('div');
            div.style.border = "1px solid black"
            container.appendChild(div);
        }
    }
    const squares = container.querySelectorAll('div');
    squares.forEach((div) => div.addEventListener(('mousedown'), beginSketch));
  
}

let beginSketch = (event) => {
    changeColor(event);
    const squares = container.querySelectorAll('div');
    squares.forEach((div) => div.addEventListener(('mouseover'), changeColor));
    squares.forEach((div) => div.addEventListener(('mouseup'), endSketch));
}

let endSketch = () => {
    const squares = container.querySelectorAll('div');
    squares.forEach((div) => div.removeEventListener(('mouseover'), changeColor));
}

let getRgb = () => {
    let r = Math.floor((Math.random()) * 255);
    let g = Math.floor((Math.random()) * 255);
    let b = Math.floor((Math.random()) * 255);

    return (`(${r}, ${g}, ${b})`);
}

let getGreyscale = () => {
    let r = 0;
    let g = 0;
    let b = 0;

    return (`(${r}, ${g}, ${b})`);
}

let setColorScheme = (event) => {
    if (event.target.className === 'rgb') {
        color = 'rgb';
    } else if (event.target.className === 'black') {
        color = 'black';
    } else if (event.target.className === 'greyscale') {
        color = 'greyscale'
    } else if (event.target.className === 'eraser') {
        color = 'eraser';
    } else {
        color = 'black';
    }
}

let changeColor = (event) => {
    if (color === 'black') {
        event.target.setAttribute('id', 'black');
    } else if (color === 'rgb') {
        let randomColor = getRgb();
        event.target.setAttribute('id', 'rgb');
        event.target.style.setProperty('--some-color', `rgb${randomColor}`);   
    } else if (color === 'greyscale') {
        if (event.target.id === 'greyscale') {
            const style = getComputedStyle(event.target);
            const backgroundColor = style.backgroundColor;
            const currentOpacity = Number(backgroundColor.slice(-4, -1));
            if (currentOpacity < 1) {
                a = currentOpacity;
                a += 0.1;
            } else {
                a = 1;
            }
        } else {
            a = 0.1;
        }
        event.target.setAttribute('id', 'greyscale');
        event.target.style.setProperty('--some-color', `rgb(0,0,0,${a})`);
    } else if (color === 'eraser') {
        event.target.setAttribute('id', 'eraser');
    }
}

let clearGrid = (gridSize) => {
    for (let i = 1; i <= gridSize; i++) {
        for (let x = 1; x <= gridSize; x++) {
            const div = container.querySelector('div');
            container.removeChild(div);
        }
    }
}

let getGridSize = () => {
    clearGrid(gridSize);
    gridSize = prompt("Choose a grid size: ");
    gridSize = Number(gridSize);
    
    while (gridSize > 100) {
        gridSize = Number(prompt("Choose a grid size less than 100: "));
    }

    makeGrid(gridSize);
}

let eraseGrid = () => {
    let squares = container.querySelectorAll('div');
    squares.forEach((div) => div.removeAttribute('id'));
}


makeGrid(gridSize);
grid.addEventListener('click', getGridSize);

rgb.addEventListener('click', setColorScheme);
greyscale.addEventListener('click', setColorScheme);
black.addEventListener('click', setColorScheme);
eraser.addEventListener('click', setColorScheme);
clear.addEventListener('click', eraseGrid);

