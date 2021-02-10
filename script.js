var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        mods = JSON.parse(this.responseText);
        // console.log(mods)
        
        
        
        // Create array from JSON file
const modsArr = [];
for (let mod of mods) {
    modsArr.push(mod);
}

// Sort modsArr in alphabetical order
const sortedModsByName = modsArr.sort((a,b) => {
    const brandA = a.brand;
    const brandB = b.brand;

    if (brandA < brandB) {
        return -1;
      }
      if (brandA > brandB) {
        return 1;
      }
    
      // brands must be equal
      return 0;
});





let currentPage = 1;
let rows = 12;
const pageWrapper = document.getElementById('page_number');

function updatePageNumber(num) {
    let str = window.location.search
            str = replaceQueryParam('page', num, str)
            // str = replaceQueryParam('cols', 'no', str)
            window.location = window.location.pathname + str
}

function displayList (arr, wrapper, rowsPerPage, page) {
    
    page --;
    
    let start = rowsPerPage * page;
    let paginatedItems = arr.slice(start, start + rowsPerPage);

    return paginatedItems;

    // console.log(numberOfPages)
    // console.log(paginatedItems)
    // console.log(wrapper)
}

function createPageNumbers(arr, wrapper, rowsPerPage, page) {
    wrapper.innerHTML = '';
    
    let numberOfPages = Math.ceil(arr.length / rowsPerPage);
    
    for (i = 0; i < numberOfPages; i++) {
        let pageNumberEl = document.createElement('span');
        pageNumberEl.classList.add('pageButtonNumber');
        pageNumberEl.innerHTML = i + 1;
        pageNumberEl.addEventListener('click', e => {
            // currentPage = i + 1;
            currentPage = Number(e.toElement.innerHTML);
            // createPageNumbers(arr, wrapper, rowsPerPage, page);

            updatePageNumber(e.toElement.innerHTML);
            
        })
        
        if (i + 1 == page) {
            pageNumberEl.classList.add('currentPage');
        }

        wrapper.appendChild(pageNumberEl);

    }
}

const prevButton = document.getElementById('button_prev');
const nextButton = document.getElementById('button_next');

function toggleButtons() {
    const paginationLength = document.querySelectorAll('.pageButtonNumber').length;
    // console.log(paginationLength)

    if(currentPage == 1) {
        prevButton.classList.add('hide');
    }

    if(currentPage == paginationLength) {
        nextButton.classList.add('hide');
    }
}


prevButton.addEventListener('click', e => {
    if(currentPage > 1) {
        currentPage--;
        updatePageNumber(currentPage);
    }
})

nextButton.addEventListener('click', e => {

    const paginationLength = document.querySelectorAll('.pageButtonNumber').length;

    if(currentPage < paginationLength) {
        currentPage++;
        updatePageNumber(currentPage);
    }
})

// displayList(sortedModsByName, pageWrapper, rows, currentPage);

// Create car element to display on page
function renderList (sortedArr) {
    sortedArr.forEach((mod) => {
         // Create mod class
    const modDiv = document.createElement('div');
    modDiv.classList.add('mod');

    // Title Div
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.innerHTML = mod.brand;

    // Model Name
    const modelNameDiv = document.createElement('div');
    modelNameDiv.classList.add('model-name');
    modelNameDiv.innerHTML = mod.model;

    // Year
    const yearDiv = document.createElement('div');
    yearDiv.classList.add('year');
    yearDiv.innerHTML = mod.year;

    // Image
    const imgDiv = document.createElement('div');
    imgDiv.classList.add('img');
    imgDiv.innerHTML = `<img src="${mod.picture_location}">`;

    // Button
    const btnDiv = document.createElement('div');
    btnDiv.classList.add('link');
    btnDiv.innerHTML = `<a href="${mod.link}" class="btn-small-dark" target="_blank">Go to Mod</a>`;

    const lineBreak = document.createElement('div');
    lineBreak.classList.add('lineBreak');

    const lineBreak2 = document.createElement('div');
    lineBreak2.classList.add('lineBreak');

    const yearAndShifter = document.createElement('div');
    yearAndShifter.classList.add('yearAndShifter')

    const shifter = document.createElement('div');
    if (mod.transmission == 'manual') {
        shifter.innerHTML = 'H-Shifter';
    } else if (mod.transmission =='paddleShifter') {
        shifter.innerHTML = 'Paddle Shifter';
    } else {
        shifter.innerHTML = 'Sequencial Shifter';
    }

    // Add inner divs to mod div
    modDiv.appendChild(imgDiv);
    modDiv.appendChild(titleDiv);
    modDiv.appendChild(lineBreak);
    modDiv.appendChild(modelNameDiv);
    modDiv.appendChild(lineBreak2);
    modDiv.appendChild(yearAndShifter);
    yearAndShifter.appendChild(yearDiv);
    yearAndShifter.appendChild(shifter);
    modDiv.appendChild(btnDiv);

    // Append mod div to container div
    const containerDiv = document.getElementById('container');
    containerDiv.appendChild(modDiv);
    });

    toggleButtons();
};

