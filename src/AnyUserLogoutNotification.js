import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetail, handleLogoutUser, handleUpdateUser } from "./redux/auth/slice";
import { showErrorNotification, showInfoNotification, showSuccessNotification } from "./pages/notification/index";
import { logoutLoggedInUserAsync } from "./redux/auth";

const AnyUserLogoutNotification = () => {
  const { user } = useSelector(getAllUserDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3008/api/events");
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.listen === "logout") {
        if (data?.user === user?.id) {
          showSuccessNotification(data?.message);
          dispatch(
            logoutLoggedInUserAsync({
              data: { id: data?.user },
              callback: handleLogout,
            })
          );
        }
      }
      if (data?.listen === 'updateAccess') {
        showInfoNotification(data?.message);
        dispatch(handleUpdateUser({ access: data?.user }));
      }
    };
    eventSource.onerror = (event) => {
      console.error("EventSource error:", event);
      showErrorNotification("An error occurred while connecting to the server.");
    };;
    return () => {
      eventSource.close();
    };
  }, [dispatch, user]);

  const handleLogout = (success) => {
    if (success) {
      dispatch(handleLogoutUser());
    }
  };
};

export default AnyUserLogoutNotification;
