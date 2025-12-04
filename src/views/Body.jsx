import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";
import Wrapper from "../components/Wrapper";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../store/slices/userSlice";
import { auth } from "../utils/firebase";

const Body = () => {
  const isSideBar = useSelector((state) => state.sidebar.isSidebarOpen);
  const location = useLocation();
  const isWatchRoute = location.pathname === "/watch";
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid: uid, firstName: displayName, email: email }));
        console.log("login success");
      } else {
        dispatch(removeUser());
        console.log("login failed");
      }
    });
    return unsub;
  }, [dispatch]);

  return (
    <Wrapper>
      <div className="">
        <Header />
        <div className="flex gap-2">
          {isSideBar && <Sidebar isWatchRoute={isWatchRoute} />}
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};

export default Body;
