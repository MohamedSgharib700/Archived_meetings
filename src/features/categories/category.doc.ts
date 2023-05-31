/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The category ID.
 *           example: 1
 *         name:
 *           type: string
 *           description: The category's name.
 *           example: category1
 *         createdAt:
 *           type: date
 *           description: The category's createdAt.
 *           example: 2023-03-13T15:06:15.285Z
 *         updatedAt:
 *           type: date
 *           description: The category's updatedAt.
 *           example: 2023-03-13T15:06:15.285Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryVideo:
 *       type: object
 *       properties:
 *         CategoryId:
 *           type: number
 *           description: The category id is refrance for id in categories table.
 *           example: 1
 *         VideoId:
 *           type: number
 *           description: The video id is refrance for id in videos table.
 *           example: 2
 *         createdAt:
 *           type: date
 *           description: The video's createdAt.
 *           example: 2023-03-13T15:06:15.285Z
 *         updatedAt:
 *           type: date
 *           description: The video's updatedAt.
 *           example: 2023-03-13T15:06:15.285Z
 */

/**
 * @swagger
 * /categories:
 *     get:
 *       summary: GetAll
 *       tags:
 *           - Category
 *       description: get all categories.
 *       properties:
 *           responseBody:
 *               type: string
 *               example: This is some example string! This is an endpoint
 *       responses:
 *           200:
 *               description: success
 *               content:
 *                  application/json:
 *                     schema:
 *                       type: object
 *                       properties:
 *                         status:
 *                           type: string
 *                           example: success
 *                         data:
 *                           type: object
 *                           properties:
 *                               categories:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Category'
 *
 *           404:
 *               description: Not found
 *           500:
 *               description: Internal server error
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create
 *     tags:
 *           - Category
 *     requestBody:
 *        required: true
 *        content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                     name:
 *                      type: newCategory
 *     description: Create a new category
 *
 *     responses:
 *       201:
 *         description: success
 *         content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: success
 *                    data:
 *                      type: object
 *                      properties:
 *                          category:
 *                              type: object
 *                              $ref: '#/components/schemas/Category'
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Show
 *     tags:
 *           - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to show it.
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: success
 *         content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: success
 *                    data:
 *                      type: object
 *                      properties:
 *                          category:
 *                              type: object
 *                              $ref: '#/components/schemas/Category'
 *       404:
 *          description: Not Found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update
 *     tags:
 *           - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to update.
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *        required: true
 *        content:
 *             application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                     name:
 *                      type: newCategory
 *     description: Update a new category
 *
 *
 *     responses:
 *       200:
 *         description: success
 *         content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: success
 *                    data:
 *                      type: object
 *                      properties:
 *                          category:
 *                              type: object
 *                              $ref: '#/components/schemas/Category'
 *       404:
 *          description: Not Found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete
 *     tags:
 *           - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to delete.
 *         schema:
 *           type: integer
 *
 *
 *     responses:
 *       200:
 *         description: success
 *         content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: success
 *                    data:
 *                      type: object
 *                      example: null
 *       404:
 *          description: Not Found
 *       500:
 *         description: Internal server error
 */
