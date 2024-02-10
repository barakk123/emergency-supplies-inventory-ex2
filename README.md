# Emergency Supply Management System

A comprehensive Node.js API designed for the efficient management of emergency supplies. Utilizing Express for server-side logic and MongoDB for database management, this system supports robust CRUD operations for emergency supply data, ensuring a highly responsive and reliable platform for crisis management scenarios.

## Getting Started

This guide will help you set up the Emergency Supply Management System on your local machine for development and testing purposes.

### Prerequisites

- Node.js (version 14 or newer)
- npm (version 6 or newer)
- MongoDB (version 4.4 or newer)

### Installation

1. Clone the repository:
`git clone https://github.com/barakk123/emergency-supplies-inventory-ex2.git`
2. Navigate to the project directory:
`cd emergency-supplies-inventory-ex2`
3. Install dependencies:
`npm install`
4. Start the server:
`npm start`

The server will start, and the API will be accessible at `http://localhost:3000/supplies`.
Check [suppliesRouter.js](/router/suppliesRouter.js) file for any clarifications.

## Usage

The API supports various endpoints for managing emergency supplies.
For detailed information on how to use these endpoints, refer to the comprehensive API documentation available on Postman.

[API Documentation](https://documenter.getpostman.com/view/32179347/2sA2r3YQxh)

*Note: A very basic and simple UI is created for basic functions. Just open [Index.html](index.html) in your browser. Ensure [scripts.js](scripts.js) and [styles.css](styles.css) files are included in your root directory.

## Tests

To ensure the reliability of the system, run automated tests with the command:
`npm test`

Note: Currently, one test related to `supplyName` validation is not passing and returns a 500 status code instead of 400. All other 18 tests should pass.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Acknowledgments

- As a Software Engineering student at The Department of Software Engineering, Shenkar - This is the second exercise in the Web Services course.
- This exercise was challenging but provided valuable learning experiences, particularly regarding Express and MongoDB.

---

Thank you for reading this and for checking out my mini project.

Barak Daniel (c) 2024
