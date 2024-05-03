import CustomButton from '_components/CustomButton/CustomButton';
import React from 'react';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import styles from './customAlertPopupStyles.phone';
import { colors } from '_utils/colors';

interface CustomAlertPopupProps {
  handleAlertCloseAction: () => void;
  handleAlertConfirmAction: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const CustomAlertPopup: React.FC<CustomAlertPopupProps> = ({
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  handleAlertConfirmAction,
  handleAlertCloseAction
}) => {
  return (
    <>
      <View style={styles.globalContainer} />
      <View style={styles.exitAlertContainer}>
        <Text style={styles.exitAlertTitle}>{title}</Text>
        <Divider />
        <View>
          <Text style={styles.exitAlertText}>{message}</Text>
        </View>
        <View style={styles.exitAlertButtonContainer}>
          <CustomButton
            onPress={handleAlertCloseAction}
            title={cancelButtonText || 'Non'}
            buttonBackgroundColor={colors.PRIMARY}
            titleSize={16}
            buttonWidth={100}
          />
          <CustomButton
            onPress={handleAlertConfirmAction}
            title={confirmButtonText || 'Oui'}
            buttonBackgroundColor={colors.RED}
            titleSize={16}
            buttonWidth={100}
          />
        </View>
      </View>
    </>
  );
};

export default CustomAlertPopup;
