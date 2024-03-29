import axios from "axios";
import API_ROOT from "./apiRoot";
import { IEventData } from "../interfaces/creatorInterfaces";
import handleAPIErrors from "../utils/handleAPIErrors";

const baseURL = API_ROOT + 'eventAPI'

export const getEvent = async (query?: { [key: string]: string | boolean | object }) => {
    let url = `${baseURL}/events`;
    if (query) url = url + `?${query}`;

    try {
        const eventList = await axios.get(url);

        if (eventList && eventList.data) return eventList.data;
        else throw new Error('No data received from eventAPI');

    } catch (err) {
        handleAPIErrors(err, "getEvent", url)
    }
}
export const addEvent = async (data: IEventData) => {
    const url = `${baseURL}/addEvent`;

    try {
        const res = await axios({
            method: "post",
            url: url,
            data: data,
        });

        return res;
    } catch (err) {
        handleAPIErrors(err, "addEvent", url)
    }
}



export const getEventSeatIDs = async (data: object) => {
    const url = `${baseURL}/getEventSeatsIDs`;

    try {
        const eventSeatList = await axios.put(url, data);
        console.log(eventSeatList.data)
        if (eventSeatList && eventSeatList.data) return eventSeatList.data[0].seats;
        else throw new Error('No data received from seatAPI');

    } catch (err) {
        handleAPIErrors(err, "getEventSeats", url);
    }
}
