import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './customRadioButtonStyles';

interface CustomRadioButtonProps {
  isSelected: boolean;
  title: string;
  onPress: () => void;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  isSelected,
  title,
  onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {isSelected ? (
        <View style={styles.selectedButtonContainer}>
          <View style={styles.selectedButton} />
        </View>
      ) : (
        <View style={styles.unselectedButtonContainer} />
      )}
      <Text style={styles.labelText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;
