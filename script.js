// Функция расчёта стоимости
function calculatePrice() {
    const area = parseFloat(document.getElementById('area').value);
    const materialPrice = parseFloat(document.getElementById('material').value);
    const includeScaffolding = document.getElementById('scaffolding').checked;
    const includeFullCycle = document.getElementById('fullcycle').checked;

    // Проверка корректности ввода
    if (isNaN(area) || area <= 0) {
        alert('Пожалуйста, введите корректную площадь');
        return;
    }

    // Расчёты
    const materialCost = area * materialPrice;
    const scaffoldingCost = includeScaffolding ? 50000 : 0;
    const fullcycleCost = includeFullCycle ? 1500000 : 0;
    const totalCost = materialCost + scaffoldingCost + fullcycleCost;

    // Обновление результатов на странице
    document.getElementById('materialCost').textContent = formatPrice(materialCost);
    document.getElementById('scaffoldingCost').textContent = formatPrice(scaffoldingCost);
    document.getElementById('fullcycleCost').textContent = formatPrice(fullcycleCost);
    document.getElementById('totalCost').textContent = formatPrice(totalCost);
}

// Функция форматирования цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'KZT',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Функция обработки отправки формы контактов
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    // Здесь можно добавить отправку на сервер
    // Пока показываем просто подтверждение
    alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.`);
    
    // Очистка формы
    form.reset();
}

// Обновление калькулятора при изменении значений
document.addEventListener('DOMContentLoaded', function() {
    const areaInput = document.getElementById('area');
    const materialSelect = document.getElementById('material');
    const scaffoldingCheckbox = document.getElementById('scaffolding');
    const fullcycleCheckbox = document.getElementById('fullcycle');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // Первый расчёт при загрузке страницы
    calculatePrice();

    // Обновление при изменении
    areaInput.addEventListener('input', calculatePrice);
    materialSelect.addEventListener('change', calculatePrice);
    scaffoldingCheckbox.addEventListener('change', calculatePrice);
    fullcycleCheckbox.addEventListener('change', calculatePrice);

    // Мобильное меню
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Плавная прокрутка при клике на навигацию
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        // Не применяем для логотипа если он ссылка
        if (this && this.classList.contains('logo')) return;
        
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Анимация при скролле для элементов
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.benefit-card, .service-item, .team-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
