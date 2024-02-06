const Supply = require('../models/supply');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const getAllSupplies = async () => {
    return Supply.find();
};

const getSupplyByName = async (name) => {
    const supply = await Supply.findOne({ supply_name: name });
    if (!supply) {
        throw new NotFoundError(`Supply with name ${name} not found`);
    }
    return supply;
};

const createSupply = async (supplyData) => {
    try {
        return await Supply.create(supplyData);
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            throw new ConflictError('A supply with that name already exists');
        }
        throw new BadRequestError(error.message);
    }
};

const updateSupply = async (name, supplyData) => {
    const supply = await Supply.findOneAndUpdate({ supply_name: name }, supplyData, { new: true, runValidators: true });
    if (!supply) {
        throw new NotFoundError(`Supply with name ${name} not found`);
    }
    return supply;
};

const deleteSupply = async (name) => {
    const supply = await Supply.findOneAndDelete({ supply_name: name });
    if (!supply) {
        throw new NotFoundError(`Supply with name ${name} not found`);
    }
    return supply;
};

module.exports = {
    getAllSupplies,
    getSupplyByName,
    createSupply,
    updateSupply,
    deleteSupply
};
