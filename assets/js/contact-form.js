document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    const errorMessage = document.getElementById('errorMessage');

    // Expresiones regulares mejoradas
    const validaciones = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        telefono: /^\d{10}$/,
        texto: /^[a-zA-Zá-úÁ-Ú\s]{3,}$/
    };

    function mostrarError(mensaje) {
        errorMessage.innerHTML = `<p>${mensaje}</p>`;
        errorModal.show();
    }

    function validarCampo(campo, regex) {
        if (!regex.test(campo.value.trim())) {
            campo.classList.add('is-invalid');
            return false;
        }
        campo.classList.remove('is-invalid');
        return true;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let errores = [];
        
        // Validar todos los campos
        if (!validarCampo(form.name, validaciones.texto)) 
            errores.push('Nombre completo no válido');
        
        if (!validarCampo(form.email, validaciones.email))
            errores.push('Correo electrónico no válido');
        
        if (!validarCampo(form.phone, validaciones.telefono))
            errores.push('Teléfono debe tener 10 dígitos');
        
        if (!validarCampo(form.subject, validaciones.texto))
            errores.push('Asunto no válido');
        
        if (form.message.value.trim().length < 10)
            errores.push('Mensaje demasiado corto');

        if (errores.length > 0) {
            mostrarError(`Errores encontrados:<br>• ${errores.join('<br>• ')}`);
            return;
        }

        // Envío del formulario
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Enviando...';
        submitBtn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {'Accept': 'application/json'}
        })
        .then(response => {
            if (response.ok) {
                form.reset();
                confirmationModal.show();
            } else {
                throw new Error('Error en el servidor');
            }
        })
        .catch(error => {
            mostrarError('Error al enviar el formulario. Intente nuevamente.');
        })
        .finally(() => {
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Enviar Mensaje';
            submitBtn.disabled = false;
        });
    });

    // Validación en tiempo real
    form.querySelectorAll('input, textarea').forEach(campo => {
        campo.addEventListener('input', function() {
            switch(this.name) {
                case 'name':
                case 'subject':
                    validarCampo(this, validaciones.texto);
                    break;
                case 'email':
                    validarCampo(this, validaciones.email);
                    break;
                case 'phone':
                    validarCampo(this, validaciones.telefono);
                    break;
                case 'message':
                    if (this.value.trim().length < 10) 
                        this.classList.add('is-invalid');
                    else 
                        this.classList.remove('is-invalid');
                    break;
            }
        });
    });
});
