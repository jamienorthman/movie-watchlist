// Base URL: 'http://www.omdbapi.com/?&apikey=bd62154e'

// Data: { Poster, Title, Ratings[{}], Runtime, Genre, Plot }

const searchBtn = document.getElementById('search-btn')
const searchField = document.getElementById('search-field')
const searchList = document.getElementById('search-list')
const watchList = document.getElementById('watch-list')
let searchedMovies = []
let myMovies = []

searchBtn.addEventListener('click', handleSearchClick)

async function handleSearchClick() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=bd62154e&s=${searchField.value}&type=movie`)
    const data = await response.json()
    console.log(data)
    searchList.innerHTML = ``
    for (let movie of data.Search) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=bd62154e&i=${movie.imdbID}&type=movie`)
        const data = await response.json()
        searchList.innerHTML += `
        <div class="movie-container>
            <img class="poster" src="${data.Poster}" />
            <div class="info1>
                <h4 class="movie-title">${data.Title}</h4>
                <p class="rating">${data.imdbRating}</p>  
            </div>
            <div class="info2>
                <p class="run-time">${data.Runtime}</p>
                <p class="genre">${data.Genre}</p>
                <button class="add-btn" data-add="${data.imdbID}">+ Watchlist</button>
            </div>
            <p class="plot">${data.Plot}</p>
        </div>
        `
        searchedMovies.push(data)
    }
}

console.log(searchedMovies)


function handleAddClick(movieData) {
    const movieObj = searchedMovies.filter((movie) => {
        return movie.imdbID == movieData
    })[0]
    myMovies.push(movieObj)
    console.log(myMovies)
}

const addBtn = document.querySelector(".add-btn")
addBtn.addEventListener('click', (e) => {
    handleAddClick(e.target.dataset.add)
    localStorage.setItem("myMovies", JSON.stringify(myMovies))
    let storedMovies = JSON.parse(localStorage.getItem("myMovies"))
    for (let movie of storedMovies) {
        watchList.innerHTML = `
            <div class="movie-container>
            <img class="poster" src="${movie.Poster}" />
            <div class="info1>
                <h4 class="movie-title">${movie.Title}</h4>
                <p class="rating">${movie.imdbRating}</p>  
            </div>
            <div class="info2>
                <p class="run-time">${movie.Runtime}</p>
                <p class="genre">${movie.Genre}</p>
                <button class="add-btn" data-remove="${movie.imdbID}">- Remove from Watchlist</button>
            </div>
            <p class="plot">${movie.Plot}</p>
        </div>
            `
    }
})