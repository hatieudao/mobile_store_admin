
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});



const apiPath = $("#apiPath");
const pathname = location.pathname;
let urlParams = new URLSearchParams(location.search);
// console.log("urlParams:", urlParams.toString());

const source = $("#productListTemplate").html();
const template = Handlebars.compile(source);

$(document).ready(function() {



    $('#pagination li').addClass('page-item');
    $('#pagination li a').addClass('page-link');
    const currentPage = urlParams.get("page") || 1;
    // console.log("currentPage: ",currentPage);

    $('#pagination li a').each((index, item) => {
        let itemPage = $(item).attr('href').split('=')[1];
        // console.log("$(item).attr('href'): ",$(item).attr('href'));
        // console.log("$(item).html: ",$(item).html());
        // console.log("itemPage: ",itemPage);
        urlParams.set("page",itemPage);
        const itemHref = pathname + '?' + urlParams.toString();
        $(item).attr('href',itemHref);
    })
    urlParams.set("page",currentPage);
});

$('#pagination li a').click(function (e){

    e.preventDefault();

    const item = $(e.target).closest("li").find("a");
    console.log("item: ",item);
    const pageHref = item.attr('href');
    console.log("pageHref: ",pageHref);
    const filter = pageHref.split("?")[1]
    const urlApi = "/admin/api" + apiPath.val() + "?"+ filter;
    console.log(urlApi);

    $.ajax({
        // url: "/admin/api/product?page=1",
        url: urlApi,
        success: function (data){
            let jsonData = {
                data: data
            }

            const products = jsonData.data;
            console.log("jsonData: ",jsonData);
            const productList = $("#productList");

            let itemPage = $(item).attr('href').split('=')[1];
            urlParams.set("page",itemPage);

            productList.html(template({products}));
            // console.log("productList: ",productList.html());


        }
    })
})
