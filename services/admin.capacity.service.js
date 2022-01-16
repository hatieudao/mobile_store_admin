const { models } = require('../models');

exports.findCapacityByName = (name) => models.capacities.findOne({
    where: ({ name: name })
})

exports.createCapacity = async (name) =>  {
    const maxId = await models.capacities.max('id');
    const nextId = maxId + 1;
    const capacity = await models.capacities.create({id: nextId, name: name});
    return capacity;
}

exports.getCapacityByName = async (name) => {
    const capacity = await this.findCapacityByName(name);
    if (!capacity){
        return await  this.createCapacity(name);
    }
    return capacity;
}
