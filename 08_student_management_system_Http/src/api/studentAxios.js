import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getStudent() {
    try {
        const res = await axios(`${BASE_URL}/allList`);

        return res.data.studentList;
    } catch (error) {
        throw new Error(error.message);
    }
}


