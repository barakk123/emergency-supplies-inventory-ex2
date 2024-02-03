const request = require("supertest");
const app = require("../index");
const emergencySupplier = require("../repository/emergencySupplier");
const {BadRequestError, NotFoundError, ServerError} = require("../errors/errors");
const { describe } = require("yargs");
const { before, beforeEach } = require("node:test");

jest.mock("../reopository/emergencySupplier");

describe("GET /supplies", () => {
    beforeEach(() => jest.clearAllMocks());

    // SUCCESS - 200
    it("should return all supplies", async () => {
        // Arrange
        const mockSupplies = [
            {id: 1, name: "Supply 1"},
            {id: 2, name: "Supply 2"}
        ];
        emergencySupplier.getAllSupplies.mockResolvedValue(mockSupplies);

        // Act
        const res = await request(app).get("/supplies");

        // Assert
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockSupplies);
    });
    
    // FAILURE - 404
    it("should return 404 if no supplies found", async () => {
        // Arrange
        emergencySupplier.getAllSupplies.mockResolvedValue([]);

        const res = await request(app).get("/supplies");
        expect(res.statusCode).toEqual(404);
    });

    // FAILURE - 500
    it("should return 500 if an error occurs", async () => {
        emergencySupplier.getAllSupplies.mockRejectedValue(new ServerError("internal server error"));
    }); 
});