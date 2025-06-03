document.addEventListener('DOMContentLoaded', function() {
    const entrepreneursData = [
        {
            id: 1,
            name: "María Gómez",
            type: "handcraft",
            location: "palmar",
            image: "https://via.placeholder.com/400x400?text=María+Gómez",
            experience: 5,
            description: "Elaboración de canastos y artesanías en bejuco con técnicas tradicionales transmitidas por generaciones.",
            products: [
                "Canastos tejidos a mano",
                "Sombreros tradicionales",
                "Decoraciones para el hogar"
            ],
            joined: "2021-03-15"
        },
        {
            id: 2,
            name: "Carlos Rodríguez",
            type: "agro",
            location: "esperanza",
            image: "https://via.placeholder.com/400x400?text=Carlos+Rodríguez",
            experience: 8,
            description: "Producción de café orgánico cultivado en las montañas de Sucre con métodos sostenibles.",
            products: [
                "Café orgánico premium",
                "Café molido tradicional",
                "Café en grano"
            ],
            joined: "2020-05-10"
        },
    ];

    const entrepreneursContainer = document.getElementById('entrepreneurs-container');
    const typeFilter = document.getElementById('entrepreneur-type');
    const locationFilter = document.getElementById('entrepreneur-location');
    const searchInput = document.getElementById('entrepreneur-search');
    const sortSelect = document.getElementById('entrepreneur-sort');
    const applyFiltersBtn = document.getElementById('apply-entrepreneur-filters');
    const resetFiltersBtn = document.getElementById('reset-entrepreneur-filters');
    const entrepreneursCount = document.getElementById('entrepreneurs-count');

    function displayEntrepreneurs(entrepreneurs) {
        entrepreneursContainer.innerHTML = '';
        
        if (entrepreneurs.length === 0) {
            entrepreneursContainer.innerHTML = `
                <div class="entrepreneur-no-results">
                    <i class="fas fa-search"></i>
                    <h4>No se encontraron emprendedores</h4>
                    <p>Intenta ajustar tus filtros de búsqueda</p>
                </div>
            `;
            entrepreneursCount.textContent = '0';
            return;
        }
        
        entrepreneurs.forEach(entrepreneur => {
            const productsList = entrepreneur.products.map(product => 
                `<li>${product}</li>`
            ).join('');
            
            const entrepreneurCard = document.createElement('article');
            entrepreneurCard.className = 'entrepreneur-card';
            entrepreneurCard.innerHTML = `
                <div class="entrepreneur-img-container">
                    <img src="${entrepreneur.image}" alt="${entrepreneur.name}" class="entrepreneur-img">
                </div>
                <div class="entrepreneur-info">
                    <div class="entrepreneur-header">
                        <h3 class="entrepreneur-name">${entrepreneur.name}</h3>
                        <span class="entrepreneur-type">${getTypeName(entrepreneur.type)}</span>
                    </div>
                    <div class="entrepreneur-meta">
                        <span class="entrepreneur-location"><i class="fas fa-map-marker-alt"></i> ${getLocationName(entrepreneur.location)}</span>
                        <span class="entrepreneur-experience"><i class="fas fa-star"></i> ${entrepreneur.experience} años de experiencia</span>
                    </div>
                    <p class="entrepreneur-desc">${entrepreneur.description}</p>
                    <div class="entrepreneur-products">
                        <h4>Productos destacados:</h4>
                        <ul class="product-list">${productsList}</ul>
                    </div>
                    <div class="entrepreneur-actions">
                        <a href="#" class="btn btn-small entrepreneur-detail-btn" data-id="${entrepreneur.id}">
                            <i class="fas fa-eye"></i> Ver perfil
                        </a>
                        <a href="#" class="btn btn-small btn-outline entrepreneur-contact-btn" data-id="${entrepreneur.id}">
                            <i class="fas fa-envelope"></i> Contactar
                        </a>
                    </div>
                </div>
            `;
            
            entrepreneursContainer.appendChild(entrepreneurCard);
        });
        
        entrepreneursCount.textContent = entrepreneurs.length;
    }

    function getTypeName(type) {
        const types = {
            'agro': 'Agropecuario',
            'food': 'Alimentos',
            'handcraft': 'Artesanías',
            'services': 'Servicios',
            'commerce': 'Comercio'
        };
        return types[type] || type;
    }

    function getLocationName(location) {
        const locations = {
            'urban': 'Zona urbana',
            'rural': 'Zona rural',
            'palmar': 'Vereda El Palmar',
            'esperanza': 'Vereda La Esperanza'
        };
        return locations[location] || location;
    }

    function filterEntrepreneurs() {
        const type = typeFilter.value;
        const location = locationFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        const sortOption = sortSelect.value;
        
        let filteredEntrepreneurs = [...entrepreneursData];
        
        if (type !== 'all') {
            filteredEntrepreneurs = filteredEntrepreneurs.filter(e => e.type === type);
        }
        
        if (location !== 'all') {
            filteredEntrepreneurs = filteredEntrepreneurs.filter(e => e.location === location);
        }
        
        if (searchTerm) {
            filteredEntrepreneurs = filteredEntrepreneurs.filter(e => 
                e.name.toLowerCase().includes(searchTerm) || 
                e.description.toLowerCase().includes(searchTerm) ||
                e.products.some(p => p.toLowerCase().includes(searchTerm))
            );
        }
        
        switch (sortOption) {
            case 'name-asc':
                filteredEntrepreneurs.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredEntrepreneurs.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'recent':
                filteredEntrepreneurs.sort((a, b) => new Date(b.joined) - new Date(a.joined));
                break;
            default:
                filteredEntrepreneurs.sort((a, b) => b.experience - a.experience);
        }
        
        displayEntrepreneurs(filteredEntrepreneurs);
    }

    function resetFilters() {
        typeFilter.value = 'all';
        locationFilter.value = 'all';
        searchInput.value = '';
        sortSelect.value = 'relevant';
        filterEntrepreneurs();
    }

    applyFiltersBtn.addEventListener('click', filterEntrepreneurs);
    resetFiltersBtn.addEventListener('click', resetFilters);
    searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && filterEntrepreneurs());
    sortSelect.addEventListener('change', filterEntrepreneurs);
    
    displayEntrepreneurs(entrepreneursData);
});