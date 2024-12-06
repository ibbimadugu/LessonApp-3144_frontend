// orderService.js
import apiClient from "../api/apiClient";

export const submitOrder = async (order) => {
  try {
    const response = await apiClient.post("/orders", order);
    return response;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
};
