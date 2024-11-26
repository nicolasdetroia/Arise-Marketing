// Sample reviews
const reviews = [
    { name: 'John Doe', rating: 5, comment: 'Amazing service! Helped my business grow significantly.' },
    { name: 'Jane Smith', rating: 5, comment: 'Highly professional and reliable. Great experience!' },
    { name: 'ACME Corp', rating: 4, comment: 'Exceeded expectations. Will work with them again.' },
    { name: 'Global Tech', rating: 4, comment: 'Good results but slightly delayed delivery.' },
];

// Populate the reviews section
const reviewContainer = document.querySelector('#reviewContainer');
reviews.forEach((review) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-6 shadow-md rounded-md';
    card.innerHTML = `
        <h2 class="text-xl font-bold">${review.name}</h2>
        <p class="text-gray-600 mt-2">${review.comment}</p>
        <p class="rating mt-2">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
    `;
    reviewContainer.appendChild(card);
});

// Randomize reviews
document.querySelector('#randomizeReviews').addEventListener('click', () => {
    reviewContainer.innerHTML = '';
    const shuffledReviews = reviews.sort(() => Math.random() - 0.5);
    shuffledReviews.forEach((review) => {
        const card = document.createElement('div');
        card.className = 'bg-white p-6 shadow-md rounded-md';
        card.innerHTML = `
            <h2 class="text-xl font-bold">${review.name}</h2>
            <p class="text-gray-600 mt-2">${review.comment}</p>
            <p class="rating mt-2">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
        `;
        reviewContainer.appendChild(card);
    });
});
