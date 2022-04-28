const dropdownValue = document.querySelector('.selectpicker').dataset.value

if(dropdownValue !== ""){
    $(".selectpicker").selectpicker("val", dropdownValue)
}
