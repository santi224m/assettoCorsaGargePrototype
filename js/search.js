const searchbarButton = document.querySelector('.nav-searchbar button');
const searchbarInputBox = document.getElementById('searchbar');

searchbarButton.addEventListener('click', e => {
    // e.preventDefault();
    const searchbarInput = searchbarInputBox.value;
    window.location.href = `cars.html?page=1&filter=search&keywords=${searchbarInput}`;
    // console.log(searchbarInput);
});

searchbarInputBox.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        const searchbarInput = searchbarInputBox.value;
        window.location.href = `cars.html?page=1&filter=search&keywords=${searchbarInput}`;
    };
});
