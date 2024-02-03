const fs = require('fs/promises');
const { NotFoundError } = require('../errors/errors');
const path = require('../data-base.json');

const getAllSupplies = async () => {
    const data = await fs.readFile(path, "utf8");
    return await JSON.parse(data);
};

const getSupplyByName = async supplyName => {
    const supplies = await getAllSupplies();
    const supply = supplies.find(supply => supply.supply_name === supplyName);
    return supply;
};

const createSupply = async supply => {
    const supplies = await getAllSupplies();
    const newSupply = new EmergencySupplierSession(
        supply.supply_name,
        supply.category,
        supply.unit_price,
        supply.quantity,
        supply.expiration_date,
        supply.supplier,
        supply.location
    );
    supplies.push(newSupply);
    await saveSupplies(supplies);
    return newSupply;
};

const updateSupply = async (supplyName, updatedSupply) => {
    const supplies = await getAllSupplies();
    const index = supplies.findIndex(supply => supply.supply_name === supplyName);
    if (index !== -1) {
        supplies[index] = {supplyName, ...updatedSupply};
        await saveSupplies(supplies);
        return supplies[index];
    }
    throw new NotFoundError(`Supply with name ${supplyName} not found`);
};

const deleteSupply = async supplyName => {
    const supplies = await getAllSupplies();
    const index = supplies.findIndex(supply => supply.supply_name === supplyName);
    if (index!== -1) {
        const deletedSupply = supplies.splice(index, 1)[0];
        await saveSupplies(supplies);
        return deletedSupply;
    }
    throw new NotFoundError(`Supply with name ${supplyName} not found`);
};

const saveSupplies = async supplies => {
    const data = JSON.stringify(supplies);
    await fs.writeFile(path, data);
};

module.exports = {
    getAllSupplies,
    getSupplyByName,
    createSupply,
    updateSupply,
    deleteSupply,
    saveSupplies
};
