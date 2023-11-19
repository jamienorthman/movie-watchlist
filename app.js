// Base URL: 'http://www.omdbapi.com/?&apikey=bd62154e'

// Data: { Poster, Title, Ratings[{}], Runtime, Genre, Plot }

const searchBtn = document.getElementById('search-btn')
const searchField = document.getElementById('search-field')
const searchList = document.getElementById('search-list')

let searchedMovies = []
let myMovies = []

searchBtn.addEventListener('click', handleSearchClick)

async function handleSearchClick() {
    const response = await fetch(`https://www.omdbapi.com/?apikey=bd62154e&s=${searchField.value}&type=movie`)
    const data = await response.json()
    console.log(data)
    if (data.Search) {
        searchList.innerHTML = ``
        for (let movie of data.Search) {
            const response = await fetch(`https://www.omdbapi.com/?apikey=bd62154e&i=${movie.imdbID}&type=movie`)
            const data = await response.json()
            searchedMovies.push(data)
            searchList.innerHTML += `
            <div class="movie-container>
                <img class="poster" src="${data.Poster}" />
                <div class="info1>
                    <h4 class="movie-title">${data.Title}</h4>
                    <p class="rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                            <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                        </svg>${data.imdbRating}
                    </p>  
                </div>
                <div class="info2>
                    <p class="run-time">${data.Runtime}</p>
                    <p class="genre">${data.Genre}</p>
                    <button id="add-watchlist-${data.imdbID}" data-add="${data.imdbID}">+ Watchlist</button>
                </div>
                <p class="plot">${data.Plot}</p>
            </div>
            `
        }
    } else {
        searchList.innerHTML = `
        <p class="unsuccessful">Unable to find what you're looking for. Please try another search.</p>
        `
    }
    
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    }
})

function handleAddClick(movieID) {
    const movieObj = searchedMovies.filter((movie) => {
        return movie.imdbID == movieID
    })[0]
    let storedMovies = JSON.parse(localStorage.getItem("myMovies"))
    if (storedMovies) {
        myMovies = storedMovies
    }
    if (myMovies.some(movieObj => movieObj.imdbID == movieID)) {
        console.log('no duplicates!')
        document.getElementById(`add-watchlist-${movieID}`).disabled = true
        document.getElementById(`add-watchlist-${movieID}`).classList.add = 'disabled'
    } else {
        myMovies.push(movieObj)
        localStorage.setItem("myMovies", JSON.stringify(myMovies))
    }
}




    