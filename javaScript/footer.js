export const footer = () => {
    const footerElement = document.createElement('footer');
    footerElement.classList.add('footer');
    footerElement.innerHTML = `<img src="../img/kinoLogoFull.png"> 
    <ul>
    <li>Filmer</li>
    <li>Medlemmar</li>
    <li>Kontakta Oss</li>
    </ul>`
    return footerElement;
};