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

export async function deleteStudent(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete student");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateStudent(id, studentData) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!res.ok) {
      throw new Error("failed to update student data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
