const emergencySupplierRepository = require('../repository/emergencySupplierRep');
const NotFoundError = require('../errors/NotFoundError');

const getAllSupplies = async (req, res, next) => {
    try {
        const allSupplies = await emergencySupplierRepository.getAllSupplies();
        if (!allSupplies || allSupplies.length === 0) {
            throw new NotFoundError('No supplies found');
        }
        res.status(200).json(allSupplies);
    } catch (error) {
        next(error);
    }
};

const getSupplyByName = async (req, res, next) => {
    try {
        const supply = await emergencySupplierRepository.getSupplyByName(req.params.supplyName);
        if (!supply) {
            throw new NotFoundError('Supply not found');
        }
        res.status(200).json(supply);
    } catch (error) {
        next(error);
    }
};

const createSupply = async (req, res, next) => {
    try {
        const newSupply = await emergencySupplierRepository.createSupply(req.body);
        res.status(201).json(newSupply);
    } catch (error) {
        next(error);
    }
};

const updateSupply = async (req, res, next) => {
    try {
        const updatedSupply = await emergencySupplierRepository.updateSupply(req.params.supplyName, req.body);
        res.status(200).json(updatedSupply);
    } catch (error) {
        next(error);
    }
};

const deleteSupply = async (req, res, next) => {
    try {
        await emergencySupplierRepository.deleteSupply(req.params.supplyName);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSupplies,
    getSupplyByName,
    createSupply,
    updateSupply,
    deleteSupply
};
