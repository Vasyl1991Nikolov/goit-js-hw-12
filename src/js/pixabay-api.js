import axios from 'axios';

const API_KEY = '46051041-cf19ab3ef74349fd60d832ede';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 15
            }
        });

        return { images: response.data.hits, totalHits: response.data.totalHits }; // Повертаємо зображення та загальну кількість

    } catch (error) {
        throw new Error('Не вдалося отримати зображення');
    }
}
