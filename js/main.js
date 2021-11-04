const setBtn = document.querySelector('#set-dimensions');
const wrapGrid = document.querySelector('.wrap-grid');
const dimensionLevel = document.getElementById('dimensions')
setBtn.addEventListener('click', () => {
    //reset contenuto wrap-grid
    wrapGrid.innerHTML = '';

    //ottenimento valore dimensione griglia
    const gridDimensions = dimensionLevel.value;
    let cellNumber;
    let cellPerSide;

    //in base alla selezione, imposteremo i seguenti valori

    switch (gridDimensions) {
        case '3':
            cellNumber = 100;
            cellPerSide = 10;
            break;
        
        case '2':
            cellNumber = 81;
            cellPerSide = 9;
            break;

        case '1':
            cellNumber = 49;
            cellPerSide = 7;
            break;
    }
    console.log(cellNumber, cellPerSide);

    // generazione Grid parent
    const grid = document.createElement('div');
    grid.classList.add('grid');

    //inserimento griglia nel body
    wrapGrid.append(grid);

    // gen grid square
    const numList = []; //lista di numeri univoci
    for (let i = 1; i <= cellNumber; i++) {
        // gen num random per la casella
        let number = genUnicoRandom(numList, 1, cellNumber);
        numList.push(number);

        //generazione squares
        const square = createGridSquare(number, cellPerSide);
        grid.append(square);

        square.addEventListener('click', function() {
            this.classList.add('active');
        });
    }
});

// generazione random di un numero unico

function genUnicoRandom(list, min, max) {
    //loop fino a nuovo numero non presente nell'array
    let number = 0;
    do {
        number = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (list.includes(number));

    return number;
}

function createGridSquare(num, cells) {
    // pari o dispari
    // operatore ternario
    const type = (num % 2 === 0) ? 'even' : 'odd';

    // creiamo nodo .square
    const node = document.createElement('div');
    node.classList.add('square', `square-${type}`);
    node.style.width = `calc( 100% / ${cells})`;
    node.style.height = `calc(100% / ${cells})`;

    //nodo span per il testo
    const span = document.createElement('span');
    span.append(num);
    node.append(span);

    return node;
}