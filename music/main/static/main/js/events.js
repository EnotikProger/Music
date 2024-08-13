document.addEventListener("DOMContentLoaded", () => {
    
    // Смена лайка
    const btnLikeAll = document.querySelectorAll('.event-card__btn', '.like')

    btnLikeAll.forEach(like => {
        like.addEventListener('click', () => {            
            like.classList.toggle('like')
        })
    })

     // Слайдер секции завершенные события
    const swiperOldEvent = new Swiper('.oldEvent__cards', {        
        direction: 'horizontal',
        loop: false,  
        slidesPerGroup: 1,
        slidesPerView: 2,
        spaceBetween: 20,
        autoHeight: false,    
        navigation: {
            nextEl: '.swiper-button__next',
            prevEl: '.swiper-button__prev',
          },
      })
})