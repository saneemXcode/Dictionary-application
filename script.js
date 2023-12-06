// const input =document.querySelector('input')
// const btn=document.querySelector('button')
// const dictionary=document.querySelector('.dictionary-app')

// // https://api.dictionaryapi.dev/api/v2/entries/en/<word>

// async function dictionaryFn(word){
//     const res= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)//in this word we passing text from keyword 
//     // when we use async function we use await 
//     .then(res => res.json())
//     return res[0]
// }

// btn.addEventListener('click',fetchandCreateCard)

// async function fetchandCreateCard(){
//     const data= await dictionaryFn(input.value)
//     console.log(data)

//     let partOfSpeech=[]
//     for(let i=0;i<data.meanings.length-1;i++){
//         partOfSpeech.push(data.meanings[i].partOfSpeech)
//     }


// dictionary.innerHTML=`
// <div class="card">
// <div class="property">
// <span>Word :</span>
// <span>${data.word}</span>
// </div>
// <div class="property">
// <span>Phonetics :</span>
// <span>${data.phonetic}</span>
// </div>
// <div class="property">
// <span>
// <audio controls src="${data.phonetics[1].audio }"></audio>
// </span>

// </div>
// <div class="property">
// <span>Definition</span>
// <span>${data.meanings[0].definitions[0].definition}</span>
// </div>
// <div class="property">
// <span>Example:</span>
// <span>${data.meanings[1].definitions[0].example} </span>
// </div>
// <div class="property">
// <span>Part of Speech :</span>
// <span>${partOfSpeech.map(e => e).join(',')}</span>
// </div>
// </div>
// `

// }

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

// last modified version code
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
    let allPhonetics = [];
    let audioSrc = '';
    let definition = '';
    let example = '';
    let currentIndex = 0;

    while (!(partOfSpeech.length && allPhonetics.length && audioSrc && definition && example) && currentIndex < data.meanings.length) {
        if (!partOfSpeech.length && data.meanings[currentIndex]?.partOfSpeech) {
            partOfSpeech.push(data.meanings[currentIndex].partOfSpeech);
        }

        if (!allPhonetics.length && data.phonetics[currentIndex]?.text) {
            allPhonetics.push(data.phonetics[currentIndex].text);
        }

        if (!audioSrc && data.phonetics[currentIndex]?.audio) {
            audioSrc = data.phonetics[currentIndex].audio;
        }

        if (!definition && data.meanings[currentIndex]?.definitions.length > 0) {
            definition = data.meanings[currentIndex].definitions[0].definition;
        }

        if (!example && data.meanings[currentIndex]?.definitions.length > 0) {
            example = data.meanings[currentIndex].definitions[0].example;
        }

        currentIndex++;
    }

    dictionary.innerHTML = `
        <div class="card">
            <div class="property">
                <span>Word :</span>
                <span>${data.word}</span>
            </div>
            <div class="property">
                <span>Phonetics :</span>
                <span>${allPhonetics.join(', ') || 'Phonetics not found'}</span>
            </div>
            <div class="property">
                <span>
                    <audio controls>
                        <source src="${audioSrc || '#'}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </span>
            </div>
            <div class="property">
                <span>Definition</span>
                <span>${definition || 'Definition not found'}</span>
            </div>
            <div class="property">
                <span>Example:</span>
                <span>${example || 'Example not found'}</span>
            </div>
            <div class="property">
                <span>Part of Speech :</span>
                <span>${partOfSpeech.join(', ') || 'Part of speech not found'}</span>
            </div>
        </div>
    `;
}

function checkInputValue() {
    if (input.value === '') {
        dictionary.innerHTML = ''; // Clear the content if input is empty
    }
}
