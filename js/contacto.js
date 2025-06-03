document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentNode;
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                faqQuestions.forEach(q => {
                    if (q !== this && q.parentNode.classList.contains('active')) {
                        q.parentNode.classList.remove('active');
                    }
                });
            }
        });
    });
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#dc3545';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                showContactSuccess();
            } else {
                showContactError('Por favor completa todos los campos requeridos');
            }
        });
        
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    function showContactSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'contact-success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="success-text">
                    <h3>¡Mensaje enviado con éxito!</h3>
                    <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo en breve.</p>
                    <a href="index.html" class="btn btn-primary">Volver al inicio</a>
                </div>
            </div>
        `;
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
        
        contactForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    function showContactError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'contact-error-message';
        errorElement.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        const existingError = contactForm.querySelector('.contact-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        contactForm.insertBefore(errorElement, contactForm.firstChild);
        
        const firstError = contactForm.querySelector('[required]:invalid');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/3146069560';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.target = '_blank';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappBtn);
});