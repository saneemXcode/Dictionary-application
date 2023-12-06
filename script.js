const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionary = document.querySelector('.dictionary-app');

// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

async function dictionaryFn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json());
    return res[0];
}

btn.addEventListener('click', fetchandCreateCard);
input.addEventListener('input', checkInputValue);

async function fetchandCreateCard() {
    const data = await dictionaryFn(input.value);
    console.log(data);

    let partOfSpeech = [];
    let currentIndex = 0;
    let found = false;

    while (!found && currentIndex < data.meanings.length) {
        if (data.meanings[currentIndex].partOfSpeech) {
            partOfSpeech.push(data.meanings[currentIndex].partOfSpeech);
            found = true;
        } else {
            currentIndex++;
        }
    }

    let allPhonetics = [];
    let phoneticsIndex = 0;
    while (!found && phoneticsIndex < data.phonetics.length) {
        if (data.phonetics[phoneticsIndex].text) {
            allPhonetics.push(data.phonetics[phoneticsIndex].text);
            found = true;
        } else {
            phoneticsIndex++;
        }
    }
    if (allPhonetics.length > 1) {
        allPhonetics = allPhonetics.join(', ');
    } else {
        allPhonetics = allPhonetics[0];
    }

    dictionary.innerHTML = `
        <div class="card">
            <div class="property">
                <span>Word :</span>
                <span>${data.word}</span>
            </div>
            <div class="property">
                <span>Phonetics :</span>
                <span>${allPhonetics}</span>
            </div>
            <div class="property">
                <span>
                    <audio controls src="${data.phonetics[0].audio}"></audio>
                </span>
            </div>
            <div class="property">
                <span>Definition</span>
                <span>${found ? data.meanings[currentIndex].definitions[0].definition : 'Data not found'}</span>
            </div>
            <div class="property">
                <span>Example:</span>
                <span>${found ? data.meanings[currentIndex].definitions[0].example : 'Example not found'}</span>
            </div>
            <div class="property">
                <span>Part of Speech :</span>
                <span>${partOfSpeech.join(',')}</span>
            </div>
        </div>
    `;
}

function checkInputValue() {
    if (input.value === '') {
        dictionary.innerHTML = ''; // Clear the content if input is empty
    }
}


// const input = document.querySelector('input');
// const btn = document.querySelector('button');
// const dictionary = document.querySelector('.dictionary-app');

// // https://api.dictionaryapi.dev/api/v2/entries/en/<word>

// async function dictionaryFn(word) {
//     const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
//         .then(res => res.json());
//     return res[0];
// }

// btn.addEventListener('click', fetchandCreateCard);
// input.addEventListener('input', checkInputValue);

// async function fetchandCreateCard() {
//     const data = await dictionaryFn(input.value);
//     console.log(data);

//     let partOfSpeech = [];
//     for (let i = 0; i < data.meanings.length - 1; i++) {
//         partOfSpeech.push(data.meanings[i].partOfSpeech);
//     }

//     let allPhonetics = [];
//     data.phonetics.forEach(phonetic => {
//         allPhonetics.push(phonetic.text);
//     });
//     if (data.phonetics.length > 1) {
//         allPhonetics = allPhonetics.join(', ');
//     } else {
//         allPhonetics = allPhonetics[0];
//     }

//     dictionary.innerHTML = `
//         <div class="card">
//             <div class="property">
//                 <span>Word :</span>
//                 <span>${data.word}</span>
//             </div>
//             <div class="property">
//                 <span>Phonetics :</span>
//                 <span>${allPhonetics}</span>
//             </div>
//             <div class="property">
//                 <span>
//                     <audio controls src="${data.phonetics[1].audio}"></audio>
//                 </span>
//             </div>
//             <div class="property">
//                 <span>Definition</span>
//                 <span>${data.meanings[0].definitions[0].definition}</span>
//             </div>
//             <div class="property">
//                 <span>Example:</span>
//                 <span>${data.meanings[1].definitions[0].example}</span>
//             </div>
//             <div class="property">
//                 <span>Part of Speech :</span>
//                 <span>${partOfSpeech.join(',')}</span>
//             </div>
//         </div>
//     `;
// }

// function checkInputValue() {
//     if (input.value === '') {
//         dictionary.innerHTML = ''; // Clear the content if input is empty
//     }
// }
