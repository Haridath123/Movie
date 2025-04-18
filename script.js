async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  const url = `https://www.omdbapi.com/?apikey=ed0ad4a4&s=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  if (data.Response === "True") {
    data.Search.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;
      container.appendChild(card);
    });
  } else {
    container.innerHTML = `<p>No movies found!</p>`;
  }
}

async function showSuggestions() {
  const suggestions = ["Inception", "Avengers", "Interstellar", "The Matrix", "John Wick"];

  const container = document.getElementById("moviesContainer");
  container.innerHTML = "<h2>Suggestions</h2>";

  for (let title of suggestions) {
    const url = `https://www.omdbapi.com/?apikey=ed0ad4a4&t=${title}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      const card = document.createElement("div");
      card.className = "movie-card";
      card.innerHTML = `
        <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${data.Title}" />
        <h3>${data.Title}</h3>
        <p>${data.Year}</p>
      `;
      container.appendChild(card);
    }
  }
}

window.onload = showSuggestions;
