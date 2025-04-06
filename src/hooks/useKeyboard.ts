import {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';

export default function useKeyboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const eventNameShowKeyboard =
    Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
  const eventNameHideKeyboard =
    Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
  useEffect(() => {
    const keyboardShowListner = Keyboard.addListener(
      eventNameShowKeyboard,
      event => {
        setIsOpen(true);
        setKeyboardHeight(event.endCoordinates.height);
      },
    );
    const keyboardHideListener = Keyboard.addListener(
      eventNameHideKeyboard,
      event => {
        setIsOpen(false);
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardShowListner.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return {
    isOpen,
    keyboardHeight,
  };
}
