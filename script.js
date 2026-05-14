const shareBtn = document.getElementById('share-btn');
const toast = document.getElementById('toast');

shareBtn.addEventListener('click', () => {
    // Копируем URL страницы
    navigator.clipboard.writeText(window.location.href).then(() => {
        // Показываем уведомление
        toast.style.display = 'block';
        
        // Прячем через 2 секунды
        setTimeout(() => {
            toast.style.display = 'none';
        }, 2000);
    });
});