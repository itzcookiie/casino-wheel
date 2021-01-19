const listOfWords = document.querySelector('.list-of-words'),
lever = document.querySelector('.lever');

const words = ['tax','suit','weave','noise','swop','stuff','medal','rhythm','pardon','attractive'];
let arrangedWords = [];

lever.addEventListener('click', () => {
    spin();
})

function addWordsToDOM(wordsList) {
    listOfWords.innerHTML = '';
    arrangedWords = wordsList;
    const fragment = document.createDocumentFragment();
    const firstThreeWords = wordsList.slice(0, 2);
    firstThreeWords.map((word, index) => {
        const liElement = document.createElement('li');
        liElement.innerHTML = 
        `
            <p>${word}</p>
        `;
        liElement.classList.add('word');
        if(index === firstThreeWords.length - 1) liElement.classList.add('display');
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
    const spinID = setInterval(() => {
        addWordsToDOM(shuffleWords(getWords()));
    }, 200)

    const spinTimer = setTimeout(() => {
        clearInterval(spinID);
        clearTimeout(spinTimer);
    }, 5000)
}

addWordsToDOM(words)