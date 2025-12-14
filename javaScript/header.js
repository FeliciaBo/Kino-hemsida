export const header = () => {
    const headerElement = document.createElement('header');
    headerElement.classList.add('header');
    headerElement.innerHTML = `<img src="../img/kinoLogoFull.png"> 
    <ul>
    <li>Filmer</li>
    <li>Medlemmar</li>
    <li>Kontakta Oss</li>
    </ul>`
    return headerElement;
};