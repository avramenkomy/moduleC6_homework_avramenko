const btnSize = document.querySelector(".j-btn-size");
const btnSizeBrowser = document.querySelector(".j-btn-size-browser");

btnSize.addEventListener("click", () => {
    alert(`Ширина дисплея: ${window.screen.width}px\nВысота дисплея: ${window.screen.height}px`);
});

btnSizeBrowser.addEventListener("click", () => {
    alert(`Ширина окна браузера: ${window.innerWidth}px\nВысота окна браузера: ${window.innerHeight}px`);
});