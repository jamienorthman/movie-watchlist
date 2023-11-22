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
            <div class="movie-container">
                <img class="poster" src="${data.Poster === 'N/A' ? './assets/not-found.png' : 
                data.Poster}" alt="${data.Title}"/>
                <div class="info-container">
                    <div class="info1">
                        <h4 class="movie-title">${data.Title}</h4>
                        <p class="rating">
                            <img src="./assets/star.png" class="star-icon"> ${data.imdbRating}
                        </p>  
                    </div>
                    <div class="info2">
                        <p class="run-time">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <button id="add-watchlist-${data.imdbID}" data-add="${data.imdbID}"> 
                            <img src="./assets/add.png" class="add-icon"> Watchlist
                        </button>
                    </div>
                    <p class="plot">${data.Plot}</p>
                </div>
            </div>
            `
        }
    } else {
        searchList.innerHTML = `
        <p class="unsuccessful">
            Unable to find what you're looking for. Please try another search.
        </p>
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
        const addBtn = document.getElementById(`add-watchlist-${movieID}`)
        addBtn.disabled = true
    } else {
        myMovies.push(movieObj)
        localStorage.setItem("myMovies", JSON.stringify(myMovies))
    }
}

// to truncate text passing 134 ch:
/*function truncateText() {
    const plot = document.querySelector('.plot')
    const truncated = plot.substring(0, 135) + "..." +
    `<button>Read More</button>`
    plot.textContent = truncated
}
OR.. separate fetch to request long plot when 'read more' btn is clicked
*/




    