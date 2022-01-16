const { models } = require('../models');
const specificatonService = require('./admin.specification.service')

exports.getConfigurationsInforByProductId = (producId) => models.configurations.findAll({
    where: ({mobile_id: producId }),
    include: [
        { model: models.specifications, require: true, as: 'specification' },
    ],
})

exports.addConfiguration = async (mobile_id, value,specificationName) => {
    const specification = await specificatonService.getSpecificationByName(specificationName);
    console.log('specificaton: ',specification);
    const specificationId = specification.id;
    console.log('specificatonId: ',specificationId);

    try {
        const configurations = await this.createConfiguration(mobile_id, value,specificationId);
        return configurations;
    } catch (error) {
        return false;
    }
}



exports.createConfiguration = async  (mobile_id, value,specification_id) =>  {

    const maxId = await models.configurations.max('id');
    const nextId = maxId + 1;
    const configuration = await models.configurations.create({id: nextId, mobile_id: mobile_id, value: value, specification_id: specification_id});
    return configuration;
}

exports.getConfigurationsIdByProductId = async (producId) => {
    const configurationIds = await models.configurations.findAll({
            where: ({mobile_id: producId}),
            attributes: ['id'],
        }
    )

    return configurationIds.map(function (cur){
        return cur.id;
    });

}

exports.deleteConfigurationByIds = async (listIds) => {
    models.configurations.destroy(
        {
            where: {
                id: listIds
            }
        }
    );
}