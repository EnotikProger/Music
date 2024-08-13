document.addEventListener("DOMContentLoaded", () => {
    let newTrack = {};

    // настройка Выбора жанра
    const genre = document.getElementById('genre');
    if (genre) {
        const choicesGenre = new Choices(genre, {
            searchEnabled: false,
            allowHTML: true
        });
    }
    
    const genreAlbum = document.getElementById('genreAlbum');
    
    if (genreAlbum) {
        const choicesGenreAlbum = new Choices(genreAlbum, {
            searchEnabled: false,
            allowHTML: true
        });
    }

    // Шаги добавления песни
    const stepSections = document.querySelectorAll('.step__section'),
        steps = document.querySelectorAll('.steps__item'),
        btnSteps = document.querySelectorAll('.step__btn'),
        formTwo = document.getElementById('formTwo'),
        formTwoAlbum = document.getElementById('formTwoAlbum'),
        formThree = document.getElementById('formThree'),
        formThreeAlbum = document.getElementById('formThreeAlbum'),
        formFour = document.getElementById('formFour'),
        formFourAlbum = document.getElementById('formFourAlbum'),
        formFive = document.getElementById('formFive'),
        formFiveAlbum = document.getElementById('formFiveAlbum'),
        formPromo = document.getElementById('formPromo'),
        formPromoAlbum = document.getElementById('formPromoAlbum'),
        addedSingl = document.querySelector('.added-singl'),
        btnAdd = document.querySelectorAll('.download__btn'),
        btnAddTrack = document.querySelectorAll('.add-track__btn'),
        formAgreement = document.getElementById('formAgreement'),
        btnRezalt = document.getElementById('rezalt'),
        // btnAddAudio = document.getElementById('audio'),
        inputAudio = document.getElementById('audio');
        
    let added = 'single'; //Для смены контента сингла/альбома
    btnAdd.forEach(btn => {
        btn.addEventListener('click', () => {
            added = btn.dataset.name;            
        })
    });

    btnSteps.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.dataset.step;
             
            stepSections.forEach(item => {
                const box = document.querySelectorAll('.step__section--box')
                                
                if (item.dataset.step === currentStep) {
                    item.classList.remove('section-hidden');
                    if (steps[currentStep - 1]) {
                        steps[currentStep - 1].classList.add('active')
                        box.forEach(i => {                            
                            i.classList.remove('hidden')
                            if (i.classList.contains(`step__section--${added}`)) {
                                i.classList.remove('hidden');                                
                            } else {
                                i.classList.add('hidden');                                
                            }
                        })
                    }                    
                } else {
                    item.classList.add('section-hidden');
                }
            })
        })
    })

    btnAddTrack.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.new-track').classList.remove('hidden')
        })
    })
    // Отображение обложки при загрузке
    const inputImg = document.getElementById('img');
    let imgPath = ''

    inputImg.addEventListener('change', function(event) {       
        // Проверяем, выбран ли файл
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Создаем объект FileReader для чтения содержимого файла
            const reader = new FileReader();

            // Когда файл загружен, отображаем его
            reader.onload = function(e) {
                inputImg.style.display = 'none'
                // Создаем элемент img
                const img = document.createElement('img');
                img.src = e.target.result; // Устанавливаем путь к изображению (base64)
                imgPath = e.target.result
                img.alt = 'Загруженное изображение';
                
                // Очищаем контейнер и добавляем новое изображение
                document.querySelector('.form-step__inner').innerHTML = '';
                document.querySelector('.form-step__inner').appendChild(img);
            };        
            // Читаем файл как Data URL (base64)
            reader.readAsDataURL(file);               
        };
    });

    if (formTwo)
    formTwo.addEventListener('submit', (event) => {
        event.preventDefault();         

        newTrack.genre = document.getElementById('genre').value;  //Жанр
        newTrack.img =   inputImg.value;      //Обложка
        newTrack.singer =   document.getElementById('name').value;  //Имя исполнителя
        newTrack.title =   document.getElementById('title').value;    //Название трека
        newTrack.date =   document.getElementById('date').value;    //Дата релиза
        newTrack.dateTik =   document.getElementById('data-tik').value; //Дата релиза в Тик-ток
        console.log('Новый трек шаг 2', newTrack);
    });

    if (formTwoAlbum)
    formTwoAlbum.addEventListener('submit', (event) => {
        event.preventDefault();  

    });
    
    inputAudio.addEventListener('change', function(event) {       
        // Проверяем, выбран ли файл
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
           
            // Создаем объект FileReader для чтения содержимого файла
            const reader = new FileReader();

            // Когда файл загружен, отображаем подсказку и блок с введенным на 2 шаге
            reader.onload = function(e) {
                document.querySelector('.upload-singl-text').classList.remove('hidden');                   
            };        
            // Читаем файл как Data URL (base64)
            reader.readAsDataURL(file);  
            //Передать введенное на 2 шаге
            document.querySelector('.added-singl__name').textContent = newTrack.name;
            document.querySelector('.added-singl__img').src = imgPath;
            document.querySelector('.added-singl__autor').textContent = newTrack.singer;
            addedSingl.style.display = 'flex';              
        };
    });

    // btnAddAudio.addEventListener('click', () => {
                        
    // });


    formThree.addEventListener('submit', (event) => {
        event.preventDefault();       

        newTrack.audio = inputAudio.value; //Аудио файл
        console.log('Новый трек шаг 3', newTrack);
    })

    formThreeAlbum.addEventListener('submit', (event) => {
        event.preventDefault();           
    })


    formFour.addEventListener('submit', (event) => {
        event.preventDefault();   

        newTrack.autorMusik =   document.getElementById('autor-musik').value; //Имя автора музыки
        newTrack.autorText =   document.getElementById('autor-text').value; //Имя автора текста
        newTrack.isrc =   document.getElementById('isrc').value; //ISRC
        newTrack.upc =   document.getElementById('upc').value; //UPC
        newTrack.text =   document.getElementById('text').value; //Текст песни
        console.log('Новый трек шаг 4', newTrack);
    });

    formFourAlbum.addEventListener('submit', (event) => {
        event.preventDefault();       
       
    });

    formFive.addEventListener('submit', (event) => {
        event.preventDefault();     
        newTrack.linkSingerOne =   document.getElementById('link-1').value; //Ссылка на карточку исполнителя в
        newTrack.linkSingerTwo =   document.getElementById('link-2').value; //Ссылка на карточку исполнителя в
        newTrack.linkSingerThree =   document.getElementById('link-3').value; //Ссылка на карточку исполнителя в
        console.log('Новый трек шаг 5', newTrack);  
    });

    formFiveAlbum.addEventListener('submit', (event) => {
        event.preventDefault();       
    });

    formPromo.addEventListener('submit', (event) => {
        event.preventDefault();       
    });

    formPromoAlbum.addEventListener('submit', (event) => {
        event.preventDefault();       
    });

    formAgreement.addEventListener('submit', (e) => {
        e.preventDefault();        
        
        newTrack.agreement = {
            user: {
                fio: document.getElementById('fio').value,
                date: document.getElementById('date').value,
                email: document.getElementById('mail').value,
                snils: document.getElementById('snils').value,
                inn: document.getElementById('inn').value,
                pasport: {
                    number: document.getElementById('number').value,
                    series: document.getElementById('series').value,
                    departament: document.getElementById('departament').value,
                    date: document.getElementById('datePasport').value,
                    cod: document.getElementById('cod').value,
                    address: document.getElementById('address').value,                    
                }
            },
            bank: {
                fio: document.querySelector('#recipient').value,
                name: document.querySelector('#nameBank').value,
                checking: document.querySelector('#checking').value,
                checkingCorr: document.querySelector('#checkingCorr').value,
                bik: document.querySelector('#bik').value
            }
        }
        console.log('Новый трек реквизиты договора', newTrack);
        btnRezalt.removeAttribute('disabled');
    });

    const BASE_URL = 'http//127.00/8080/'
    btnRezalt.addEventListener('click', async() => {

        console.log('Окончательный объект добавленной песни', newTrack);
        // Дальше отправка нового трека на серсер
        try {
            const res = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",              
            },
            body: JSON.stringify(newTrack),
          })

          console.log('Ответ сервера', res.data);
          btnRezalt.href = "{% url 'personal' %}"
        //   return await response.json();
       } catch(error) {           
            document.querySelector('.step-payment').textContent = 'Что-то пошло не так'
            document.querySelector('.step-payment').classList.remove('section-hidden')
            throw new Error(error)
       };        
    });
})