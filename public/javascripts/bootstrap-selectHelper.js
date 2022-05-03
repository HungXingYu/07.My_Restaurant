const dropdown = document.querySelector('.selectpicker')

if(dropdown){
    const dropdownValue = dropdown.dataset.value
    $(".selectpicker").selectpicker("val", dropdownValue)
}
