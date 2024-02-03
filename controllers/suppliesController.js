// Placeholder for a MongoDB model
// const Supply = require('../models/Supply');
const emergencySupplierRepository = require('../repository/emergencySupplierRep'); // Adjust path as needed
const {BadRequestError, NotFoundError, ServerError} = require('../errors/errors'); // Adjust path as needed

// Get all emergency supplies
const getAllSupplies = async (req, res) => {
    try {
        const allSupplies = await emergencySupplierRepository.getAllSupplies();
        if (!allSupplies || allSupplies.length === 0) throw new NotFoundError('No emergency supplies found');
        return res.status(200).json(allSupplies);
    } catch (error) {
        res.status(error?.status || 500).json({message: error.message});
    }
};

const getSupplyByName = async (req, res) => {
    const supplyName = req.params.name;
    try {
        if (!supplyName) throw new BadRequestError('Supply name is required');
        const supply = await emergencySupplierRepository.getSupplyByName(supplyName);
        if (!supply || Object.keys(supply).length === 0) throw new NotFoundError(`Emergency supply with name ${supplyName} not found`);
        return res.status(200).json(supply);
    } catch (error) {
        res.status(error?.status || 500).json({message: error.message});
    }
};

const createSupply = async (req, res) => {
    // Implement validation logic and creation logic here
    // Return response to client
};

const updateSupply = async (req, res) => {
    // Validate input and update supply in database
};

const deleteSupply = async (req, res) => {
    // Delete supply from database
};

module.exports = {
    getAllSupplies,
    getSupplyByName,
    createSupply,
    updateSupply,
    deleteSupply
};