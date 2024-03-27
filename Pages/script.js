function handleSubmit(event) {
    event.preventDefault();
    const searchQuery = document.querySelector(".js-search-input").value.trim();
    const searchResults = document.querySelector(".js-search-results")
    searchResults.innerHTML = "";

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) throw Error(response.statusText)       
            return response.json();
        })
        .then(({query : {search : results}})=>{
            if (results.length ===0) {
                alert("Aucun resultat");
                return;
            }
            results.forEach(result => {
                const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
                searchResults.insertAdjacentHTML(
                    'beforeend',
                    ` <div class="result-item">
                    <h3 class="result-title">
                        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
                    </h3>
                    <a href="${url}" target="_blank" class="result-link" rel="noopener">${url}</a><br>
                    <span class="result-snippet">${result.snippet}</span><br>
        
                </div>`
                )
            });
        })
        .catch(err =>{
            console.log(err);
            alert("Echec de la recherche")
        })

}

document.querySelector(".js-search-form").addEventListener("submit", handleSubmit);