

const adminSidebarCollapse =  document.querySelector("#adminSidebarCollapse");
const adminSidebar =  document.querySelector("#adminSidebar");

adminSidebarCollapse.onclick = function(){
    adminWrapper.classList.toggle('admin-sidebar--hide');
}


document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.admin-sidebar .admin-sidebar-item__link').forEach(function(element){

        element.addEventListener('click', function (e) {

            let nextEl = element.nextElementSibling;
            let parentEl  = element.parentElement;

            if(nextEl) {
                e.preventDefault();
                let mycollapse = new bootstrap.Collapse(nextEl);

                if(nextEl.classList.contains('show')){
                    mycollapse.hide();
                } else {
                    mycollapse.show();
                    // find other submenus with class=show
                    var opened_submenu = parentEl.parentElement.querySelector('.sidebar-sub-menu.show');
                    // if it exists, then close all of them
                    if(opened_submenu){
                        new bootstrap.Collapse(opened_submenu);
                    }
                }
            }
        }); // addEventListener
    }) // forEach
});