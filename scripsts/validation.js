document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    // Удаляем атрибут onsubmit, если он есть
    form.removeAttribute('onsubmit');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

        let isValid = true;

        // 1. Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById('fullname');
        if (!fullname) {
            // Если нет поля с id="fullname", создадим его динамически или используем существующее поле имени
            const nameField = document.querySelector('input[placeholder*="Иван"]');
            if (nameField) {
                nameField.id = 'fullname';
            }
        }
        
        const nameInput = document.getElementById('fullname') || document.querySelector('input[placeholder*="Иван"]');
        if (nameInput) {
            if (!nameInput.id) nameInput.id = 'fullname';
            const nameValue = nameInput.value.trim();
            
            if (nameValue === '') {
                showError(nameInput, 'Введите фамилию и имя');
                isValid = false;
            } else {
                const words = nameValue.split(' ').filter(word => word.length > 0);
                if (words.length < 2) {
                    showError(nameInput, 'Введите фамилию и имя');
                    isValid = false;
                }
            }
        }

        // 2. Проверка Email
        const email = document.getElementById('email') || document.querySelector('input[type="email"]');
        if (email) {
            if (!email.id) email.id = 'email';
            const emailValue = email.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailValue === '') {
                showError(email, 'Введите email');
                isValid = false;
            } else if (!emailPattern.test(emailValue)) {
                showError(email, 'Введите корректный email (пример: name@domain.ru)');
                isValid = false;
            }
        }

        // 3. Проверка темы обращения (select)
        const select = document.querySelector('select');
        if (select) {
            if (!select.id) select.id = 'topic';
            if (!select.value || select.value === '') {
                showError(select, 'Выберите тему обращения');
                isValid = false;
            }
        }

        // 4. Проверка сообщения
        const message = document.querySelector('textarea');
        if (message) {
            if (!message.id) message.id = 'message';
            const messageValue = message.value.trim();
            
            if (messageValue === '') {
                showError(message, 'Введите сообщение');
                isValid = false;
            } else if (messageValue.length > 500) {
                showError(message, 'Сообщение не должно превышать 500 символов');
                isValid = false;
            }
        }

        // 5. Проверка согласия
        const agreement = document.querySelector('input[type="checkbox"]');
        if (agreement && !agreement.checked) {
            const agreementDiv = agreement.closest('.field');
            const help = document.createElement('p');
            help.classList.add('help', 'is-danger');
            help.textContent = 'Необходимо согласие на обработку персональных данных';
            agreementDiv.appendChild(help);
            isValid = false;
        }

        // Если всё корректно - отправляем событие
        if (isValid) {
            const formData = {
                fullname: (document.getElementById('fullname') || document.querySelector('input[placeholder*="Иван"]')).value.trim(),
                email: (document.getElementById('email') || document.querySelector('input[type="email"]')).value.trim(),
                topic: document.querySelector('select').options[document.querySelector('select').selectedIndex].text,
                message: document.querySelector('textarea').value.trim() || '(не заполнено)',
                timestamp: new Date().toLocaleString()
            };

            const customEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(customEvent);

            // Показываем сообщение об успехе
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('is-hidden');
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                setTimeout(() => {
                    successMessage.classList.add('is-hidden');
                }, 5000);
            }

            // Очищаем форму
            form.reset();
        }
    });

    // Функция показа ошибки
    function showError(element, message) {
        element.classList.add('is-danger');
        
        // Для select добавляем класс родительскому div
        if (element.tagName === 'SELECT') {
            const control = element.closest('.control');
            if (control) {
                control.classList.add('is-danger');
            }
        }
        
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        
        // Находим правильное место для вставки сообщения об ошибке
        const field = element.closest('.field');
        if (field) {
            field.appendChild(help);
        } else {
            element.parentNode.parentNode.appendChild(help);
        }
    }

    // Сброс ошибки при вводе
    document.querySelectorAll('.input, .textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            
            if (this.tagName === 'SELECT') {
                const control = this.closest('.control');
                if (control) {
                    control.classList.remove('is-danger');
                }
            }
            
            const field = this.closest('.field');
            if (field) {
                const errors = field.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });

        // Для select также обрабатываем change
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                this.classList.remove('is-danger');
                const control = this.closest('.control');
                if (control) {
                    control.classList.remove('is-danger');
                }
                const field = this.closest('.field');
                if (field) {
                    const errors = field.querySelectorAll('.help.is-danger');
                    errors.forEach(el => el.remove());
                }
            });
        }
    });

    // Сброс ошибки для checkbox
    const checkbox = document.querySelector('input[type="checkbox"]');
    if (checkbox) {
        checkbox.addEventListener('change', function() {
            const field = this.closest('.field');
            if (field) {
                const errors = field.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });
    }
});