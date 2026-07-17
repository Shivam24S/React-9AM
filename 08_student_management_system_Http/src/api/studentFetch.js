const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getStudent() {
  try {
    const res = await fetch(`${BASE_URL}/allList`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error("failed to fetch student data");
    }

    return data.studentList;

    console.log("data", data);
  } catch (error) {
    throw new Error(error.message);
  }
}



