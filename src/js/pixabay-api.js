import axios from 'axios';

const API_KEY = '46051041-cf19ab3ef74349fd60d832ede';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`);

    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return { images: data.hits, totalHits: data.totalHits }; // Повертаємо зображення та загальну кількість
}
