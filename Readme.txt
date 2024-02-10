Emergency Supply Management System
==================================
A comprehensive Node.js API designed for the efficient management of emergency supplies.
Utilizing Express for server-side logic and MongoDB for database management, this system supports robust CRUD operations for emergency supply data, ensuring a highly responsive and reliable platform for crisis management scenarios.

Getting Started
---------------
This guide will help you set up the Emergency Supply Management System on your local machine for development and testing purposes.

Prerequisites
- Node.js (version 14 or newer)
- npm (version 6 or newer)
- MongoDB (version 4.4 or newer)

Installation
1. Clone the repository:
   git clone https://github.com/barakk123/emergency-supplies-inventory-ex2.git

2. Navigate to the project directory:
   cd emergency-supplies-inventory-ex2

3. Install dependencies:
   npm install

4. Start the server:
   npm start

   The server will start, and the API will be accessible at http://localhost:3000/supplies
   Check suppliesRouter.js file for any clarifications.

Usage
-----
The API supports various endpoints for managing emergency supplies.
For detailed information on how to use these endpoints, including expected inputs, outputs, and example requests and responses, refer to the comprehensive API documentation available on Postman.
Link >> https://documenter.getpostman.com/view/32179347/2sA2r3YQxh
*Note - You can use the very basic and simple UI created for basic functions just open `index.html` in your browser. Make sure scripts.js and styles.css files are included in your root dir.

Tests
-----
To ensure the reliability of the system, run automated tests with the following command:
   npm test
At the momment, one test is not passing, it's should return 400 if supplyName is not provided but returns 500.
All other 18 tests should pass.

Contributing
------------
Contributions to the Emergency Supply Management System are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

License
-------
This project is licensed under the MIT License, ensuring it's freely available for personal and commercial use.

Acknowledgments
---------------
- As a Software Engineer student at The Department of Software Engineering, Shenkar - This is the second exercise in the Web Services course.
- This exercise was challenging but I learned a lot especially about express and MongoDB

------------------------------------------------------------------------------------------------------------------------------------------------
Thank you for reading this and for checking out my mini project
------------------------------------------------------------------------------------------------------------------------------------------------
Barak Daniel (c) 2024