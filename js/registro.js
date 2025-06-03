document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const fileInput = document.getElementById('register-photos');
    const fileFeedback = document.getElementById('file-upload-feedback');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    
    fileInput.addEventListener('change', function(e) {
        const files = e.target.files;
        fileFeedback.textContent = `${files.length} archivo(s) seleccionado(s)`;
        imagePreviewContainer.innerHTML = '';
        
        if (files.length > 5) {
            fileFeedback.innerHTML = '<span style="color: #dc3545;">Solo puedes subir un máximo de 5 imágenes</span>';
            fileInput.value = '';
            return;
        }
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (!file.type.match('image.*')) {
                fileFeedback.innerHTML = '<span style="color: #dc3545;">Solo se permiten archivos de imagen (JPG, PNG)</span>';
                fileInput.value = '';
                return;
            }
            
            if (file.size > 2 * 1024 * 1024) {
                fileFeedback.innerHTML = '<span style="color: #dc3545;">El tamaño máximo por archivo es 2MB</span>';
                fileInput.value = '';
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const preview = document.createElement('div');
                preview.className = 'image-preview';
                
                preview.innerHTML = `
                    <img src="${e.target.result}" alt="Previsualización">
                    <div class="image-preview-remove" data-index="${i}">
                        <i class="fas fa-times"></i>
                    </div>
                `;
                
                imagePreviewContainer.appendChild(preview);
                
                preview.querySelector('.image-preview-remove').addEventListener('click', function() {
                    removeImageFromFileList(this.getAttribute('data-index'));
                    preview.remove();
                    fileFeedback.textContent = `${fileInput.files.length} archivo(s) seleccionado(s)`;
                });
            }
            
            reader.readAsDataURL(file);
        }
    });
    
    function removeImageFromFileList(index) {
        const dt = new DataTransfer();
        const files = fileInput.files;
        
        for (let i = 0; i < files.length; i++) {
            if (index != i) {
                dt.items.add(files[i]);
            }
        }
        
        fileInput.files = dt.files;
    }
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = registerForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        const termsCheckbox = document.getElementById('register-terms');
        if (!termsCheckbox.checked) {
            termsCheckbox.nextElementSibling.style.color = '#dc3545';
            isValid = false;
        } else {
            termsCheckbox.nextElementSibling.style.color = '';
        }
        
        if (isValid) {
            showFormSuccess();
        } else {
            showFormError('Por favor completa todos los campos requeridos');
        }
    });
    
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="success-text">
                    <h3>¡Registro exitoso!</h3>
                    <p>Hemos recibido tu solicitud. Nos pondremos en contacto contigo en un plazo máximo de 3 días hábiles.</p>
                    <a href="index.html" class="btn btn-primary">Volver al inicio</a>
                </div>
            </div>
        `;
        
        registerForm.innerHTML = '';
        registerForm.appendChild(successMessage);
        
        registerForm.scrollIntoView({ behavior: 'smooth' });
    }
    
    function showFormError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error-message';
        errorElement.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        const existingError = registerForm.querySelector('.form-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        registerForm.insertBefore(errorElement, registerForm.firstChild);
        
        errorElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    const formInputs = registerForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    });
    
    document.getElementById('register-terms').addEventListener('change', function() {
        this.nextElementSibling.style.color = '';
    });
});