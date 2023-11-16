// Base URL: 'http://www.omdbapi.com/?&apikey=bd62154e'

// Data: { Poster, Title, Ratings[{}], Runtime, Genre, Plot }

const searchBtn = document.getElementById('search-btn')
const searchField = document.getElementById('search-field')
const searchList = document.getElementById('search-list')

let searchedMovies = []
let myMovies = []

searchBtn.addEventListener('click', handleSearchClick)

async function handleSearchClick() {
    const response = await fetch(`http://www.omdbapi.com/?apikey=bd62154e&s=${searchField.value}&type=movie`)
    const data = await response.json()
    console.log(data)
    if (data.Search) {
        searchList.innerHTML = ``
        for (let movie of data.Search) {
            const response = await fetch(`http://www.omdbapi.com/?apikey=bd62154e&i=${movie.imdbID}&type=movie`)
            const data = await response.json()
            searchedMovies.push(data)
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
                    <button id="add-btn" data-add="${data.imdbID}">+ Watchlist</button>
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
    myMovies.push(movieObj)
    console.log("test", myMovies)
    localStorage.setItem("myMovies", JSON.stringify(myMovies))
}


    