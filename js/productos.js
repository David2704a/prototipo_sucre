document.addEventListener('DOMContentLoaded', function () {
    // Datos de ejemplo
    const productsData = [
        {
            id: 1,
            name: "Café Orgánico Premium",
            category: "drinks",
            price: 18000,
            image: "cafe.jpg",
            seller: "Doña Rosa",
            description: "Café cultivado a 1,800 metros sobre el nivel del mar.",
            featured: true,
            badge: "Nuevo"
        },
        {
            id: 2,
            name: "Miel de Abeja Natural",
            category: "foods",
            price: 25000,
            image: "miel.jpg",
            seller: "Apicultores Unidos",
            description: "Miel pura recolectada en zonas rurales sin aditivos.",
            featured: false,
            badge: "Oferta"
        },

    ];

    // Elementos del DOM
    const productsContainer = document.getElementById('products-container');
    const categoryFilter = document.getElementById('product-category');
    const searchInput = document.getElementById('product-search');
    const sortSelect = document.getElementById('product-sort');
    const applyFiltersBtn = document.getElementById('apply-product-filters');
    const resetFiltersBtn = document.getElementById('reset-product-filters');
    const productsCount = document.getElementById('products-count');

    // Mostrar productos
    function displayProducts(products) {
        productsContainer.innerHTML = '';

        if (products.length === 0) {
            productsContainer.innerHTML = `
                <div class="product-no-results">
                    <i class="fas fa-search"></i>
                    <h4>No se encontraron productos</h4>
                    <p>Intenta ajustar tus filtros de búsqueda</p>
                </div>
            `;
            productsCount.textContent = '0';
            return;
        }

        products.forEach(product => {
            const badge = product.badge ?
                `<div class="product-badge">${product.badge}</div>` : '';

            const productCard = document.createElement('article');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                ${badge}
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.name}" class="product-img">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-meta">
                        <span class="product-price">$${product.price.toLocaleString()}</span>
                        <span class="product-seller"><i class="fas fa-user"></i> ${product.seller}</span>
                    </div>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-actions">
                        <a href="#" class="btn btn-small product-detail-btn">
                            <i class="fas fa-eye"></i> Ver más
                        </a>
                        <a href="#" class="btn btn-small btn-outline product-buy-btn">
                            <i class="fas fa-shopping-cart"></i> Comprar
                        </a>
                    </div>
                </div>
            `;

            productsContainer.appendChild(productCard);
        });

        productsCount.textContent = products.length;
    }

    // Filtrar y ordenar productos
    function filterProducts() {
        const category = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        const sortOption = sortSelect.value;

        let filteredProducts = [...productsData];

        // Aplicar filtros
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === category);
        }

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        // Ordenar
        switch (sortOption) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                // Por defecto (más relevantes)
                filteredProducts.sort((a, b) => b.featured - a.featured);
        }

        displayProducts(filteredProducts);
    }

    // Resetear filtros
    function resetFilters() {
        categoryFilter.value = 'all';
        searchInput.value = '';
        sortSelect.value = 'relevant';
        filterProducts();
    }

    // Event listeners
    applyFiltersBtn.addEventListener('click', filterProducts);
    resetFiltersBtn.addEventListener('click', resetFilters);
    searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && filterProducts());
    sortSelect.addEventListener('change', filterProducts);

    // Mostrar todos los productos al cargar
    displayProducts(productsData);
});