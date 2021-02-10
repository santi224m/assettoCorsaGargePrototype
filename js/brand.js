var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    let currentPage = 1;
    let rows = 12;

    function replaceQueryParam(param, newval, search) {
        var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
        var query = search.replace(regex, "$1").replace(/&$/, '');
    
        return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
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
                console.log(e.toElement.innerHTML);
                // createPageNumbers(arr, wrapper, rowsPerPage, page);
    
                updatePageNumber(e.toElement.innerHTML);
                
            })
            
            if (i + 1 == page) {
                pageNumberEl.classList.add('currentPage');
            }
    
            wrapper.appendChild(pageNumberEl);
    
        }
    }

    
    const pageWrapper = document.getElementById('page_number');

    function updatePageNumber(num) {
        let str = window.location.search
                str = replaceQueryParam('page', num, str)
                // str = replaceQueryParam('cols', 'no', str)
                window.location = window.location.pathname + str;
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

    let params = new URLSearchParams(location.search);
    const urlPageNumber = params.get('page');
    currentPage = Number(urlPageNumber);



    const brandsArr = JSON.parse(this.responseText);
    const alphabeticalBrandsArr = brandsArr.sort((a, b) => {
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
    // console.log(alphabeticalBrandsArr);

    const dislplayBrandEl = function (arr) {
        const container = document.getElementById('container-brands');
        for (mod of arr) {
            const tableEl = document.createElement('div');
            tableEl.classList.add('table');
            const linkEl = document.createElement('a');
            linkEl.href = mod.link;
            const imgContainerEl = document.createElement('div');
            imgContainerEl.classList.add('img');
            const imgEl = document.createElement('img');
            imgEl.src = mod.img;

            imgContainerEl.appendChild(imgEl);
            linkEl.appendChild(imgContainerEl);
            tableEl.appendChild(linkEl);
            container.appendChild(tableEl);
        }

        toggleButtons();
    }

    createPageNumbers(brandsArr, pageWrapper, rows, currentPage);
    dislplayBrandEl(displayList(brandsArr, pageWrapper, rows, currentPage));


  }
};
xmlhttp.open("GET", "json/brands.json", true);
xmlhttp.send();