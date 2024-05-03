import { StyleSheet } from 'react-native';

import { colors } from '../../utils/colors';
import { DEFAULT_SPACING } from '../../utils/dimensions';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: DEFAULT_SPACING / 2,
    alignItems: 'center'
  },
  selectedButtonContainer: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    backgroundColor: 'transparent',
    height: 22,
    borderRadius: 12,
    width: 22,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    backgroundColor: colors.PRIMARY,
    height: 13,
    width: 13,
    borderRadius: 6,
    padding: 2
  },
  unselectedButtonContainer: {
    borderWidth: 2,
    borderColor: colors.BLACK,
    backgroundColor: 'transparent',
    height: 24,
    borderRadius: 12,
    width: 24,
    padding: 2
  },
  labelText: {
    fontSize: 16,
    fontWeight: '400'
  }
});
