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

})