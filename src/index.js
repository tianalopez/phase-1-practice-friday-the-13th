// ## Challenge 1:
// For each movie returned from `http://localhost:3000/movies` create an image and add it to the `movie-list` nav element.

//Global variables
let currentMovie;
const divImg = document.querySelector('#detail-image')
const divTitle = document.querySelector('#title')
const divYear = document.querySelector('#year-released')
const divDesc = document.querySelector('#description')
const divWatch = document.querySelector('#watched')
const bloodForm = document.querySelector('#blood-form')
let bloodCount = document.querySelector('#amount')

//function to create image and add to nav element
const appendMovie = (movie) => {
  const nav = document.querySelector('#movie-list')

  const movieImg = document.createElement('img')
  movieImg.src = movie.image
  movieImg.alt = movie.title

  movieImg.addEventListener('click', () => displayMovieDetails(movie))

  nav.appendChild(movieImg)

}

const displayMovieDetails = (movie) => {
    currentMovie = movie;

    divImg.src = movie.image
    divTitle.innerText = movie.title
    divYear.innerText = movie['release_year']
    divDesc.innerText = movie.description
    divWatch.innerText = movie.watched ? "Watched" : "Unwatched"
    bloodCount.innerText = movie['blood_amount']
}

//Watch status event listener
const clickWatchButton = () => {
  divWatch.addEventListener('click', () => {
    currentMovie.watched = !currentMovie.watched;
    divWatch.innerText = currentMovie.watched ? "Watched": "Unwatched";
  })
}

//get data from db.json
fetch('http://localhost:3000/movies')
.then((resp) => resp.json())
.then ((movieObj) => {
  //populate first movie
  displayMovieDetails(movieObj[0])
  clickWatchButton()
  addBlood()
  //iterate through each movie
  movieObj.forEach((movie) => {
    appendMovie(movie)
  }

)})

//Blood Form Function
const addBlood = () => {
  bloodForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const addMoreBlood = event.target['blood-amount'].value;
    currentMovie.blood_amount += parseInt(addMoreBlood);

    bloodCount.innerText = currentMovie.blood_amount;

    event.target.reset();
  })
}
