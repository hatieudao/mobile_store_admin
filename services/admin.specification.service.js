const { models } = require('../models');

exports.findSpecificationByName = (name) => models.specifications.findOne({
  where: ({ name: name })
})

exports.createSpecification = async (name) => {
  const maxId = await models.specifications.max('id');
  const nextId = maxId + 1;
  const specification = await models.specifications.create({ id: nextId, name: name });
  return specification;
}

exports.getSpecificationByName = async (name) => {
  const specification = await this.findSpecificationByName(name);
  if (!specification) {
    return await this.createSpecification(name);
  }
  return specification;
}

exports.specificationList = (page, limit, filter) => {
  const result = models.specifications.findAndCountAll({ raw: true });
  return result;

}
