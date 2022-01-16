



const pathname = location.pathname;
let urlParams = new URLSearchParams(location.search);
// console.log("urlParams:", urlParams.toString());


const tableDataSource = $("#tableDataTemplate").html();
const tableDataTemplate = Handlebars.compile(tableDataSource);

const paginationSource = $("#paginationTemplate").html();
const paginationTemplate = Handlebars.compile(paginationSource);


function loadPageLink(){
    //Lấy ra current page
    const currentPage = urlParams.get("page") || 1;
    $('#pagination li a').each((index, item) => {

        //itemPage là giá trị của page mà page-link nắm giữ
        let itemPage = $(item).attr('href').split('=')[1];

        //urlParams là url của page hiện tại (bao gồm các giá trị đã filter)
        urlParams.set("page",itemPage);

        //sửa lại href cho page-link = pathname + '?' + urlParams.toString();
        //Lúc này trong href của page-link sẽ ko bị mất các filter ta đã chọn
        const itemHref = pathname + '?' + urlParams.toString();
        $(item).attr('href',itemHref);
    })

    //Sửa lại page cho urlParams về lại giá trị currentPage
    urlParams.set("page",currentPage);

}


$(document).ready(function() {
    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');
    loadPageLink();
});


$("#pagination").on('click', '.page-link', function(e) {

    //Ngăn chặn load lại trang khi click vào page-link
    e.preventDefault();

    //item là page-link element
    const item = $(e.target).closest("li").find("a");;

    const pageHref = item.attr('href');

    //filter là params cùa filter mà ta chọn
    //ta cách ra sau "?" của page-link href
    const filter = pageHref.split("?")[1]

    //Url của API
    const urlApi = "/admin/api" + "/order" + "?"+ filter;
    console.log(urlApi);


    const clickPageNum = pageHref.split("page=")[1];
    console.log("clickPageNum: ",clickPageNum);

    $.ajax({
        // url: "/admin/api/order?page=1",
        url: urlApi,
        success: function (data){
            const orders = data.orders;
            const pagination = data.pagination;

            const tableData = $("#tableData");

            let itemPage = $(item).attr('href').split('=')[1];
            urlParams.set("page",itemPage);

            tableData.html(tableDataTemplate({orders}));
            // console.log("tableData: ",tableData.html());

            pagination.page = clickPageNum;
            $("#pagination") .html(paginationTemplate({pagination, paginationClass: "pagination"}));
            console.log("pagi: ",$("pagination") .html());

            //Sau khi hiển thị dữ liệu mới, ta load lai page-link
            loadPageLink();
        }
    })
})
