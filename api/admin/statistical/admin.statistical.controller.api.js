
const statisticalService = require('../../../services/admin.statistical.service');

exports.getDateStatistics = async (req, res) => {

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
    const statistics = allStatistics.rows;
    const count = allStatistics.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.status(200).json({statistics, pagination})
}

exports.getMonthStatistics = async (req, res) => {

    const data = req.query;
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        minDate: data.minDate,
        maxDate: data.maxDate,
    }

    const allStatistics = await statisticalService.getStatisticalMonth(page, limit, filter, true);
    const statistics = allStatistics.rows;
    const count = allStatistics.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.status(200).json({statistics, pagination})
}


exports.getQuarterStatistics = async (req, res) => {

    const data = req.query;
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;

    //filter
    //Lấy các giá trị filter
    const filter = {
        minDate: data.minDate,
        maxDate: data.maxDate,
    }

    const allStatistics = await statisticalService.getStatisticalQuarter(page, limit, filter, true);
    const statistics = allStatistics.rows;
    const count = allStatistics.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.status(200).json({statistics, pagination})
}


exports.getYearStatistics = async (req, res) => {

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
    const statistics = allStatistics.rows;
    const count = allStatistics.count;

    const pagination = {
        page: page,
        limit: limit,
        totalRows: count
    }

    res.status(200).json({statistics, pagination})
}
