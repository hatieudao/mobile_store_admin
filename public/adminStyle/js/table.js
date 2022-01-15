$(".admin-table").on('click', '.deleteRowBtn', function(e){
    console.log("remove row");
    console.log("e.target: ",e.target);
    e.target.closest('tr').remove();
})