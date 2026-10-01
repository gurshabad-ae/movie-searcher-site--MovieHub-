


const movieForm = document.querySelector("#movieForm");
const movieName = document.querySelector("#movieName");
const movieHub = document.querySelector("#movieHub");
const searchResults = document.querySelector("#searchResults");
const hamBurger = document.querySelector("#hamburger");
const toggleCheck = document.querySelector("#toggleCheck");

movieForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameMovie = movieName.value.trim();
  if (!nameMovie) {
    return;
  }
  searchMovie(nameMovie);

})

async function searchMovie(name) {
  movieHub.innerHTML = `
  <div class="col-span-full flex justify-center items-center min-h-50">
    <div class="loader"></div>
  </div>
`;
  try {
    let response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=87dc0a1f&s=${encodeURIComponent(name)}`);
    let data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    }
    else {
      movieHub.innerHTML = `
    <div class="col-span-full flex justify-center items-center min-h-50 font-semibold">
    <p>No Results Found!</p>
    </div>
    `;
    }
  }
  catch {
    movieHub.innerHTML = `<div class="flex flex-col gap-5 justify-center items-center text-gray-300 font-semibold tracking-wide">
      <p>Something Went Wrong!</p>
      <p class="text-sm">Try Again Later...</p>
    </div>`;
  }
}

function displayMovies(movies) {
  movieHub.innerHTML = "";

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.dataset.imdbID = movie.imdbID;
    div.className = "movieCard w-full max-w-[220px] mx-auto aspect-[2/3] border object-cover rounded-2xl overflow-hidden border-slate-900 min-h-2xl bg-gray-950 hover:border-orange-800 transition-all ease-linear h-105 duration-200 hover:cursor-pointer";
    div.innerHTML = `<img class="rounded-t-2xl poster" src="${movie.Poster}" alt="">
        <p class="px-3 pt-3 font-semibold tracking-wide text-sm">${movie.Title}</p>
        <p class="px-3 pt-1 font-semibold tracking-wide text-xs text-orange-700 pb-3">${movie.Year}</p>
        `;
    movieHub.append(div);
    console.log(movie.Poster);
    const poster = div.querySelector(".poster");

    poster.addEventListener("error", () => {
      const unavailable = document.createElement("div");
      unavailable.className = "w-full aspect-[2/3] bg-zinc-900 border border-zinc-800 flex items-center font-semibold justify-center text-zinc-500 text-sm text-center px-4";
      unavailable.textContent = "Poster Unavailable!";
      poster.replaceWith(unavailable);
    })
  })
}

movieHub.addEventListener("click", (e) => {
  e.stopPropagation();
  const movieCard = e.target.closest(".movieCard");
  const imdbID = movieCard.dataset.imdbID;
  console.log(imdbID);
  location.href = `movie-details.html?id=${imdbID}`;
})

hamBurger.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleCheck.classList.toggle("hidden");
})