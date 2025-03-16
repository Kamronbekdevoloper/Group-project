document.addEventListener('DOMContentLoaded', function() {
    const heroImg = document.querySelector('.hero-img');
    const dots = document.querySelectorAll('.dot');
    const textContent = document.querySelector('.text-content');
    const titleElement = textContent.querySelector('h1');
    const descriptionElement = textContent.querySelector('.p-on-container');

    
    function updateContent(dot) {
        heroImg.src = dot.dataset.src;
    
        titleElement.innerHTML = dot.dataset.title;
        descriptionElement.textContent = dot.dataset.description;

        textContent.style.opacity = 0;
        setTimeout(() => {
            textContent.style.opacity = 1;
        }, 300);
    }
    updateContent(dots[0]);

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));

            dot.classList.add('active');

            updateContent(dot);
        });
    });
});