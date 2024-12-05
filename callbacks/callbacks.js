// Select button and output div
const button = document.getElementById("startButton");
const output = document.getElementById("output");

// Add event listener to the button
button.addEventListener("click", () => {
  // Clear the output div and display a loading message
  output.textContent = "Please wait... Fetching data in 5 seconds.";

  // Simulate a 5-second delay before fetching data
  simulateDelay(5000, () => {
    // Fetch data from API after the delay
    fetchData((data, error) => {
      if (error) {
        // Handle any errors from the API
        output.textContent = `Error: ${error}`;
      } else {
        // Display the fetched post titles
        output.innerHTML = `<h3>Fetched Posts:</h3><ul>${data
          .map((post) => `<li>${post.title}</li>`)
          .join("")}</ul>`;
      }
    });
  });
});

// Function to simulate a delay using a callback
function simulateDelay(delay, callback) {
  setTimeout(callback, delay);
}

// Function to fetch data using a callback
function fetchData(callback) {
  fetch("https://dummyjson.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      return response.json();
    })
    .then((data) => {
      // Validate and pass only the posts array
      if (data && data.posts) {
        callback(data.posts, null); // No error, pass posts data
      } else {
        callback(null, "Unexpected API response structure");
      }
    })
    .catch((error) => {
      callback(null, error.message); // Handle errors and pass the error message
    });
}
