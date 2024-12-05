document.getElementById('fetchButton').addEventListener('click', () => {
  document.getElementById('output').innerText = 'Loading...';

  fetchWithTimeout('https://dummyjson.com/posts', 5000)
      .then((data) => {
        // Display fetched post titles, each on a new line
          const titles = data.posts.map((post) => post.title).join('<br>');
          document.getElementById('output').innerHTML = titles;
      })
       // Handle errors
      .catch((error) => {
          document.getElementById('output').innerText = error;
      });
});
// Fetch data with timeout handling using Promises
function fetchWithTimeout(url, timeout) {
  return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject('Operation timed out'), timeout);

      fetch(url)
          .then((response) => response.json())
          .then((data) => {
              clearTimeout(timer);// Clear timeout if fetch is successful
              resolve(data);
          })
          .catch((error) => {
              clearTimeout(timer);// Clear timeout on error
              reject('Error fetching data.');
          });
  });
}
