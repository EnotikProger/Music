document.addEventListener("DOMContentLoaded", () => {
    // Скрытие бокового меню
    const buttonClose = document.getElementById('close'),
        aside = document.getElementById('aside');

    buttonClose.addEventListener('click', () => {
        aside.classList.toggle('hidden');
        buttonClose.classList.toggle('show')
    })

    // Скрытие подменю
    const buttonBoxClose = document.getElementById('closeBox'),
        menuAll = document.querySelectorAll('.aside-personal__menu');

        buttonBoxClose.addEventListener('click', (event) => {
            
            buttonBoxClose.classList.toggle('visible')

            menuAll.forEach(elem => {    
                if (elem.dataset.menu === event.target.dataset.menu)
                elem.classList.toggle('visible');
            })
    })

    //Смена активного пункта в боковой панели и секции основного контента
    const asideMenuAll = document.querySelectorAll('.aside-menu__item'),
        sectionsContent = document.querySelectorAll('.section__content');

    asideMenuAll.forEach(item => {    
        item.addEventListener('click', (event) => {
            const target = event.target;
            const asideMenuItem = target.closest('.aside-menu__item');
            
            if (asideMenuItem) {                   
                asideMenuAll.forEach(i => i.classList.remove('active'))
                asideMenuItem.classList.add('active');            
            }
        });
    })

    // Смена лайка
    const btnLikeAll = document.querySelectorAll('.track__like')

    btnLikeAll.forEach(like => {
        like.addEventListener('click', (event) => {            
            like.classList.toggle('like')
        });
    });

    // Модальное окно
    // Открытие модального окна
    const btnOpenModal = document.getElementById('sign'),
        modal = document.getElementById('modal'),
        btnCloseModal = document.querySelectorAll('.modal__close'),
        btnAgreementAll = document.querySelectorAll('.agreement'),
        modalAgreement = document.getElementById('modalAgreement');

    btnOpenModal.addEventListener('click', () => {
        modal.classList.add('visible');
        document.body.classList.add('scroll-stop');
    });

    // Закрытие модального окна по кнопке
    btnCloseModal.forEach(btn => {
        btn.addEventListener('click', () => {                  
            closeModal(btn.dataset.modal)
        });
    })    

    // Закрытие модального окна по эскейп
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {            
            if (modal.classList.contains('visible')) {
                closeModal('login')
            }
            
            if (modalAgreement.classList.contains('visible')) {
                closeModal('agreement')
            }
        }
    });

     // Закрытие модального окна входа по клику вне его
    modal.addEventListener('click', function (event) {       
        if (!document.querySelector('.modal__body').contains(event.target)) {                   
            closeModal('login');          
        }
    });

     // Закрытие модального окна реквизитов по клику вне его
    modalAgreement.addEventListener('click', function (event) {    
        if (event.target === event.currentTarget) {
            closeModal('agreement');
        }     
    });

    // Закрытие модального окна
    function closeModal(modalName = '') {        
        if (modalName === 'login') {            
            modal.classList.remove('visible');
        } 
        if (modalName ==='agreement') {                           
            modalAgreement.classList.remove('visible');
        }
        document.body.classList.remove('scroll-stop');
    }

     // Открытие модалки с реквизитами договора
     btnAgreementAll.forEach(btn => {
        btn.addEventListener('click', () => {
            modalAgreement.classList.add('visible');
            document.body.classList.add('scroll-stop');
        })
    })
     

    // Переключение форм входа
    // Смена кнопки
    const loginBtn = document.getElementById('loginBtn'),
        formAll = document.querySelector('.form'),
        registerBtn = document.getElementById('registerBtn'),
        checkbox = document.getElementById('reg-log');

    formAll.addEventListener('submit', (event) => {
        event.preventDefault()
    });

    loginBtn.addEventListener('click', function () {
        checkbox.checked = false;
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    });

    registerBtn.addEventListener('click', function () {
        checkbox.checked = true;
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');        
    });
    
    // Слайдер секции топ исполнителей
    const swiperTop = new Swiper('.top__list', {        
        direction: 'horizontal',
        loop: true,  
        slidesPerGroup: 1,
        slidesPerView: 2,
        spaceBetween: 20,
        autoHeight: false,    
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },        
      });

    // Кнопка загрузки
    const btnDownload = document.getElementById('download'),
    list = document.querySelector('.header__box');

    btnDownload.addEventListener('click', () => {
        list.classList.add('show');
    })

    // Закрытие списка по эскейп
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && list.classList.contains('show')) {            
            list.classList.remove('show');
        }
    });

    // Кнопка Релиз на дистрибуцию
    const btnDownloadDistrib = document.getElementById('downloadDistrib');

    btnDownloadDistrib.addEventListener('click', () => {
        sectionsContent.forEach(content => {           
            content.classList.remove('active-content');
            if (content.dataset.content === 'distribSection') {
                content.classList.add('active-content');
            }
        })
      
        list.classList.remove('show');
    })

    // const btnDownloadMinus = document.getElementById('downloadMinus')

    // const btnAddLink= document.getElementById('addLink')

    // Формы входа/регистрации
    const formLogin = document.getElementById('login'),
        formSignup = document.getElementById('signup');

    const newUser = {};
    
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        newUser.mail = document.getElementById('newEmail').value;

        // Тут запрос на сервер про создание нового пользователя
        console.log('Новый пользователь', newUser);
    });
    
    formSignup.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('email').value;

        // Тут запрос на сервер проверки пользователя и выдача ему доступа
        console.log('Пользователь', user);
    });   
})