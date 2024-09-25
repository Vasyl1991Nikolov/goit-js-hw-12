export function renderImages(images, container) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="gallery-item">
            <a href="${largeImageURL}" class="gallery-link">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
                <p><strong>Likes:</strong> ${likes}</p>
                <p><strong>Views:</strong> ${views}</p>
                <p><strong>Comments:</strong> ${comments}</p>
                <p><strong>Downloads:</strong> ${downloads}</p>
            </div>
        </div>
    `).join('');

    container.innerHTML += markup; // Додаємо нові зображення до контейнера
}

// Функція для очищення контейнера
export function clearGallery(container) {
    container.innerHTML = ''; // Очищаємо галерею
}

// Показуємо індикатор завантаження
export function showLoader() {
    document.getElementById('loader').style.display = 'flex'; // Припускаємо, що loader має стилі display: none
}

// Приховуємо індикатор завантаження
export function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}