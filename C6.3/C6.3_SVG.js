//Два способа добавления иконки

//Ищем кнопку на странице
const btn1 = document.querySelector(".j-btn-1");

//Ищем div-ы с иконками на странице
const icon11 = document.querySelector(".j-btn-icon-11");
const icon12 = document.querySelector(".j-btn-icon-12");

//Первый способ добавляем класс с display:none туда где его нет и удаляем там где он есть
btn1.addEventListener("click", () => {
    icon11.classList.toggle("icon-none");
    icon12.classList.toggle("icon-none");
});

//________________________________________________________________________________________________________________________________________________________________//

//Второй способ 

//Ищем кнопку на странице
const btn2 = document.querySelector(".j-btn-2");

//Объявим константы, содержащие код SVG-иконок

const SVG1 = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-left-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path fill-rule="evenodd" d="M10.828 5.172a.5.5 0 0 0-.707 0L6.025 9.268V6.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H9.5a.5.5 0 0 0 0-1H6.732l4.096-4.096a.5.5 0 0 0 0-.707z"/>
</svg>`
const SVG2 = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-down-left-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.879-2.828a.5.5 0 1 1 .707.707L6.732 9.975H9.5a.5.5 0 1 1 0 1H5.525a.5.5 0 0 1-.5-.5V6.5a.5.5 0 1 1 1 0v2.768l4.096-4.096z"/>
</svg>`


//Ищем div-ы с иконками на странице
const icon21 = document.querySelector(".j-btn-icon-21");
const icon22 = document.querySelector(".j-btn-icon-22");

//Вспомогательный флаг
let flag = true;

//Методом innerHTML добавляем в div для иконок SVG-код в зависимости от flag
btn2.addEventListener("click", () => {
    if (flag) {
        icon21.innerHTML = "";
        icon22.innerHTML = SVG2;
        flag = false;
    } else {
        icon21.innerHTML = SVG1;
        icon22.innerHTML = "";
        flag = true;
    }
    
});