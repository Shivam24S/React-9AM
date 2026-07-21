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

export async function addStudent(studentData) {
  try {
    const res = await axios.post(`${BASE_URL}/`, studentData);

    if (res.status !== 201) {
      throw new Error("failed to add student data");
    }

    console.log("data", res.data);

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteStudent(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);

    if (res.status !== 200) {
      throw new Error("failed to delete student");
    }

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
