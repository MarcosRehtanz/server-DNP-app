'use strict'
const { Router } = require('express');
const Auth0Controller = require('../controllers/authorization.controller.js')

const EventController = require('../controllers/event.controller.js');
const eventRoute = Router();

/**
 *  @swagger
 *  components:
 *      schemas:
 *          Event:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *                  - date
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  date:
 *                      type: integer  
 */

/**
 *  @swagger
 *  '/event':
 *  get:
 *      tags:
 *      - Events
 *      summary: Get all events
 *      responses:
 *          200:
 *              description: Fetched Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/chemas/Event'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
eventRoute.get('/', EventController.getAll);
/**
 *  @swagger
 *  '/event/{id}':
 *  get:
 *      summary: Get event by Id
 *      tags:
 *          - Events
 *      parameters:
 *        - in: path
 *          name: id
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
 *                          $ref: '#/components/schemas/Event'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
eventRoute.get('/:id', EventController.getById);
/**
 *  @swagger
 *  '/event/{id}':
 *  delete:
 *      summary: Delete an event
 *      tags:
 *          - Events
 *      parameters:
 *        - in: path
 *          name: id
 *          require: true
 *          schema:
 *              type: integer 
 *              format: int64
 *        - in: header
 *          name: Authentication
 *          description: Send the token of your user
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *          200:
 *              description: Delete Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
eventRoute.delete('/:id', Auth0Controller.validateRoll, EventController.disable);
/**
 *  @swagger
 *  '/event':
 *  post:
 *      summary: Register a new event
 *      description: Return a new event created
 *      tags:
 *          - Events
 *      parameters:
 *        - in: header
 *          name: Authentication
 *          description: Send the token of your user
 *          schema:
 *            type: string
 *          required: true
 *      requestBody:
 *          description: Register a new event in the app
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          200:
 *              description: Register Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
eventRoute.post('/', Auth0Controller.validateRoll, EventController.post);
/**
 *  @swagger
 *  '/event/{id}':
 *  put:
 *      summary: Update an event
 *      tags:
 *          - Events
 *      parameters:
 *        - in: path
 *          name: id
 *          require: true
 *          schema:
 *              type: integer 
 *              format: int64
 *        - in: header
 *          name: Authentication
 *          description: Send the token of your user
 *          schema:
 *            type: string
 *          required: true
 *      requestBody:
 *          description: Update the information of an event in the app
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 *      responses:
 *          200:
 *              description: Update Successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          500:
 *              description: Server Error
 */
eventRoute.put('/:id', Auth0Controller.validateRoll, EventController.update)

module.exports = eventRoute;