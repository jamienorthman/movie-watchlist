// Base URL: 'http://www.omdbapi.com/?i=tt3896198&apikey=bd62154e'

const searchBtn = document.getElementById('search-btn')
const searchField = document.getElementById('search-field')

async function handleSearchClick() {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchField.value}&apikey=bd62154e`)
    const data = await response.json()
    console.log(data)
}

searchBtn.addEventListener('click', handleSearchClick)