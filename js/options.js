function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const selectBrands = document.getElementById('brand');
const selectShifters = document.getElementById('shifter');
const selectClass = document.getElementById('class');

const advancedSerachBtn = document.getElementById('advancedSearch');
advancedSerachBtn.addEventListener('click', e => {
    e.preventDefault();
    console.log(selectBrands.value)
    console.log(selectShifters.value)
    console.log(selectClass.value)
    window.location.href = `cars.html?page=1&filter=advancedSearch&brandName=${selectBrands.value}&transmission=${selectShifters.value}&class=${selectClass.value}`;
});

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const mods = JSON.parse(this.responseText);

    const brandNames = [];
    for (let mod of mods) {
        if (!brandNames.includes(mod.brand)) {
            brandNames.push(mod.brand);
        }
    }

    const shifterNames = [];
    for (let mod of mods) {
        if (!shifterNames.includes(mod.transmission)) {
            shifterNames.push(mod.transmission);
        }
    }

    const classNames = [];
    for (let mod of mods) {
        if (!classNames.includes(mod.car_type)) {
            classNames.push(mod.car_type);
        }
    }

    const createOptions = function (arr, selectEl) {
      for (mod of arr) {
        const optionEl = document.createElement('option');
        optionEl.value = mod;
        if (mod == 'manual') {
          optionEl.innerHTML = capitalizeFirstLetter('H-Shifter');
        } else if (mod == 'paddleShifter'){
          optionEl.innerHTML = capitalizeFirstLetter('Paddle Shifter');
        } else if (mod == 'sequential') {
          optionEl.innerHTML = capitalizeFirstLetter('sequential shifter');
        } else if (mod == 'openWheel') {
          optionEl.innerHTML = capitalizeFirstLetter('Open Wheel');
        } else {
          optionEl.innerHTML = capitalizeFirstLetter(mod);
        }
        selectEl.appendChild(optionEl);
        // const test = modProp;
        // console.log(mod[modProp])
        // console.log(mod)
      };
    }

    createOptions(brandNames, selectBrands);
    createOptions(shifterNames, selectShifters);
    createOptions(classNames, selectClass);

  }
};
xmlhttp.open("GET", "json/cars.json", true);
xmlhttp.send();