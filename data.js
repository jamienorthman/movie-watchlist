const watchList = document.getElementById('watch-list')
let storedMovies = JSON.parse(localStorage.getItem('myMovies'))
let watchListArray = []

    
document.addEventListener('click', (e) => {
    if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
})

if (storedMovies) {
    watchListArray = storedMovies
}
    
function updateWatchlist() {
    if (watchListArray) {
        watchList.innerHTML = ``
        for (let movie of watchListArray) {
            watchList.innerHTML += `
                <div class="movie-container>
                <img class="poster" src="${movie.Poster}" />
                <div class="info1>
                    <h4 class="movie-title">${movie.Title}</h4>
                    <p class="rating">${movie.imdbRating}</p>  
                </div>
                <div class="info2>
                    <p class="run-time">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <button id="remove-btn" data-remove="${movie.imdbID}">- Remove from Watchlist</button>
                </div>
                <p class="plot">${movie.Plot}</p>
            </div>
                ` 
        }
    } else {
        watchList.innerHTML += `
        <div class="empty-list">
            <p class="unsuccessful">Your watchlist is looking a little empty...</p>
            <button><a href="index.html>+ Let's add some movies!</a></button>
        </div>
        `
    }
}

function handleRemoveClick(movieID) {
    const filteredMovies = watchListArray.filter((movie) => {
        return movie.imdbID !== movieID
    })
    watchListArray = filteredMovies
    localStorage.setItem('myMovies', JSON.stringify(watchListArray))
    console.log(watchListArray)
    updateWatchlist()
}

updateWatchlist()