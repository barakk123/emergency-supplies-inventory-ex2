const Supply = require('../models/supply');
const { logger } = require('../logger');

const getAllSupplies = async () => {
  const supplies = await Supply.find();
  logger.info(supplies.length ? `Fetched ${supplies.length} supplies.` : 'No supplies found.');
  return supplies;
};

const getSupplyByName = async (name) => {
  const supply = await Supply.findOne({ supply_name: name });
  logger.info(`looking for supply: ${name}`)
  if (supply) {
    logger.info(`Supply found: ${name}`);
  } else {
    logger.info(`Supply could not be found: ${name}`);
  }
  return supply;
};

const createSupply = async (supplyData) => {
  const newSupply = new Supply(supplyData);
  await newSupply.save();
  if (newSupply) {
    logger.info(`Supply created: ${newSupply.supply_name}`);
  }
  else {
    logger.info('Supply could not be created');
  }
  return newSupply;
};

const updateSupply = async (name, supplyData) => {
  const updatedSupply = await Supply.findOneAndUpdate({ supply_name: name }, supplyData, { new: true, runValidators: true });
  if (updatedSupply) {
    logger.info(`Supply updated: ${name}`);
  }
  else {
    logger.info('Supply could not be updated');
  }
  return updatedSupply;
};

const deleteSupply = async (name) => {
  const deletedSupply = await Supply.findOneAndDelete({ supply_name: name });
  if (deletedSupply) {
    logger.info(`Supply deleted: ${name}`);
  }
  else {
    logger.info('Supply could not be deleted');
  }
  return deletedSupply;
};

module.exports = {
  getAllSupplies,
  getSupplyByName,
  createSupply,
  updateSupply,
  deleteSupply
};
