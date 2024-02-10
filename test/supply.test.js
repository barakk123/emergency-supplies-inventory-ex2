const request = require('supertest');
const emergencySupplier = require("../repository/emergencySupplierRep");
const app = require('../index'); 

const ServerError = require('../errors/ServerError');

jest.mock("../repository/emergencySupplierRep");

describe('Supplies API Endpoints', () => {
  describe('GET /supplies', () => {
    it('returns all supplies', async () => {
      const mockSupplies = [{ supply_name: 'Water', category: 'Core', unit_price: 2.80, supplier: "Sami", location: "Israel", quantity: 100 }, { supply_name: 'Bandage', category: 'Medic', unit_price: 3.80, supplier: "Shimi", location: "Israel", quantity: 10 }];
      emergencySupplier.getAllSupplies.mockResolvedValue(mockSupplies);
      const response = await request(app).get('/supplies');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockSupplies);
      expect(emergencySupplier.getAllSupplies).toHaveBeenCalledTimes(1);
    });

    it('returns 404 when no supplies are found', async () => {
      emergencySupplier.getAllSupplies.mockResolvedValue([]);
      const response = await request(app).get('/supplies');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('No supplies found.');
    });

    it('returns 500 when an error occurs', async () => {
      emergencySupplier.getAllSupplies.mockRejectedValue(new ServerError());
      const response = await request(app).get('/supplies');
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Internal Server Error'); 
    });
  });

  describe('GET /supplies/:supplyName', () => {
    it('returns a supply by supplyName', async () => {
      const mockSupply = { supply_name: 'Water', category: 'Core', unit_price: 2.80, supplier: "Sami", location: "Israel", quantity: 100 };
      emergencySupplier.getSupplyByName.mockResolvedValue(mockSupply);
      const response = await request(app).get('/supplies/Water');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockSupply);
      expect(emergencySupplier.getSupplyByName).toHaveBeenCalledWith('Water');
    });

    it('returns 404 if the supply not found', async () => {
      emergencySupplier.getSupplyByName.mockResolvedValue(null);
      const response = await request(app).get('/supplies/Water');
      expect(response.statusCode).toBe(404);
      expect(response.text).toBe('Supply not found');
    });

    it('returns 400 if supplyName is not provided', async () => {
      const response = await request(app).get('/supplies/');
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Supply name is required');
    });

    it('returns 500 when an error occurs', async () => {
      emergencySupplier.getSupplyByName.mockRejectedValue(new ServerError());
      const response = await request(app).get('/supplies/Water');
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('POST /supplies', () => {
    it('creates a new supply', async () => {
      const mockSupply = { supply_name: 'Water', category: 'Core', unit_price: 2.80, supplier: "Sami", location: "Israel", quantity: 100 };
      emergencySupplier.getSupplyByName.mockResolvedValue(null); 
      emergencySupplier.createSupply.mockResolvedValue(mockSupply); 
            
      const response = await request(app).post('/supplies').send(mockSupply);
            
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(mockSupply);
      expect(emergencySupplier.getSupplyByName).toHaveBeenCalledWith(mockSupply.supply_name);
      expect(emergencySupplier.createSupply).toHaveBeenCalledWith(mockSupply);
      expect(emergencySupplier.createSupply).toHaveBeenCalledTimes(1);
    });

    it('returns 400 if supply info is not provided', async () => {
      const response = await request(app).post('/supplies').send({});
      expect(response.statusCode).toBe(400);
      expect(response.text).toBe('Missing data, make sure you fill all the required fields.');
    });

    it('returns 409 if conflict on supplyName', async () => {
      const mockSupply = { supply_name: 'Water', category: 'Core', unit_price: 2.80, supplier: "Sami", location: 'Israel', quantity: 100 };
      emergencySupplier.getSupplyByName.mockResolvedValue(mockSupply);
      const response = await request(app).post('/supplies').send(mockSupply);
      expect(response.statusCode).toBe(409);
      expect(response.text).toBe('A supply with this name already exists.'); 
    });

    it('returns 500 when an error occurs', async () => {
      const mockSupply = { supply_name: 'Water', category: 'Core', unit_price: 2.80, supplier: "Sami", location: 'Israel', quantity: 100 };
      emergencySupplier.getSupplyByName.mockRejectedValue(new ServerError());
      const response = await request(app).post('/supplies').send(mockSupply);
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  describe('PUT /supplies/:supplyName', () => {
    it('updates a supply', async () => {
      const originalSupply = { supply_name: 'Water', category: 'Core', unit_price: 2.80, supplier: "Sami", location: 'Israel', quantity: 100 };
      const updatedSupplyData = { supply_name: 'Water', unit_price: 22.80, supplier: "Sami2", location: 'Israel2', quantity: 1002 };
      emergencySupplier.getSupplyByName.mockResolvedValue(originalSupply);
      emergencySupplier.updateSupply.mockResolvedValue({ ...originalSupply, ...updatedSupplyData });
            
      const response = await request(app).put(`/supplies/${originalSupply.supply_name}`).send(updatedSupplyData);
            
      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject(updatedSupplyData);
      expect(emergencySupplier.updateSupply).toHaveBeenCalledWith(originalSupply.supply_name, updatedSupplyData);
      expect(emergencySupplier.updateSupply).toHaveBeenCalledTimes(1);
    });

    it('returns 400 if supply invalid data', async () => {
      const invalidData = {};
      const response = await request(app).put('/supplies/Water').send(invalidData);
      expect(response.statusCode).toBe(400);
      expect(response.text).toContain('Incomplete data for update.');
    });

    it('returns 409 if conflict on supplyName', async () => {
      const existingSupply = { supply_name: 'ExistingWater', category: 'Core', unit_price: 2.80, supplier: "Sami", location: "Israel", quantity: 100 };
      const supplyToUpdate = { supply_name: 'ToBeUpdatedWater', category: 'Medical', unit_price: 3.50, supplier: "Danny", location: "USA", quantity: 50 };
        
      emergencySupplier.createSupply.mockResolvedValue(existingSupply);
      emergencySupplier.createSupply.mockResolvedValue(supplyToUpdate);
        

      const response = await request(app).put(`/supplies/${supplyToUpdate.supply_name}`).send(existingSupply);
      
      await expect(response.statusCode).toBe(409);
      await expect(response.text).toContain('Supply with the updated name already exists.');
    });

    it('returns 404 if supply not found', async () => {
      const nonExistingSupplyName = 'NonExistingWater';
      const updateData = { supply_name: 'NonExistingWaterUpdated', category: 'Core', unit_price: 2.80, supplier: "Sami", location: "Israel" };
        
      emergencySupplier.getSupplyByName.mockResolvedValue(null); 
      emergencySupplier.updateSupply.mockResolvedValue(null); 
        
      const response = await request(app).put(`/supplies/${nonExistingSupplyName}`).send(updateData);
        
      expect(response.statusCode).toBe(404);
      expect(response.text).toContain('Supply to update not found.');
    });      

    it('returns 500 when an error occurs', async () => {
      emergencySupplier.getAllSupplies.mockRejectedValue(new ServerError());
      const response = await request(app).get('/supplies');
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
      
  });

  describe('DELETE /supplies/:supplyName', () => {
    it('deletes a supply', async () => {
      const supplyNameToDelete = 'Water';
      emergencySupplier.deleteSupply.mockResolvedValue({ supply_name: supplyNameToDelete });
        
      const response = await request(app).delete(`/supplies/${supplyNameToDelete}`);
        
      expect(response.statusCode).toBe(204); 
      expect(emergencySupplier.deleteSupply).toHaveBeenCalledWith(supplyNameToDelete);
    });

    it('returns 404 if supply not found', async () => {
      const nonExistingSupplyName = 'NonExistingWater';
      emergencySupplier.deleteSupply.mockResolvedValue(null);
        
      const response = await request(app).delete(`/supplies/${nonExistingSupplyName}`);
        
      expect(response.statusCode).toBe(404);
      expect(response.text).toContain('Supply to delete not found');
      expect(emergencySupplier.deleteSupply).toHaveBeenCalledWith(nonExistingSupplyName);
    });

    it('returns 500 when an error occurs', async () => {
      const supplyNameWithError = 'ErrorSupply';
      emergencySupplier.deleteSupply.mockRejectedValue(new ServerError());
        
      const response = await request(app).delete(`/supplies/${supplyNameWithError}`);
        
      expect(response.statusCode).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
      expect(emergencySupplier.deleteSupply).toHaveBeenCalledWith(supplyNameWithError);
    });
  });
});
