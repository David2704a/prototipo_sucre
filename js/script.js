document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 4000);
    }

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.product-image img').style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.product-image img').style.transform = 'scale(1)';
        });
    });

    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.news-image img').style.transform = 'scale(1.05)';
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.news-image img').style.transform = 'scale(1)';
        });
    });

    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').replace('.html', '');
        if (linkPage === currentPage || (currentPage === 'index' && linkPage === '')) {
            link.parentElement.classList.add('active');
        }
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.createElement('div');
    overlay.className = 'image-overlay';
    overlay.innerHTML = `
        <span class="close-overlay"></span>
        <img class="expanded-image" src="" alt="Imagen expandida">
    `;
    document.body.appendChild(overlay);

    const newsImages = document.querySelectorAll('.news-image img');
    const expandedImg = document.querySelector('.expanded-image');
    const closeBtn = document.querySelector('.close-overlay');

    newsImages.forEach(img => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            expandedImg.src = this.src;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', function () {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const readMoreBtns = document.querySelectorAll('.read-more-btn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const container = this.closest('.news-content').querySelector('.news-excerpt-container');
            const fullContent = container.querySelector('.news-full-content');

            container.classList.toggle('expanded');
            this.classList.toggle('expanded');

            const isExpanded = container.classList.contains('expanded');
            this.innerHTML = isExpanded ?
                'Leer menos <i class="fas fa-chevron-up"></i>' :
                'Leer más <i class="fas fa-chevron-down"></i>';

            if (isExpanded) {
                fullContent.removeAttribute('hidden');
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                setTimeout(() => {
                    fullContent.setAttribute('hidden', '');
                }, 300); 
            }
        });
    });
});