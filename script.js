document.addEventListener('DOMContentLoaded', () => {
    // 1. АНИМАЦИЯ ПОЯВЛЕНИЯ
    // Находим все элементы, которые хотим анимировать
    const elementsToAnimate = [
        document.querySelector('.avatar'),
        document.querySelector('.eyebrow'),
        document.querySelector('h1'),
        document.querySelector('.subtitle'),
        ...document.querySelectorAll('.link-button'),
        document.querySelector('.extra-links'),
        document.querySelector('.socials')
    ];

    // По очереди добавляем класс видимости с задержкой в 100мс
    elementsToAnimate.forEach((el, index) => {
        if (el) {
            // Сначала вешаем класс-невидимку
            el.classList.add('fade-in');
            
            // Через время проявляем
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100); 
        }
    });

    // 2. КОПИРОВАНИЕ ССЫЛКИ (Твой старый код)
    const shareBtn = document.getElementById('share-btn');
    const toast = document.getElementById('toast');

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            
            if (toast) {
                toast.style.display = 'block';
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 2000);
            }
        });
    }
});