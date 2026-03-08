document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid, которое диспатчит validation.js
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы из события
        const formData = event.detail;
        
        // Очищаем консоль для наглядности
        console.clear();
        
        // Стили для красивого вывода
        console.log('%c📝 Данные отправленной формы', 'font-size: 16px; font-weight: bold; color: #2c5530;');
        console.log('%c══════════════════════════════', 'color: #2c5530;');
        
        // Построчный вывод данных
        console.log('%c👤 ФИО:', 'font-weight: bold; color: #1a3a1e;', formData.fullname);
        console.log('%c📧 Email:', 'font-weight: bold; color: #1a3a1e;', formData.email);
        console.log('%c📌 Тема:', 'font-weight: bold; color: #1a3a1e;', formData.topic);
        console.log('%c💬 Сообщение:', 'font-weight: bold; color: #1a3a1e;', formData.message);
        
        // Вывод временной метки
        console.log('%c══════════════════════════════', 'color: #2c5530;');
        console.log('%c🕐 Время отправки:', 'font-weight: bold; color: #1a3a1e;', formData.timestamp);
        
        // Дополнительная информация в табличном виде
        console.log('%c📊 Сводка:', 'font-weight: bold; color: #2c5530;');
        console.table({
            'ФИО': formData.fullname,
            'Email': formData.email,
            'Тема': formData.topic,
            'Длина сообщения': formData.message.length + ' симв.'
        });
    });

    // Логируем загрузку страницы
    console.log('%c✅ Страница контактов загружена', 'color: #2c5530; font-size: 14px;');
    console.log('%c📋 Скрипт логирования активен', 'color: #666; font-size: 12px;');
});