// Format dateTime string from API correctly
function formatDate(dateTimeString) {
  const date = new Date(dateTimeString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Construct a formatted date string in the format: "Day Month Year"
  return `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
}

// Fetch and display posts from Wordpress API
fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    data.forEach((post) => {
      // Get the name of the third category or use "General" as a default
      const termName = post._embedded["wp:term"][2][0]?.name || "General";

      // Format the modification date of the post using the formatDate function
      const formattedDate = formatDate(post.modified);

      // Construct the HTML markup for each post
      const markup = `
      <li class="col-4">
        <div class="p-card card-decoration">
          <div class="p-card__content">
            ${termName ? `<h3 class="p-text--small-caps">${termName}</h3>` : ""}
            <hr class="is-muted dotted">
            <img class="p-card__image" src="${
              post.featured_media
            }" alt="Article Image" />
            <h4><a href="${post.link}">${post.title.rendered}</a></h4>
            <em>By <a href="${post._embedded.author[0].link}">${
        post._embedded.author[0].name
      }</a> on ${formattedDate}</em>
            <hr class="is-muted dotted">
            <p class="blog-p-card__footer">${
              post._embedded["wp:term"][0][0].name
            }</p>
          </div>
        </div>
      </li>
      `;

      // Insert the markup into the <ul> element
      document.querySelector("ul").insertAdjacentHTML("beforeend", markup);
    });
  })
  .catch((error) => {
    console.log(error);
  });