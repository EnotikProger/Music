document.addEventListener("DOMContentLoaded", () => {
    // Бургер меню
    const $burger = document.getElementById('burger'),
    $nav = document.getElementById('nav'),
    $menuItems = document.querySelectorAll('.menu__item');

    $burger.addEventListener('click', () => {
        $burger.classList.toggle('open');
        $nav.classList.toggle('open')
    })

    $menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            const target = event.target;

            if (target.closest('.menu__item')) {
                $burger.classList.remove('open');
                $nav.classList.remove('open');
            }
        })
    })    
    
    // Закрытие по эск
    window.addEventListener('keydown', () => {
        $burger.classList.remove('open');
        $nav.classList.remove('open');        
    })
 
  // Видеоплеер
  const videoPlayer = document.getElementById('videoPlayer');

  // Массив с URL видеофайлов
  const videos = [
    './static/main/img/home_page/train.mp4',
    './static/main/img/home_page/IG-stories.mp4'
  ];

  let currentVideoIndex = 0;

  // Функция для загрузки и воспроизведения видео
  const playVideo = (index) => {    
    if (index < videos.length) {
      videoPlayer.src = videos[index];
      videoPlayer.load();
    }     
  };

  // Событие `canplay` срабатывает, когда видео готово к воспроизведению
  videoPlayer.addEventListener('canplay', () => {
    videoPlayer.play();

    // Установите таймер для переключения видео через 3 секунды
    setTimeout(() => {
      videoPlayer.pause();
      if (currentVideoIndex === (videos.length - 1)) {        
        currentVideoIndex = 0;    
    } else { 
        currentVideoIndex++;
    }
    //   if (currentVideoIndex === videos.length) {currentVideoIndex === 0}
      playVideo(currentVideoIndex);
    }, 3000); // 3000 миллисекунд = 3 секунды
  });

  // Запускаем воспроизведение первого видео
  playVideo(currentVideoIndex);

  // Создание и анимация всплывающих точек
  const $bublContainer = document.getElementById('bubl');

  function createdot(initial = false) {
    
    const $dot = document.createElement('div');
    $dot.classList.add('dot');
    
    $dot.style.left = `${Math.random() * 100}%`;

    if (initial) {    
      $dot.style.bottom = `${Math.random() * 100}vh`;    
      
      $dot.style.animationDelay = `${Math.random() * 10}s`;
      $dot.style.animationDuration = `${15 + Math.random() * 5}s`;
    } else {    
        $dot.style.animationDelay = `${Math.random() * 10}s`;
        $dot.style.animationDuration = `${45 + Math.random() * 5}s`;
    }
    
    $bublContainer.appendChild($dot);

    $dot.addEventListener('animationend', () => {
        $dot.remove();
    });
  }

  for (let i = 0; i < 300; i++) {
    createdot(true);
  }

  setInterval(createdot, 500);
})