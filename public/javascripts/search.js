// public/js/search.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('autocomplete-results');
  
    searchInput.addEventListener('input', async () => {
      const query = searchInput.value.trim();
      if (query.length > 0) {
        try {
            const response = await fetch(`/search-post?query=${encodeURIComponent(query)}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
          const results = await response.json();
          displayResults(results);
        } catch (err) {
          console.error('Error fetching search results:', err);
        }
      } else {
        resultsContainer.innerHTML = '';
      }
    });
  
    function displayResults(results) {
      resultsContainer.innerHTML = '';
      results.forEach(result => {
        const div = document.createElement('div');
        div.textContent = result.title; // You can customize what to show here
        div.classList.add('autocomplete-item');
        div.addEventListener('click', () => {
          searchInput.value = result.title; // Or set it to whatever you want
          resultsContainer.innerHTML = '';
          document.getElementById('search-form').submit();
          // You can also redirect to the post page here
        });
        resultsContainer.appendChild(div);
      });
    }
  });
  