

const adminSidebarCollapse =  document.querySelector("#adminSidebarCollapse");
const adminSidebar =  document.querySelector("#adminSidebar");

adminSidebarCollapse.onclick = function(){
    adminWrapper.classList.toggle('admin-sidebar--hide');
}
