document.addEventListener("DOMContentLoaded", () => {
    // Фильтрация каталога
    const filter = document.getElementById('filter');
  
    if (filter) {
        const choicesFilter = new Choices(filter, {
        searchEnabled: false,
        allowHTML: true
    });
    }
})