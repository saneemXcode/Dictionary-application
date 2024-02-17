
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

    while (currentIndex < data.meanings.length) {
        const meaning = data.meanings[currentIndex];
        if (!partOfSpeech.length && meaning?.partOfSpeech) {
            partOfSpeech.push(meaning.partOfSpeech);
        }
        
        const phonetic = data.phonetics[currentIndex];
        if (!allPhonetics.length && phonetic?.text) {
            allPhonetics.push(phonetic.text);
        }
    
        if (!audioSrc && phonetic?.audio) {
            audioSrc = phonetic.audio;
        }
    
        if (!definition && meaning?.definitions.length > 0) {
            definition = meaning.definitions[0].definition;
        }
    
        if (!example && meaning?.definitions.length > 0) {
            example = meaning.definitions[0].example;
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
function createBubble() {
    const section = document.querySelector('body');
    const createElement = document.createElement('span');
    var sze = Math.random() * 40;
    createElement.style.width = 20 + sze + 'px';
    createElement.style.height = 20 + sze + 'px';
    createElement.style.left = Math.random() * (window.innerWidth - 40) + "px";
    
    createElement.classList.add('bubble');

    section.appendChild(createElement);

    setTimeout(() => {
        createElement.remove();
    }, 4000);
}

setInterval(createBubble, 50);
