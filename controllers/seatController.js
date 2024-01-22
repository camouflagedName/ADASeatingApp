import SeatModel from "../models/SeatModel.js";
import clientPromise from "../db/mongoDB.js";
//import WebSocket from ''
import { webSocketServer } from "../server.js";

/**
 * Interface representing the structure of the request body for updating a seat.
 * @typedef {Object} UpdateSeatRequestBody
 * @property {string[]} seatID - An array of seat IDs to be updated.
 * @property {string} assignedTo - The entity to which the seats are assigned.
 * @property {boolean} available - A boolean indicating seat availability.
 */


const client = await clientPromise;
const model = new SeatModel(client);

export async function getAvailableSeats(_, res) {
    try {
        const result = await model.getAvailableSeatsForEvent();
        if (result) {
            return res.json(result);
        } else {
            console.log("No seats could be found.")
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

/**
 * Update a seat.
 *
 * @param {import('express').Request} req - The Express request object.
 *   @property {string} params.seatID - The ID of the seat to be updated.
 *
 * @param {import('express').Response} res - The Express response object.
 */
export async function updateSeat(req, res) {
    const { seatID } = req.params

    /**
     * @type {UpdateSeatRequestBody}
     */
    const body = req.body;
    const { seatID: _, available, assignedTo } = body;
    const updates = { available: available, assignedTo: assignedTo}

    try {
        const success = await model.updateSeat(seatID, updates);

        // TODO: fix success and error logic

        if (success) {
            webSocketServer.emit('seat updated', { seatID, updates })

        }
        res.json(success)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

/**
 * Update multiple seats.
 *
 * @param {import('express').Request} req - The Express request object.
 *
 * @param {import('express').Response} res - The Express response object.
 *   @property {function} json - A function to send a JSON response.
 *   @property {function} status - A function to set the HTTP response status.
 */
export async function updateMultipleSeats(req, res) {
    /**
     * @type {UpdateSeatRequestBody}
     */
    const body = req.body;
    const { seatID, available, assignedTo } = body;
    const updates = { available: available, assignedTo: assignedTo}

    try {
        const success = await model.updateMultipleSeats(seatID, updates);

        // TODO: fix success and error logic

        if (success) {
            webSocketServer.emit('seats updated', { seatID, updates })

        }
        res.json(success)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export async function addSeat(req, res) {
    const seatData = req.body;
    try {
        res = await model.addSeat(seatData)
        res.json(res);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
}