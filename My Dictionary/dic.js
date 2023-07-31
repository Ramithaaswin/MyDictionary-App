// console.log("hello");



// going to pages on buttonclick
function goToHistory () {
    document.location.href = "dicsecond.html";
}
function goToMainPage () {
    document.location.href = "dicfirst.html";
}



// api call and fetch the data
function callAPI(searchInput) {
    const apiCallUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`;

    fetch(apiCallUrl)
        .then((response) => response.json())
        .then((data) => {
            const searchword = data[0].word;
            const definition = data[0].meanings[0].definitions[0].definition;
            // console.log(word)
           
            document.getElementById('wordheading').innerText = "word: "+searchword;
           
            const definitions = data[0].meanings.flatMap(meaning => meaning.definitions);
            // console.log(definitions)
            
            document.getElementById('wordmeaning').innerText = definition;

            // saving to local Storage
            const savedSearch = JSON.parse(localStorage.getItem('searches')) || [];
            savedSearch.push({searchword, definition});
            localStorage.setItem('searches', JSON.stringify(savedSearch));
            console.log(savedSearch);
        })

        // error handling
        .catch((error) => {
            console.error('Error in fetching data', error);
        })
}
function fetchAPI() {
    const inputField = document.getElementById('searchinput');
    const value = inputField.value;

    if(value.trim() !== ' '){
        callAPI(value);
    } 
}


// showing the search data in the cards of history page
const data = JSON.parse(localStorage.getItem('searches'));
const cardContainer = document.getElementById('wordcardcontainer');


for(let i = data.length - 1; i >= data.length - 3; i--) {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = i;

    const h2 = document.createElement('h2');
    h2.className = 'meaning-heading';
    h2.textContent = data[i].searchword;
    card.appendChild(h2);

    const p = document.createElement('p');
    p.className = 'word-meaning';
    p.textContent = data[i].definition;
    card.appendChild(p);

    let dltbtn = document.createElement('button');
    dltbtn.className = 'delete-btn'
    let img = document.createElement("img");
    img.src = "./images/deletbin.png"; 
    img.className = 'delete-btn-img'
    dltbtn.appendChild(img);

    dltbtn.addEventListener("click",function(){
        deleteCard(i);
    });
    // const dltbtn = document.getElementById('cardDelete');
    card.appendChild(dltbtn);
    cardContainer.appendChild(card);

}

// function to delete the card on delete button click and reload the page whenever dlt btn is clicked
function deleteCard(index){
    const card = document.getElementById(index);
    card.parentNode.removeChild(card);
    data.splice(index, 1);
    localStorage.setItem('searches',JSON.stringify(data));
    window.location.reload();
}








