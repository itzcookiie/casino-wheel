const listOfWords = document.querySelector('.list-of-words'),
lever = document.querySelector('.lever'),
leverHandle = document.querySelector('.lever__handle');

const words = ['tax','suit','weave','noise','swop','stuff','medal','rhythm','pardon','attractive'];
let arrangedWords = [];

let spinTimeMS;

leverHandle.addEventListener('click', e => {
    e.target.setAttribute('disabled', '');
    e.target.classList.toggle('moveLever');
    spin();
    const leverTime = setTimeout(() => {
        clearTimeout(leverTime);
        const leverUpTime = setTimeout(() => {
            clearTimeout(leverUpTime);
            e.target.removeAttribute('disabled');
            e.target.classList.toggle('moveLever');
        }, spinTimeMS - 500)
    }, 500)
})

function addWordsToDOM(wordsList) {
    listOfWords.innerHTML = '';
    arrangedWords = wordsList;
    const fragment = document.createDocumentFragment();
    const firstThreeWords = wordsList.slice(0, 2);
    firstThreeWords.map((word, index) => {
        const liElement = document.createElement('li');
        if(index === firstThreeWords.length - 1) {
            liElement.innerHTML = 
            `
                <h2>${word}</h2>
            `;
            liElement.classList.add('display');
        }
        liElement.innerHTML = 
        `
            <h4>${word}</h4>
        `;
        liElement.classList.add('word');
        fragment.appendChild(liElement);
    })
    listOfWords.appendChild(fragment);
}

function shuffleWords(wordsList) {
    const { length } = wordsList;
    return wordsList.map((word, index) => {
        let nextPosition = length + (index - 1);
        const calculatedPosition = nextPosition % length;
        const newWord = wordsList[calculatedPosition];
        return newWord
    })
}

function getWords() {
    return arrangedWords
}

function spin() {
    setSpinTime();
    // const now = performance.now();
    // const randomTime = (Math.random() * 5) * 1000;
    // const spinID = setInterval(() => {
    //     const after = performance.now();
    //     const timeDiff = +((after - now) / 1000).toFixed(3)
    //     console.log(timeDiff)
    //     addWordsToDOMGenerator(timeDiff)
    // }, 1000)
    addWordsToDOMGenerator(performance.now());

    const spinTimer = setTimeout(() => {
        // clearInterval(spinID);
        clearTimeout(spinTimer);
    }, spinTimeMS)
}

function spinTime(multiplier=5) {
    return parseInt((Math.random() * multiplier) * 1000);
}

function setSpinTime() {
    spinTimeMS = 10000;
}

function calculateGradient(x) {
    return 100 - x**2
}

// function addWordsToDOMGenerator(timeDiff) {
//     const calculatedGradient = calculateGradient(timeDiff);
//     const timeInterval = (1/calculatedGradient)*1000;
//     for(let i = 0; i < calculatedGradient; i++) {
//         const t0 = setTimeout(() => {
//             addWordsToDOM(shuffleWords(getWords()));
//             clearTimeout(t0)
//         }, timeInterval)
//     }
//     const t0 = setTimeout(() => {
//         addWordsToDOMGenerator
//         addWordsToDOM(shuffleWords(getWords()));
//         clearTimeout(t0)
//     }, timeInterval)
// }

function addWordsToDOMGenerator(currentTime) {
    const now = performance.now();
    const changeInTime =  now - currentTime;
    if(changeInTime >= 10000) {
        return;
    }
    const timeInSeconds = changeInTime / 1000;
    addWordsToDOM(shuffleWords(getWords()));
    const calculatedGradient = calculateGradient(timeInSeconds);
    const timeDelay = (10/calculatedGradient)*1000;
    setTimeout(() => {
        addWordsToDOMGenerator(currentTime);
        console.log(timeDelay, timeInSeconds);
    }, timeDelay)
}



addWordsToDOM(words)