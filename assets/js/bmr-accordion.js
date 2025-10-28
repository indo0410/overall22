// Accordion logic for BMR page

document.addEventListener('DOMContentLoaded', function () {
    const accordionTitles = document.querySelectorAll('.accordion-title');
    accordionTitles.forEach(function (title) {
        title.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const isOpen = content.classList.contains('open');
            // Close all
            document.querySelectorAll('.accordion-content').forEach(function (el) {
                el.classList.remove('open');
            });
            document.querySelectorAll('.accordion-title').forEach(function (el) {
                el.classList.remove('active');
            });
            // Open clicked
            if (!isOpen) {
                content.classList.add('open');
                this.classList.add('active');
            }
        });
    });
});
