const emergencySupplierRepository = require('../repository/emergencySupplierRep');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');
const { logger } = require('../logger');

// Validate input for create
const validateSupplyData = (data) => {
    return data.category && data.unit_price && data.quantity && data.supplier && data.location && data.supply_name;
};
// Validate input for update
const validateUpdateSupplyData = (data) => {
    return data.category || data.unit_price || data.quantity || data.supplier || data.location || data.expiration_date || data.supply_name;
};

const getAllSupplies = async (req, res, next) => {
    try {
        const allSupplies = await emergencySupplierRepository.getAllSupplies();
        if (allSupplies.length === 0) {
            logger.info('No supplies found.');
            return res.status(404).send('No supplies found.');
        }
        res.status(200).json(allSupplies);
    } catch (error) {
        next(error);
    }
};

const getSupplyByName = async (req, res, next) => {
    try {
        if (!req.params.supplyName || req.params.supplyName.trim() === '' || req.params.supplyName === undefined || req.params.supplyName === null) {
            throw new BadRequestError('Supply name is required.');
        }
        const supply = await emergencySupplierRepository.getSupplyByName(req.params.supplyName);
        if (!supply) {
            throw new NotFoundError('Supply not found');
        }
        res.status(200).json(supply);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
        if (error instanceof BadRequestError) {
            return res.status(400).send(error.message);
        }
        next(error);
    }
};

const createSupply = async (req, res, next) => {
    if (!validateSupplyData(req.body)) {
        return res.status(400).send('Missing data, make sure you fill all the required fields.');
    }

    try {
        // Check for conflict
        const existingSupply = await emergencySupplierRepository.getSupplyByName(req.body.supply_name);
        if (existingSupply) {
            logger.info('A supply with this name already exists.');
            throw new ConflictError('A supply with this name already exists.');
        }
        // Create new supply
        const newSupply = await emergencySupplierRepository.createSupply(req.body);
        res.status(201).json(newSupply);
    } catch (error) {
        if (error instanceof ConflictError) {
            return res.status(409).send(error.message);
        }
        next(error);
    }
};

const updateSupply = async (req, res, next) => {
    if (!validateUpdateSupplyData(req.body)) {
        return res.status(400).send('Incomplete data for update.');
    }
    try {
        const updatedSupply = await emergencySupplierRepository.updateSupply(req.params.supplyName, req.body);
        if (!updatedSupply) {
            throw new NotFoundError('Supply to update not found.');
        }
        if (updatedSupply.supply_name !== req.body.supply_name) {
            logger.info('Supply with the updated name already exists.');
            throw new ConflictError('Supply with the updated name already exists.');
        }
        res.status(200).json(updatedSupply);
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        } if (error instanceof ConflictError) {
            return res.status(409).send(error.message);   
        }
        next(error);
    }
};

const deleteSupply = async (req, res, next) => {
    try {
        const deletedSupply = await emergencySupplierRepository.deleteSupply(req.params.supplyName);
        if (!deletedSupply) {
            throw new NotFoundError('Supply to delete not found.');
        }
        res.status(204).send();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).send(error.message);
        }
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
