// Get the news container element
const newsContainer = document.getElementById("news-container");

// Reference to search input and search button
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Function to fetch news articles from GNews API
async function fetchNews(searchTerm = "") {

    const apiKey = f705b9d0552a5d80e0619b45471f71ea;
    let apiUrl = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en`;

    if (searchTerm) {
        apiUrl += `&q=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
}

// Function to display news articles
async function displayNews(searchTerm = "") {
    const articles = await fetchNews(searchTerm);

    // Clear existing news cards
    newsContainer.innerHTML = "";

    // Loop through each article and create a news card
    articles.forEach(article => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");

        const image = document.createElement("img");
        image.src = article.image;
        image.alt = article.title;
        image.classList.add("news-image");

        const title = document.createElement("h2");
        title.innerText = article.title;
        title.classList.add("news-title");

        const description = document.createElement("p");
        description.innerText = article.description;
        description.classList.add("news-description");

        const link = document.createElement("a");
        link.href = article.url;
        link.target = "_blank";
        link.innerText = "Read Full Article";
        link.classList.add("news-link");

        // Append elements to the news card
        newsCard.appendChild(image);
        newsCard.appendChild(title);
        newsCard.appendChild(description);
        newsCard.appendChild(link);

        // Append the news card to the news container
        newsContainer.appendChild(newsCard);
    });
}

// Call the displayNews function initially to populate the app with top stories
displayNews();

// Add event listener to the search button
searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== "") {
        displayNews(searchTerm);
    } else {
        // If search term is empty, display top stories again
        displayNews();
    }
});