// Filter array
function filterByBrand(brand) {
    if(brand == 'any') {
        return modsArr.filter(mod => mod)
    } else {
        return modsArr.filter(mod => mod.brand == brand)
    }
}

function filterByTransmission(value) {
    if (value == 'any') {
        return modsArr.filter(mod => mod)
    } else {
        return modsArr.filter(mod => mod.transmission == value)
    }
}

function filterByClass(value) {
    if (value == 'any') {
        return modsArr.filter(mod => mod)
    } else {
        return modsArr.filter(mod => mod.car_type == value)
    }
}

function filterAdvanced(brandArr, shifterArr, classArr) {
    return modsArr.filter(mod => brandArr.includes(mod) && shifterArr.includes(mod) && classArr.includes(mod));
}

function filterBySearch(keywords) {
    return modsArr.filter(mod => mod.model.toUpperCase().includes(keywords.toUpperCase()) || mod.brand.toUpperCase().includes(keywords.toUpperCase()) || mod.year.toUpperCase().includes(keywords.toUpperCase()) || mod.link.toUpperCase().includes(keywords.toUpperCase()))
}

// Search Function



// Use url info to filter cars
let params = new URLSearchParams(location.search);

const urlFilter = params.get('filter');
const urlBrand = params.get('brandName');
const urlTransmission = params.get('transmission');
const urlClass = params.get('class');
const urlSearch = params.get('keywords');
const urlDecadeMin = params.get('yearMin');
const urlDecadeMax = params.get('yearMax');
const urlPageNumber = params.get('page');
currentPage = Number(urlPageNumber);

function replaceQueryParam(param, newval, search) {
    var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    var query = search.replace(regex, "$1").replace(/&$/, '');

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
}

// console.log(urlpageNumber)
if (urlFilter == 'brand') {
    
    const filteredBrandArr = filterByBrand(urlBrand);
    createPageNumbers(filteredBrandArr, pageWrapper, rows, currentPage);
    
    renderList(displayList(filteredBrandArr, pageWrapper, rows, currentPage));
    
} else if (urlFilter == 'transmission') {

    const filteredTransmissionArr = filterByTransmission(urlTransmission);
    createPageNumbers(filteredTransmissionArr, pageWrapper, rows, currentPage);
    
    renderList(displayList(filteredTransmissionArr, pageWrapper, rows, currentPage));

} else if (urlFilter == 'class') {
    const filteredClassArr = filterByClass(urlClass);
    // console.log(filterByClass(urlClass))
    createPageNumbers(filteredClassArr, pageWrapper, rows, currentPage);
    
    renderList(displayList(filteredClassArr, pageWrapper, rows, currentPage));

} else if(urlFilter == 'decade') {

    function filterByDecade(urlDecadeMin, urlDecadeMax) {
        return modsArr.filter(mod => mod.year < urlDecadeMax && mod.year >= urlDecadeMin)
    }

    const filteredDecadeArr = filterByDecade(urlDecadeMin, urlDecadeMax);
    createPageNumbers(filteredDecadeArr, pageWrapper, rows, currentPage);
    
    renderList(displayList(filteredDecadeArr, pageWrapper, rows, currentPage));

} else if (urlFilter == 'search') {
    const filteredSearchArr = filterBySearch(urlSearch);
    // console.log(filteredSearchArr[0].includes('911'))
    createPageNumbers(filteredSearchArr, pageWrapper, rows, currentPage);
    
    renderList(displayList(filteredSearchArr, pageWrapper, rows, currentPage));
} else if (urlFilter == 'advancedSearch') {
    const filteredBrandArr = filterByBrand(urlBrand);
    const filteredTransmissionArr = filterByTransmission(urlTransmission);
    const filteredClassArr = filterByClass(urlClass);
    
    const advancedSearchArr = filterAdvanced(filteredBrandArr, filteredTransmissionArr, filteredClassArr);
    console.log(urlBrand)

    createPageNumbers(advancedSearchArr, pageWrapper, rows, currentPage);
    
    renderList(displayList(advancedSearchArr, pageWrapper, rows, currentPage));
} else {
    createPageNumbers(sortedModsByName, pageWrapper, rows, currentPage);
    
    renderList(displayList(sortedModsByName, pageWrapper, rows, currentPage));
    
}


// An array to check if brand is already in website
// Not used to display anyting on website
const brandNames = [];
for (let mod of sortedModsByName) {
    if (!brandNames.includes(mod.brand)) {
        brandNames.push(mod.brand);
    }
}

// console.log(brandNames)

}
};

xmlhttp.open("GET", "json/cars.json", true);
xmlhttp.send();