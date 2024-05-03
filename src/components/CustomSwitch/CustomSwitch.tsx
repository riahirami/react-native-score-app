import React from 'react';
import { Switch } from 'react-native';

import { colors } from '../../utils/colors';

interface CustomSwitchProps {
  isEnabled: boolean;
  onPress: () => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ isEnabled, onPress }) => {
  return (
    <Switch
      trackColor={{ false: null, true: colors.PRIMARY }}
      thumbColor={colors.SWITCH_THUMB_COLOR}
      onValueChange={onPress}
      value={isEnabled}
    />
  );
};

export default CustomSwitch;
