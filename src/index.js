// ## Challenge 1:
// For each movie returned from `http://localhost:3000/movies` create an image and add it to the `movie-list` nav element.

//Global variables
const divImg = document.querySelector('#detail-image')
const divTitle = document.querySelector('#title')
const divYear = document.querySelector('#year-released')
const divDesc = document.querySelector('#description')
const divWatch = document.querySelector('#watched')
const divBlood = document.querySelector('#amount')

//function to create image and add to nav element
const appendMovie = (movie) => {
  const nav = document.querySelector('#movie-list')

  const movieImg = document.createElement('img')
  movieImg.src = movie.image
  movieImg.alt = movie.title

  // movie.addEventListener('click', (event) => displayMovieDetails(event))

  nav.appendChild(movieImg)

}

const displayMovieDetails = (movie) => {
    divImg.src = movie.image
    divTitle.innerText = movie.title
    divYear.innerText = movie['release_year']
    divDesc.innerText = movie.description
    divWatch.innerText = movie.watched ? "Watched" : "Unwatched"
}

//get data from db.json
fetch('http://localhost:3000/movies')
.then((resp) => resp.json())
.then ((movieObj) => {
  //populate first movie
  displayMovieDetails(movieObj[0])
  //iterate through each movie
  movieObj.forEach((movie) => {
    appendMovie(movie)
  }
)})
