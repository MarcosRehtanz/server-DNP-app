const { Router } = require('express');

const UserController = require('../controllers/user.controller.js');
const UserRoute = Router();

/**
 *  @swagger
 *  components:
 *      schemas:
 *          Login:
 *            type: object
 *            required:
 *                - email
 *                - password
 *            properties:
 *              email:
 *                  type: string 
 *                  example: jhon.smith@kheiron.tech
 *              password:
 *                  type: string 
 *                  example: p4$$w0rd
 *          User:
 *            type: object
 *            required:
 *                - name
 *                - surname
 *                - email
 *                - dob
 *                - rol
 *            properties:
 *              userId:
 *                  type: integer
 *                  format: int64
 *                  example: 10
 *              name:
 *                type: string
 *                example: John
 *              surname:
 *                type: string
 *                example: Smith
 *              email:
 *                  type: string 
 *                  example: jhon.smith@kheiron.tech
 *              dob:
 *                  type: integer
 *                  example: 186879632 
 *              rol:
 *                type: string
 *                description: 
 *                example: admin
 *                enum:
 *                  - user
 *                  - editor
 *                  - admin
 *                  - super
 *              image:
 *                  type: string
 */

/**
 *  @swagger
 *  '/user':
 *  get:
 *      tags:
 *      - Users
 *      summary: Get all users
 *      responses:
 *          200:
 *              description: Fetched Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
UserRoute.get('/', UserController.getAll);
/**
 *  @swagger
 *  '/user/{id}':
 *  get:
 *      summary: Get user by Id
 *      tags:
 *          - Users
 *      parameters:
 *        - name: id
 *          in: path
 *          require: true
 *          schema:
 *              type: integer 
 *              format: int64
 *      responses:
 *          200:
 *              description: Fetched Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
UserRoute.get('/:id', UserController.getById);
/**
 *  @swagger
 *  '/user/{id}':
 *  delete:
 *      summary: Delete an user
 *      tags:
 *          - Users
 *      parameters:
 *        - name: id
 *          in: path
 *          require: true
 *          schema:
 *              type: integer 
 *              format: int64
 *      responses:
 *          200:
 *              description: Delete Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
UserRoute.delete('/:id', UserController.disable);
/**
 *  @swagger
 *  '/user/{id}':
 *  put:
 *      summary: Update an user
 *      tags:
 *          - Users
 *      parameters:
 *        - name: id
 *          in: path
 *          require: true
 *          schema:
 *              type: integer 
 *              format: int64
 *      requestBody:
 *          description: Update the information of an user in the app
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Update Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
UserRoute.put('/:id', UserController.update)

/**
 *  @swagger
 *  '/user/signup':
 *  post:
 *      summary: Register a new user
 *      tags:
 *          - Users
 *      requestBody:
 *          description: Register a new user in the app
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Register Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
UserRoute.post('/signup', UserController.post);
/**
 *  @swagger
 *  '/user/login':
 *  post:
 *      summary: Login
 *      description: Return user with those token
 *      tags:
 *          - Users
 *      requestBody:
 *          description: Register a new user in the app
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: Login Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                              user:
 *                                  $ref: '#/components/schemas/User'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
UserRoute.post('/login', UserController.logIn);

module.exports = UserRoute;