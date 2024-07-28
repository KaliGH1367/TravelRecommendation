function Search(){
    const keyword = document.getElementById("search-input").value.toLowerCase();

    fetch("travel_recommendation_api.json")
        .then(data => data.json())
        .then(data => {
            const home_suggestions = document.getElementById("home-suggestions");
            let suggest = null;

            // countries
            for(country in data.countries)
            {
                const name = data.countries[country].name.toLowerCase();
                if(name.includes(keyword))
                {
                    suggest = data.countries[country].cities;
                }
            }

            if(suggest == null)
            {
                // if the keyword "country" or "countries" are used, suggest a random set
                if("countries".includes(keyword) || "country".includes(keyword))
                {
                    let rand = parseInt(Math.random() * data.countries.length);
                    suggest = data.countries[rand].cities;
                }
            }

            // temples
            if(suggest == null)
            {
                if("temples".includes(keyword))
                {
                    suggest = data.temples;
                }
            }

            // beaches
            if(suggest == null)
            {
                if("beaches".includes(keyword))
                {
                    suggest = data.beaches;
                }
            }
            
            // remove all existing suggestions
            home_suggestions.innerHTML = "";

            // display suggestions
            if(suggest != null)
            {
                for(const i in suggest)
                {
                    let html_content = `<img src="${suggest[i].imageUrl}" alt="">`;
                    html_content += `<h2>${suggest[i].name}</h2>`;
                    html_content += `<p>${suggest[i].description}</p>`;
                    html_content += `<button id="visit">Visit</button>`;
                    html_content += `</div>`;
                    let new_div = document.createElement("div");
                    new_div.classList.add("recommendation", "dark-bg");
                    new_div.innerHTML = html_content;
                    home_suggestions.appendChild(new_div);
                }

                // extra space at the bottom of suggestions
                let new_div = document.createElement("div");
                new_div.innerHTML = `<br><br><br><br><br><br><br>`;
                home_suggestions.appendChild(new_div);
            }
            else
            {
                let html_content = `<img src="lost.jpg" alt="">`;
                html_content += `<h2>No suggestion found, please try another keyword.</h2>`;
                html_content += `</div>`;
                let new_div = document.createElement("div");
                new_div.classList.add("recommendation", "dark-bg");
                new_div.innerHTML = html_content;
                home_suggestions.appendChild(new_div);
            }
        });
}

function ClearSearch(){
    document.getElementById("search-input").value = "";
}

document.getElementById("search-button").addEventListener('click', Search);
document.getElementById("search-clear-button").addEventListener('click', ClearSearch);