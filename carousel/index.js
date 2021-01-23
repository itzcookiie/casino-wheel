const allCarouselCells = document.querySelectorAll('.carousel__cell');
carouselObject = document.querySelector('.carousel'),
nextBtn = document.getElementById('next'), prevBtn = document.getElementById('prev'),
numOfCells = allCarouselCells.length,
cellPadding = 15, cellWidth = 100,
cellSize = cellWidth + (cellPadding * 2),
angle = 360 / numOfCells,
tZ = Math.round( ( cellSize / 2 ) /  Math.tan( Math.PI / numOfCells ));
let rotation = 0;

carouselObject.style.transform = `translateZ(${-tZ}px)`;

[...allCarouselCells].map((cell,index) => {
    cell.style.transform = `rotateX(${index*angle}deg) translateZ(${tZ}px)`;
})

nextBtn.addEventListener('click', moveCarousel)
prevBtn.addEventListener('click', moveCarousel)

function moveCarousel(e) {
    e.target.id === 'next' ? rotation -= angle : rotation += angle;
    carouselObject.style.transform = `translateZ(${-tZ}px) rotateX(${rotation}deg)`;
}