import ToastContainer from "react-native-root-toast";
import { useToastStore } from "../../shared/store/useToastStore";
import { useEffect, useState } from "react";
import typeToastColors from "./typeToastColors";

export const Toast = () => {
  const [visible, setVisible] = useState(false);
  const message = useToastStore((state) => state.text);
  const setMessage = useToastStore((state) => state.setMessage);

  const toastColor = message?.type ? typeToastColors[message.type] : undefined;

  useEffect(() => {
    if (message) {
      setVisible(true);

      setTimeout(() => {
        setMessage(undefined);
      }, ToastContainer.durations.LONG);
    } else {
      setVisible(false);
    }
  }, [message]);

  return (
    <ToastContainer
      visible={visible}
      position={50}
      backgroundColor={toastColor?.backgroundColor}
      textColor={toastColor?.textColor}
      opacity={1}
    >
      {message?.text}
    </ToastContainer>
  );
};
