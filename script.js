//manggil semua elemen yang butuh hover
const banner = document.getElementById('myBanner');
const fotoElements = document.querySelectorAll('.foto');
const allElements = [];

if(banner) allElements.push(banner);
fotoElements.forEach(el => allElements.push(el));

//js respnsif untuk hp atau desktop
const DEKSTOP_QUERY = window.matchMedia('(min-width: 769px)');
const MOBILE_QUERY = window.matchMedia('(max-width: 768px)');

//untuk hover
function setupElementEvents(element){
    function active(){element.classList.add('hover-active');}
    function deactive(){element.classList.remove('hover-active');}
    function toggleActive(){element.classList.toggle('hover-active');}

    function handleElementListeners(e){
        element.removeEventListener('mouseenter', active);
        element.removeEventListener('mouseleave', deactive);
        element.removeEventListener('click', toggleActive);

        if (DEKSTOP_QUERY.matches){
            element.addEventListener('mouseenter', active);
            element.addEventListener('mouseleave', deactive);
        }else{
            element.addEventListener('click', toggleActive);
        }
    }

    handleElementListeners(DEKSTOP_QUERY);
    DEKSTOP_QUERY.addEventListener('change', handleElementListeners);
    MOBILE_QUERY.addEventListener('change', handleElementListeners);
}

//pasang event listener untuk semua elemen
allElements.forEach(setupElementEvents);

//bikin geseran di hp
document.addEventListener('DOMContentLoaded',() => {
    const slider = document.getElementById('fotoSlider');

    if (slider && MOBILE_QUERY.matches){

        let currentIndex = 0;
        let sliderInterval;
        const intervalTime = 3000;

        const fotoItems = slider.querySelectorAll('.foto');
        const totalItems = fotoItems.length;

        function initSlider(){
            if(!slider || totalItems === 0)return;

            let currentIndex = 0;
            let sliderInterval;
            const intervalTime = 3000;
        }

        //geser ke foto selanjutnya
        function goToNextSlide(){
            currentIndex++;

            //fungsi selanjutnya untuk kembali ke foto awal setelah habis
            if(currentIndex >= totalItems){
                currentIndex = 0;
            }

            const firstFoto = fotoItems[0];
            const itemWidth = firstFoto.offsetWidth;

            const itemMarginStyle = window.getComputedStyle(firstFoto).marginRight;
            const itemMarginRight = parseFloat(itemMarginStyle);
            
            //perhitungan lebar item
            const scrollUnit = itemWidth + (itemMarginRight * 2);
            const scrollPosition = currentIndex * scrollUnit;

            //scrollnya
            slider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }

        //clear interval yang sudah berjalan
        if (sliderInterval) clearInterval(sliderInterval);

        // mulai interval jika mobile
        if (MOBILE_QUERY.matches){
            sliderInterval = setInterval(goToNextSlide, intervalTime);
        }

        //Kontrol user touch
        slider.addEventListener('touchstart', () => clearInterval(sliderInterval));
        //lanjut/berhenti geser oleh user touch
        slider.addEventListener('touchend', () => {
            if (MOBILE_QUERY.matches){
                sliderInterval = setInterval(goToNextSlide, intervalTime);
            }
        });
    }

    //panggil DOMContentLoaded
    initSlider();
    MOBILE_QUERY.addEventListener('change', initSlider);
});