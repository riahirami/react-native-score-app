import { useState } from 'react';

export interface UseModalAlertReturnType {
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAlertOpen: () => void;
  handleAlertClose: () => void;
}

const useModalAlert = (): UseModalAlertReturnType => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAlertOpen = (): void => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = (): void => {
    setIsAlertOpen(false);
  };
  return { isAlertOpen, setIsAlertOpen, handleAlertOpen, handleAlertClose };
};

export default useModalAlert;
