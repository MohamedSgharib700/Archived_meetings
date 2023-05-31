// TODO::make the documntation after handl upload videos in s3

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The video ID.
 *           example: 1
 *         description:
 *           type: string
 *           description: The video's description.
 *           example: video1
 *         url:
 *           type: string
 *           description: The video's url.
 *           example: video1.mp4
 *         createdAt:
 *           type: date
 *           description: The video's createdAt.
 *           example: 2023-03-13T15:06:15.285Z
 *         updatedAt:
 *           type: date
 *           description: The video's updatedAt.
 *           example: 2023-03-13T15:06:15.285Z
 *         categories:
 *           type: array
 *           description: The categories of id.
 *           items:
 *              $ref: '#/components/schemas/Category'
 */
