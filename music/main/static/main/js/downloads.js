document.addEventListener("DOMContentLoaded", () => {
    let newTrack = {};
    let newAlbum = {};

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
        formAgreement = document.getElementById('formAgreement'),
        btnRezalt = document.getElementById('rezalt'),
        btnRezaltAlbum = document.getElementById('rezalt-album'),
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

    // Отображение обложки при загрузке
    const inputImg = document.getElementById('img'),
        inputImgAlbum = document.getElementById('imgAlbum');
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
                imgPath = e.target.result;              
                img.alt = 'Загруженное изображение';
                             
                // Очищаем контейнер и добавляем новое изображение
                document.querySelector('.form-step__inner').innerHTML = '';
                document.querySelector('.form-step__inner').appendChild(img);
            };        
            // Читаем файл как Data URL (base64)
            reader.readAsDataURL(file);               
        };
    });

    //========= Для одного трека ===========
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

    inputAudio.addEventListener('change', function(event) {       
        // Проверяем, выбран ли файл
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
           
            // Создаем объект FileReader для чтения содержимого файла
            const reader = new FileReader();

            // Когда файл загружен, отображаем подсказку и блок с введенным на 2 шаге
            reader.onload = function(e) {
                document.querySelector('.inner').style.display = 'none'
                document.querySelector('.upload-singl-text').classList.remove('hidden');    
                document.querySelector('.upload-singl-name').textContent = `Название трека: ${newTrack.title}`              
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

    formThree.addEventListener('submit', (event) => {
        event.preventDefault();       

        newTrack.audio = inputAudio.value; //Аудио файл
        console.log('Новый трек шаг 3', newTrack);
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

    formFive.addEventListener('submit', (event) => {
        event.preventDefault();     
        newTrack.linkSingerOne =   document.getElementById('link-1').value; //Ссылка на карточку исполнителя в
        newTrack.linkSingerTwo =   document.getElementById('link-2').value; //Ссылка на карточку исполнителя в
        newTrack.linkSingerThree =   document.getElementById('link-3').value; //Ссылка на карточку исполнителя в
        console.log('Новый трек шаг 5', newTrack);  

        // Добавляем отображение названия и обложки с шага 2
        document.querySelector('.payment__name').textContent = newTrack.name;
        document.querySelector('.payment__img').src = imgPath;
        document.querySelector('.payment__autor').textContent = newTrack.singer;        
    });

    formPromo.addEventListener('submit', (event) => {
        event.preventDefault();     
        
        newTrack.promCode = document.querySelector('.promo__input').value;
        console.log('Промокод', newTrack.promCode);
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
                // throw new Error(error)
            
        };        
        document.getElementById('track-message').textContent = 'Что-то пошло не так';        
    });

    //========= Для альбома ===========
    let imgAlbumPath = ''
    inputImgAlbum.addEventListener('change', function(event) { 
        // Проверяем, выбран ли файл
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            // Создаем объект FileReader для чтения содержимого файла
            const reader = new FileReader();

            // Когда файл загружен, отображаем его
            reader.onload = function(e) {
                inputImgAlbum.style.display = 'none'
                // Создаем элемент img
                const imgAlbum = document.createElement('img');
                imgAlbum.src = e.target.result; // Устанавливаем путь к изображению (base64)
                imgAlbumPath = e.target.result
                imgAlbum.alt = 'Загруженное изображение';
                
                // Очищаем контейнер и добавляем новое изображение
                document.querySelector('.img-album').innerHTML = '';
                document.querySelector('.img-album').appendChild(imgAlbum);                
            };        
            // Читаем файл как Data URL (base64)
            reader.readAsDataURL(file);               
        };
    });

    if (formTwoAlbum)
    formTwoAlbum.addEventListener('submit', (event) => {
        event.preventDefault();  

        newAlbum.genre = document.getElementById('genreAlbum').value;  //Жанр
        newAlbum.img =   inputImgAlbum.value;      //Обложка
        newAlbum.singer =   document.getElementById('nameAutor').value;  //Имя автора
        newAlbum.title =   document.getElementById('titleAlbum').value;    //Название альбома
        newAlbum.date =   document.getElementById('dateAlbum').value;    //Дата релиза альбома
        newAlbum.dateTik =   document.getElementById('album-tik').value; //Дата релиза в Тик-ток
        console.log('Новый альбом шаг 2', newAlbum);
    });

    newAlbum.tracks = [{ 
        id: 0, 
        track: '', 
        img: '', 
        name: '', 
        autorSinger: '', 
        autorMusik: '', 
        autorText: '' 
    }];

    document.querySelector('.tracks').addEventListener('click', (event) => {

        // Проверяем, если был клик по кнопке добавления нового трека
        if (event.target.classList.contains('add-track__btn')) {
           
            // Считаем количество треков и добавляем новый
            let count = document.querySelectorAll('.form-step__track').length;
            const newTrackElement = addFieldTrackinAlbum(count);
            document.querySelector('.tracks').appendChild(newTrackElement);            
             // Создаем объект track, что бы потом заполнить его данными из текущих полей ввода
            let track = { 
                id: count, 
                track: '', 
                img: '', 
                name: '', 
                autorSinger: '', 
                autorMusik: '', 
                autorText: '' 
            };

            newAlbum.tracks.push(track);
           
            event.target.style.display = 'none';            
        };

        // Обращаемся к вводу аудио
        if (event.target.classList.contains('file-audio-track')) {
            
            const trackId = event.target.id.replace('audio', '');
            console.log(trackId);
            const track = newAlbum.tracks[trackId];
    
            event.target.addEventListener('change', function(e) {
                console.log('change audio');
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
    
                    reader.onload = function(fileEvent) {
                        track.track = fileEvent.target.result; // Записываем аудиофайл в track
                        const trackContainer = event.target.closest('.form-step__track-top');
                        if (trackContainer) {
                            const innerElement = trackContainer.querySelector('.form-step__inner');
                            if (innerElement) {
                                innerElement.style.display = 'none';
                            }
                            const uploadText = trackContainer.querySelector('.upload-singl-text');
                            if (uploadText) {
                                uploadText.textContent = 'Файл успешно загружен';
                            }
                        }
                    };
    
                    reader.readAsDataURL(file);
                }
            }, { once: true });
        }
    
        // Обращаемся к вводу обложки
        if (event.target.classList.contains('file-img-track')) {
            const trackId = event.target.id.replace('imgtrack', '');
            const track = newAlbum.tracks[trackId];
            event.target.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
    
                    reader.onload = function(fileEvent) {
                        imgPath = fileEvent.target.result;
                        track.img = imgPath // Записываем обложку в track
    
                        // Находим родительский контейнер, чтобы заменить изображение именно в нем
                        const trackContainer = event.target.closest('.form-step__track-top');
                        if (trackContainer) {
                            const imgContainer = trackContainer.querySelector('.img-track');
                            if (imgContainer) {
                                imgContainer.innerHTML = '';
                                const img = document.createElement('img');
                                img.src = imgPath;
                                img.alt = 'Загруженное изображение';
                                imgContainer.appendChild(img);
                            }
                        }
                    };
    
                    reader.readAsDataURL(file);
                }
            }, { once: true });
        }
    });

    // Создание блока одного трека
    function addFieldTrackinAlbum(count) {
        const box = document.createElement('div');
        box.classList.add('form-step__track');

        box.innerHTML = `<div class="form-step__track-top"> 
                        <div class="form-step__content">  
                            <div class="form-step__inner inner">                  
                                <input class="form-step__file file-audio-track" id="audio${count}" type="file" accept="audio/wav">
                                <label class="form-step__label" for="audio${count}">
                                    <span>+</span>
                                </label>
                             </div>
                            <span class="upload-singl-text">Загрузите WAV файл</span>                        
                        </div>   
                        <div class="form-step__content">   
                            <div class="form-step__inner img-track">                 
                                <input class="form-step__file file-img-track" type="file" accept="image/*" id="imgtrack${count}">
                                <label class="form-step__label" for="imgtrack${count}">
                                    <span>+</span>
                                </label>
                             </div>
                            <span class="upload-singl-text">Загрузите Обложку трека</span>                        
                        </div>    
                    </div>            
                    <div class="form-step__wrapper"> 
                        <label class="form-step__label" for="track-name${count}">
                            <p>Название трека</p>
                            <input class="form-step__input track-name" type="text" id="track-name${count}" placeholder="Название">
                            <div class="tultip">
                                <button class="tultip__btn" type="button">
                                    <svg class="tultip__icon">
                                        <use xlink:href="#tultip"></use>
                                    </svg>
                                </button>
                                <p class="tultip__content">Lorem ipsum dolor sit, amet consectetur
                                    adipisicing
                                    elit.
                                    Necessitatibus magni modi, adipisci cumque, minus nulla tenetur
                                    pariatur
                                </p>
                            </div>
                        </label>
                        <label class="form-step__label" for="name-singer${count}">
                            <p>Исполнитель</p>
                            <input class="form-step__input name-singer" type="text" id="track-autorSinger${count}" placeholder="Исполнитель">
                            <div class="tultip">
                                <button class="tultip__btn" type="button">
                                    <svg class="tultip__icon">
                                        <use xlink:href="#tultip"></use>
                                    </svg>
                                </button>
                                <p class="tultip__content">Lorem ipsum dolor sit, amet consectetur
                                    adipisicing
                                    elit.
                                    Necessitatibus magni modi, adipisci cumque, minus nulla tenetur
                                    pariatur
                                </p>
                            </div>
                        </label>

                        <label class="form-step__label" for="autor-musik${count}">
                            <p>Автор музыки *</p>
                            <input class="form-step__input autor-musik" type="text" id="track-autorMusik${count}" placeholder="ФИО">
                            <div class="tultip">
                                <button class="tultip__btn" type="button">
                                    <svg class="tultip__icon">
                                        <use xlink:href="#tultip"></use>
                                    </svg>
                                </button>
                                <p class="tultip__content">Lorem ipsum dolor sit, amet consectetur
                                    adipisicing
                                    elit.
                                    Necessitatibus magni modi, adipisci cumque, minus nulla tenetur
                                    pariatur
                                </p>
                            </div>
                        </label>

                        <label class="form-step__label" for="autor-text${count}">
                            <p>Автор слов *</p>
                            <input class="form-step__input autor-text" type="text" id="track-autorText${count}" placeholder="ФИО">
                            <div class="tultip">
                                <button class="tultip__btn" type="button">
                                    <svg class="tultip__icon">
                                        <use xlink:href="#tultip"></use>
                                    </svg>
                                </button>
                                <p class="tultip__content">Lorem ipsum dolor sit, amet consectetur
                                    adipisicing
                                    elit.
                                    Necessitatibus magni modi, adipisci cumque, minus nulla tenetur
                                    pariatur
                                </p>
                            </div>
                        </label>
                    </div>
                    <button class="add-track__btn btn" type="button">
                Еще трек</button>`
        return box
    }       

    formThreeAlbum.addEventListener('submit', (event) => {
        event.preventDefault();     
        // Выбираем блоки ввода данных трека        
        const trackBlockAll = document.querySelectorAll('.form-step__track');
        // Обращаемся к одному блоку трека
        trackBlockAll.forEach(block => { 
            if (block) {
            // Обращаемся только к input элементам внутри трека (без аудио и картинки)
                const inputs = block.querySelectorAll('.form-step__wrapper input');
            
                    inputs.forEach(input => {    
                        // Выделяем из id инпута номер и название поля                    
                        const str = input.id.split('-');
        
                        const fieldId = str[1].slice(-1);
                        const fieldName = str[1].slice(0, -1);
                        //По id и названию поля добавляем данные в массив треков
                        const track = newAlbum.tracks[fieldId];
                        
                        track[fieldName] = input.value;                                                       
                    });
            };
        });
        console.log('Новый альбом шаг 3', newAlbum); 
    })

    formFourAlbum.addEventListener('submit', (event) => {
        event.preventDefault();        
        
        newAlbum.isrc = document.getElementById('isrc-album').value; //ISRC
        newAlbum.upc = document.getElementById('upc-album').value; //UPC
        
        console.log('Новый альбом шаг 4', newAlbum);       
    });

    formFiveAlbum.addEventListener('submit', (event) => {
        event.preventDefault();   
        newAlbum.linkAlbumOne = document.getElementById('link-album-1').value; //Ссылка на карточку альбома в
        newAlbum.linkAlbumTwo = document.getElementById('link-album-2').value; //Ссылка на карточку альбома в
        newAlbum.linkAlbumThree = document.getElementById('link-album-3').value; //Ссылка на карточку альбома в

        console.log('Новый альбом шаг 5', newAlbum);

        // Добавляем отображение названия и обложки с шага 2 
        document.querySelector('.payment__name-album').textContent = newAlbum.name;
        document.querySelector('.payment__img-album').src = imgAlbumPath;
        document.querySelector('.payment__name--autor-album').textContent = newAlbum.singer; 
        document.querySelector('.payment__autor-album').textContent = `В альбоме ${newAlbum.tracks.length} трека`; 
    });  

    formPromoAlbum.addEventListener('submit', (event) => {
        event.preventDefault();  
        
        newAlbum.promoCode = document.getElementById('promoAlbum').value;
        console.log('Промокод', newAlbum.promCode);
    });

    formAgreement.addEventListener('submit', (e) => {
        e.preventDefault();        
        
        const agreement = {
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

        const modal = document.getElementById('modalAgreement');
        modal.dataset.name;
       
         if (modal.dataset.name === 'trak') {
            newTrack.agreement = agreement;
            btnRezalt.removeAttribute('disabled');
            modal.classList.remove('visible');  
         } else {
            newAlbum.agreement = agreement;
            btnRezaltAlbum.removeAttribute('disabled');
            modal.classList.remove('visible');  
         } 

        console.log('Новый трек реквизиты договора', agreement); 
        document.querySelector('.modal').classList.remove('visible');       
    });

    btnRezaltAlbum.addEventListener('click', async() => {

        console.log('Окончательный объект добавленной альбома', newAlbum);
        // Дальше отправка нового трека на серсер
        try {
            const res = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",              
            },
            body: JSON.stringify(newAlbum),
          })

          console.log('Ответ сервера', res.data);
          btnRezaltAlbum.href = "{% url 'personal' %}"
            //   return await response.json();
        } catch(error) {           
                
                throw new Error(error)
        }; 

        document.getElementById('album-message').textContent = 'Что-то пошло не так';
               
    });
})