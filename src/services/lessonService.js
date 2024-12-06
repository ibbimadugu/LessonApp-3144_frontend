// lessonService.js
import apiClient from "../api/apiClient";

export const fetchLessons = async () => {
  try {
    const lessons = await apiClient.get("/lessons");
    return lessons; // Return lessons data
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
};
