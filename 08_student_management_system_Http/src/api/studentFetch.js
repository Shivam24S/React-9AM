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

export async function addStudent(studentData) {
  try {
    const res = await fetch(`${BASE_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!res.ok) {
      throw new Error("failed to add student data");
    }

    const data = await res.json();

    console.log("data");

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
