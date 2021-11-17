import { useCallback, useState } from "react";

const useAlert = (setLoading) => {
  const [alert, setAlert] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  //? useCallback is used to avoid the recreation of the custom hook since setLoading is a function and it is recreated every time the component in which resides re-render.
  const showAlert = useCallback(
    (message, variant) => {
      setAlertMessage(message);
      setAlert(variant);
      setLoading(false);
    },
    [setLoading]
  );

  const closeAlert = useCallback(() => {
    setAlert("");
    setAlertMessage("");
  }, []);

  return {
    alert,
    alertMessage,
    showAlert,
    closeAlert,
  };
};

export default useAlert;
