const request = require('supertest');
const app = require('../index'); 
const { connectDB } = require('../db/mongoDB'); 
const emergencySupplier = require("../repository/emergencySupplierRep");
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

jest.mock("../repository/emergencySupplierRep");
beforeAll(async () => {
    await connectDB();
});

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
    });

    it('returns 400 if supply info is not provided', async () => {
    });

    it('returns 409 if conflict on supplyName', async () => {
    });

    it('returns 500 when an error occurs', async () => {
    });
  });

  describe('PUT /supplies/:supplyName', () => {
    it('updates a supply', async () => {
    });

    it('returns 400 if supplyName is not provided or if supply invalid data', async () => {
    });

    it('returns 409 if conflict on supplyName', async () => {
    });

    it('returns 404 if supply not found', async () => {
    });

    it('returns 500 when an error occurs', async () => {
    });
  });

  describe('DELETE /supplies/:supplyName', () => {
    it('deletes a supply', async () => {
    });

    it('returns 404 if supply not found', async () => {
    });

    it('returns 500 when an error occurs', async () => {
    });
  });
});
