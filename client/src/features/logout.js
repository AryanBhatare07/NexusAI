import api from "../../utils/axios";

async function logout() {
  try {
    const { data } = await api.get("/api/auth/logout");
  } catch (error) {
    console.log(error);
  }
}

export default logout;
