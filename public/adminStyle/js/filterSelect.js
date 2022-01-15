$(".dropdown-item").click(function (e){
    const value = $(this).text();
    console.log(value);
    console.log($(this).closest('.dropdown-menu-group').find("input").val(value));
})

$("#selectAll").click(function(){
    $('.select-row-checkbox').not(this).prop('checked', this.checked);
});

$('#resetBtn').click(function (){
    console.log("sang");
    $('input[type=text]').val("");
    $('input[type=number]').val("");
    $('input[type=date]').val("");
    $('#limit').val('10');
    if(""){ console.log("true")}
    else{ console.log("false")}
})

const filterStatus = $('#filterStatus').val();
console.log("filterSelect: ",filterStatus);
console.log("$('#status').val: ",$('#status').val());
if(filterStatus)
{
    $('#status').val(filterStatus);
    console.log("$('#status').val: ",$('#status').val());
}
else
{
    $('#status').val('0');
}


const filterState = $('#filterState').val();
console.log("filterSelect: ",filterState);
console.log("$('#state').val: ",$('#state').val());
if(filterState)
{
    $('#state').val(filterState);
    console.log("$('#state').val: ",$('#state').val());
}
else
{
    $('#state').val('0');
}

