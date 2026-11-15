import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import getCurrentUser from "./features/getCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/userSlice";

function App() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();
        dispatch(setUserData(data));
      } catch (error) {
        dispatch(setUserData(null));
      } finally {
        setLoading(false);
      }
    };

    if (window.location.pathname === "/" && !userData) {
      setLoading(false);
      return;
    }
    getUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0d0f14]">
        <div className="text-indigo-400 text-lg font-semibold">NexusAI</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={userData ? <Navigate to="/chat" replace /> : <Landing />}
        />
        <Route
          path="/login"
          element={userData ? <Navigate to="/chat" replace /> : <Home />}
        />
        <Route
          path="/chat"
          element={userData ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
