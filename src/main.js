import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'loaders.css/loaders.min.css';

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('#gallery');
const loadMoreBtn = document.querySelector('#load-more');

let currentPage = 1;
let currentQuery = '';
const lightbox = new SimpleLightbox('.gallery a');

// Обробка події сабміту форми
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Search field cannot be empty!',
        });
        return;
    }

    currentQuery = query;
    currentPage = 1; // Скидаємо на початкову сторінку
    clearGallery(galleryContainer); // Очищуємо попередні результати
    loadMoreBtn.style.display = 'none'; // Ховаємо кнопку "Load more"

    showLoader();

    try {
        const { images, totalHits } = await fetchImages(currentQuery, currentPage);
        
        if (images.length === 0) {
            iziToast.warning({
                title: 'No results',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            hideLoader();
            return;
        }

        renderImages(images, galleryContainer);
        lightbox.refresh();
        
        loadMoreBtn.style.display = 'block'; // Показуємо кнопку "Load more"
        
        // Перевіряємо, чи досягли кінця колекції
        const totalPages = Math.ceil(totalHits / 15); // Обчислюємо загальну кількість сторінок
        if (currentPage >= totalPages) {
            loadMoreBtn.style.display = 'none'; // Сховати кнопку "Load more"
            const endMessage = document.createElement('p');
            endMessage.textContent = "We're sorry, but you've reached the end of search results.";
            endMessage.style.textAlign = 'center'; // Вирівнюємо текст по центру
            galleryContainer.appendChild(endMessage); // Додаємо повідомлення до галереї
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong while fetching images.',
        });
        console.error('Error:', error);
    } finally {
        hideLoader();
    }
});

// Обробка події кліку на кнопку "Load more"
loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1; // Збільшуємо номер сторінки

    showLoader();

    try {
        const { images, totalHits } = await fetchImages(currentQuery, currentPage);
        renderImages(images, galleryContainer);
        lightbox.refresh();

        // Перевіряємо, чи досягли кінця колекції
        const totalPages = Math.ceil(totalHits / 15); // Обчислюємо загальну кількість сторінок
        if (currentPage >= totalPages) {
            loadMoreBtn.style.display = 'none'; // Сховати кнопку "Load more"
            const endMessage = document.createElement('p');
            endMessage.textContent = "We're sorry, but you've reached the end of search results.";
            endMessage.style.textAlign = 'center'; // Вирівнюємо текст по центру
            galleryContainer.appendChild(endMessage); // Додаємо повідомлення до галереї
        }

        // Отримуємо висоту першої картки галереї
        const galleryItem = document.querySelector('.gallery-item');
        if (galleryItem) {
            const { height } = galleryItem.getBoundingClientRect();
            window.scrollBy({
                top: height * 2, // Прокрутка на дві висоти картки
                behavior: 'smooth' // Плавна прокрутка
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Failed to load more images.',
        });
        console.error('Error:', error);
    } finally {
        hideLoader();
    }
});
