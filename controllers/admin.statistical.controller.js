
const statisticalService = require('../services/admin.statistical.service');

exports.getDateStatisticalPage = async (req, res) => {

    const data = req.query;
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        minDate: data.minDate,
        maxDate: data.maxDate,
    }

    const allStatistics = await statisticalService.getStatisticalDate(page, limit, filter, true);
    // const allStatistics = await statisticalService.getStatisticalMonth(page, limit, filter, true);
    // const allStatistics = await statisticalService.getStatisticalYear(page, limit, filter, true);
    const statistics = allStatistics.rows;
    const count = allStatistics.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('statistical/statisticalDatePage', { title: 'statistical', layout: 'layout.hbs', statistics, pagination});
}

exports.getMonthStatisticalPage = async (req, res) => {

    const data = req.query;
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        minDate: data.minDate,
        maxDate: data.maxDate,
    }

    // const allStatistics = await statisticalService.getStatisticalDate(page, limit, filter, true);
    const allStatistics = await statisticalService.getStatisticalMonth(page, limit, filter, true);
    // const allStatistics = await statisticalService.getStatisticalYear(page, limit, filter, true);
    const statistics = allStatistics.rows;
    const count = allStatistics.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('statistical/statisticalMonthPage', { title: 'statistical', layout: 'layout.hbs', statistics, pagination});
}

exports.getQuarterStatisticalPage = async (req, res) => {

    const data = req.query;
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        minDate: data.minDate,
        maxDate: data.maxDate,
    }

    // const allStatistics = await statisticalService.getStatisticalDate(page, limit, filter, true);
    // const allStatistics = await statisticalService.getStatisticalMonth(page, limit, filter, true);
    const allStatistics = await statisticalService.getStatisticalQuarter(page, limit, filter, true);
    const statistics = allStatistics.rows;
    const count = allStatistics.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('statistical/statisticalQuarterPage', { title: 'statistical', layout: 'layout.hbs', statistics, pagination});
}

exports.getYearStatisticalPage = async (req, res) => {

    const data = req.query;
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        minDate: data.minDate,
        maxDate: data.maxDate,
    }

    const allStatistics = await statisticalService.getStatisticalYear(page, limit, filter, true);
    // const allStatistics = await statisticalService.getStatisticalMonth(page, limit, filter, true);
    // const allStatistics = await statisticalService.getStatisticalYear(page, limit, filter, true);
    const statistics = allStatistics.rows;
    const count = allStatistics.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.render('statistical/statisticalYearPage', { title: 'statistical', layout: 'layout.hbs', statistics, pagination});
}