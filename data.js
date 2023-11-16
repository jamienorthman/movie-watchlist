const watchList = document.getElementById('watch-list')
let storedMovies = JSON.parse(localStorage.getItem("myMovies"))
    
document.addEventListener('click', (e) => {
    if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    }
})
    
async function updateWatchlist() {
    if (storedMovies) {
        for (let movie of storedMovies) {
            const response = await fetch(`http://www.omdbapi.com/?apikey=bd62154e&i=${movie.imdbID}&type=movie`)
            const data = await response.json()
            console.log(data)
            watchList.innerHTML += `
                <div class="movie-container>
                <img class="poster" src="${data.Poster}" />
                <div class="info1>
                    <h4 class="movie-title">${data.Title}</h4>
                    <p class="rating">${data.imdbRating}</p>  
                </div>
                <div class="info2>
                    <p class="run-time">${data.Runtime}</p>
                    <p class="genre">${data.Genre}</p>
                    <button id="remove-btn" data-remove="${data.imdbID}">- Remove from Watchlist</button>
                </div>
                <p class="plot">${data.Plot}</p>
            </div>
                ` 
        }
    }
}

updateWatchlist()

function handleRemoveClick(movieID) {

}