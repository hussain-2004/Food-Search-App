const searchBox = document.getElementById('search-box');
const mealList = document.getElementById('meal-list');
const searchForm = document.getElementById('search-form');
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
const box = document.getElementById('hist');
const btn = document.getElementById('search-button');

displaySearchHistory();

searchBox.addEventListener('click', function() {
    displaySearchHistory();
});

displaySearchHistory();

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const val = searchBox.value.trim();
    let url;
    if (!val) {
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    displayMeals(data.meals);
    updateSearchHistory(val);
});

function displayMeals(meals) {
    mealList.innerHTML = '';
    if (!meals) {
        mealList.innerHTML = '<p>So Sorry....the item you are searching is not available</p>';
    } else {
        meals.forEach(meal => {
            const mealBox = document.createElement('div');
            mealBox.classList.add('meal-box','red-background');
            mealBox.innerHTML = `
            <div class="card shadow">
            <div class="card text-white bg-danger mb-3 border-light mb-3 " style="max-width: 18rem;" >
                    <img class="rounded-circle" src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                </div>
            </div>
            `;
            mealList.appendChild(mealBox);
        });
    }
}

function updateSearchHistory(searchTerm) {
    const index = searchHistory.indexOf(searchTerm);
    if (index !== -1) {
        searchHistory.splice(index, 1);
    }
    searchHistory.unshift(searchTerm);
    if (searchHistory.length > 10) {
        searchHistory.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function displaySearchHistory() {
    
    box.innerHTML = '';
    const historyBox = document.createElement('div');
    historyBox.classList.add('history-box');
    historyBox.innerHTML = '<h3>Recent Searches:</h3>';
    const ul = document.createElement('ul');
    searchHistory.forEach(searchTerm => {
        const li = document.createElement('li');
        li.textContent = searchTerm;
        ul.appendChild(li);
    });
    historyBox.appendChild(ul);
    box.appendChild(historyBox);
    let latestSearches = searchHistory.slice(0, 10);
    let dataList = document.createElement('datalist');
    dataList.id = 'search-history';
    latestSearches.forEach(searchTerm => {
        const option = document.createElement('option');
        option.value = searchTerm;
        dataList.appendChild(option);
    });
    document.body.appendChild(dataList);
}



