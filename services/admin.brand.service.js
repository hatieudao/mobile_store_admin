const { models } = require('../models');

exports.findBrandByName = (name) => models.brands.findOne({
        where: ({ name: name })
    })

exports.createBrand = async (name) =>  {
    try{
        const maxId = await models.brands.max('id');
        const nextId = maxId + 1;
        const brand = models.brands.create({id: nextId, name: name});
        return brand;
    }catch (e){
        return false;
    }
}


exports.getBrandByName = async (name) => {
    const brand = await this.findBrandByName(name);
    if (!brand){
        const newBrand = await this.createBrand(name);
        console.log('newBrand',newBrand);
        console.log('newBrand.id',newBrand.id);
        console.log('newBrand.name',newBrand.name);
        return newBrand;
    }
    return brand;
}

exports.getAllBrandName = async (raw = false) => {
    return await models.brands.findAll({
        raw: raw,
        attributes: [
            "name"
        ]
    });
}