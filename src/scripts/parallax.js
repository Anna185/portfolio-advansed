const parallax = document.querySelector(".parallax");
const parallaxOpinion = document.querySelector(".parallax--feedback");
const layers = parallax.children;
const layersOpinion = parallaxOpinion.children;
const parallaxOpinionOffset = parallaxOpinion.getBoundingClientRect().top;

function moveLayers (layers ,scrollOffset, topOffset = null) {
  Array.from(layers).forEach(layer => {
    const divider = layer.dataset.speed;
    let offset = topOffset 
      ? scrollOffset - topOffset
      : scrollOffset;
    const strafe = offset * divider / (-60);

    layer.style.transform = `translateY(${strafe}%)`;
  });
}

window.addEventListener("scroll", e => {
  const scrollOffset = window.pageYOffset;
  moveLayers(layers, scrollOffset);
  moveLayers(layersOpinion, scrollOffset, parallaxOpinionOffset);
})