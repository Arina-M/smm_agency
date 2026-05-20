const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if(e.isIntersecting){
        e.target.classList.add('visible');
        }
    });
    },{threshold:0.15});
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

    const bars = document.querySelectorAll('.vis-bar-fill');
    setTimeout(() => {
    bars.forEach(b => {
        const w = b.style.width;
        b.style.width = '0';
        setTimeout(() => b.style.width = w, 300);
    });
    }, 400);