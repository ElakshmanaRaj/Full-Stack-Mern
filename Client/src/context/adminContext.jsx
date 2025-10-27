import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../utilis/apiPath";

export const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  const fetchAdminProfile = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(BASE_URL + API_PATHS.ADMIN.ADMIN_GET_PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(res.data.admin);
    } catch (err) {
      console.error("Failed to fetch admin profile", err);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);


  return <AdminContext.Provider value={{admin, setAdmin, loading}}>{children}</AdminContext.Provider>;
};

export default AdminProvider;
