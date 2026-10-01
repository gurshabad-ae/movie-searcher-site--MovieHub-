const params = new URLSearchParams(location.search);
const imdbID = params.get("id");
const movieDetails = document.querySelector("#movieDetails");
const toggleCheck = document.querySelector("#toggleCheck");
const hamBurger = document.querySelector("#hamburger");
const noPoster = "https://placehold.co/400x600/18181b/a1a1aa?text=No+Poster";

if (imdbID) {
    searchMovie(imdbID.trim());
}

async function searchMovie(imdbID) {
    try {
    let response = await fetch(`https://www.omdbapi.com/?apikey=87dc0a1f&i=${imdbID}&plot=full`);
    let data = await response.json();

    if (data.Response = "True") {
        displayMovies(data)
    }
    else {
        console.log("error");
    }
    }
    catch {
        movieDetails.innerHTML = `
        <div class="flex flex-col gap-5 justify-center items-center text-gray-300 font-semibold tracking-wide">
        <p>Something Went Wrong!</p>
        <p class="text-sm">Try Again Later...</p>
        </div>
        `;
    }
}

function displayMovies(data) {
    const poster = (data.Poster && data.Poster !== "N/A") ? data.Poster : noPoster;
    const div = document.createElement("div");
    div.className = "flex flex-col md:flex-row justify-between gap-5"
    div.innerHTML = `
    <div class="flex gap-3 w-full md:w-1/3 flex-col mt-4">
    <div class="flex items-center w-full justify-center py-6">
            <img class="w-full poster max-w-75 aspect-2/3 object-cover rounded-2xl border border-slate-800" src="${poster}" alt="">
        </div>
        <a target="_blank" href="https://www.imdb.com/title/${imdbID}/" class="py-3 px-4 bg-orange-800 flex justify-center items-center gap-2 font-semibold text-sm mb-8 rounded-lg hover:bg-orange-700
                        text-white cursor-pointer
                        transition-all duration-200
                        hover:-translate-y-0.5 active:translate-y-0">
            <p>View on IMDb</p>
            <svg class="w-4 h-4 rotate-180 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>

        </a>
        </div>
        <div class="md:w-2/3 min-w-0 flex flex-col gap-5">
        <div class="font-bold pt-8 text-4xl">
            <p>${data.Title}</p>
        </div>
        <div class=" flex flex-wrap gap-2">
            <p class="bg-slate-900 px-3 py-1.5 border border-gray-700 mb-2 font-semibold rounded-lg text-sm">${data.Released}</p>
            <p class="bg-slate-900 px-3 py-1.5 border border-gray-700 mb-2 font-semibold rounded-lg text-sm">${data.Rated}</p>
            <p class="bg-slate-900 px-3 py-1.5 border border-gray-700 mb-2 font-semibold rounded-lg text-sm">${data.Runtime}</p>
            <p class="bg-red-950 px-3 py-1.5 border border-red-700 text-red-400 mb-2 font-semibold rounded-lg text-sm">${data.Genre}</p>
            <p class="bg-yellow-950 text-yellow-400 px-3 py-1.5 border border-yellow-600 mb-2 font-semibold rounded-lg text-sm">IMDb: ${data.imdbRating}/10</p>
        </div>
        <div class="bg-slate-900 py-3 px-5 rounded-lg border flex flex-col gap-3 border-gray-700">
            <p class="font-semibold text-sm pt-3 uppercase text-orange-700 tracking-wide">Plot overview</p>
            <p class="pb-4">${data.Plot}</p>
        </div>
        <div class="flex md:flex-row flex-col gap-5 ">
        <div class="bg-slate-900 py-3 px-5 rounded-lg border flex flex-1 flex-col gap-1 border-gray-700">
            <p class="text-gray-400 uppercase text-xs tracking-wider font-semibold">Director</p>
            <p class="font-semibold">${data.Director}</p>
        </div>
        <div class="bg-slate-900 py-3 px-5 rounded-lg border flex flex-col gap-1 flex-1 border-gray-700">
            <p class="text-gray-400 uppercase text-xs tracking-wider font-semibold">Writer</p>
            <p class="font-semibold">${data.Writer}</p>
        </div></div>
        <div class="bg-slate-900 py-3 px-5 rounded-lg border flex flex-col gap-1 border-gray-700">
            <p class="text-gray-400 uppercase text-xs tracking-wider font-semibold">Actors</p>
            <p class="font-semibold">${data.Actors}</p>
        </div>
        <div class="flex flex-col gap-5 md:flex-row">
        <div class="bg-slate-900 py-3 md:mb-8 px-5 rounded-lg border flex flex-col flex-1 gap-1 border-gray-700">
            <p class="text-gray-400 uppercase text-xs tracking-wider font-semibold">Language</p>
            <p class="font-semibold">${data.Language}</p>
        </div>
        <div class="bg-slate-900 py-3 md:mb-8 mb-8 px-5 rounded-lg border flex flex-1 flex-col gap-1 border-gray-700">
            <p class="text-gray-400 uppercase text-xs tracking-wider font-semibold">Country</p>
            <p class="font-semibold">${data.Country}</p>
        </div>
    `;
    movieDetails.append(div);

    const errorPoster = div.querySelector(".poster");
    errorPoster.addEventListener("error", () => {
        const unavailable = document.createElement("div");
        unavailable.className = "w-full max-w-75 aspect-[2/3] bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 text-sm text-center rounded-2xl font-semibold px-4";
        unavailable.textContent = "Poster Unavailable!";
        errorPoster.replaceWith(unavailable);
    })
}
hamBurger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCheck.classList.toggle("hidden");
})