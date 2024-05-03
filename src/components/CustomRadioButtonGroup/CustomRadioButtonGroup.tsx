import React from 'react';
import { View } from 'react-native';
import styles from './customRadioButtonGroupStyles.phone';
import CustomRadioButton from '../../components/CustomRadioButton/CustomRadioButton';
interface RadioButton {
  id: string;
  label: string;
  value: string;
}
interface CustomRadioButtonGroupProps {
  options: RadioButton[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const CustomRadioButtonGroup: React.FC<CustomRadioButtonGroupProps> = ({
  options,
  selectedId,
  onSelect
}) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <CustomRadioButton
          title={option.label}
          isSelected={selectedId === option.id}
          onPress={() => onSelect(option.id)}
        />
      ))}
    </View>
  );
};

export default CustomRadioButtonGroup;
