document.getElementById("start").addEventListener("click", async () => {
  const outputDiv = document.getElementById("output");
  outputDiv.textContent = "Loading...";

  try {
      const posts = await fetchPostsWithTimeout(5000);
      // Display fetched await post titles, each on a new line
      outputDiv.innerHTML = posts.map((post) => post.title).join("<br>");
  } catch (error) {
      // Handle errors
      outputDiv.textContent = `Error: ${error.message}`;
  }
});

// Fetch data with timeout handling using async/await
async function fetchPostsWithTimeout(timeout) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timer = setTimeout(() => {
      controller.abort(); // Cancel the request
  }, timeout);

  try {
      const response = await fetch("https://dummyjson.com/posts", { signal });
      if (!response.ok) {
          throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      clearTimeout(timer); // Clear timeout if fetch is successful
      return data.posts;
  } catch (error) {
      clearTimeout(timer); // Clear timeout on error
      if (error.name === "AbortError") {
          throw new Error("Operation timed out");
      } else {
          throw new Error(error.message);
      }
  }
}
