import { StyleSheet } from 'react-native';

import { colors } from '../../utils/colors';

export const customInputStyles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 24,
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    borderWidth: 0.4,
    borderRadius: 10,
    padding: 12,
    color: colors.BLACK
  },
  errorMessage: {
    color: colors.INPUT_ERROR,
    fontSize: 12,
    lineHeight: 18
  },
  label: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 6
  },
  errorIcon: {
    tintColor: colors.INPUT_ERROR
  },
  iconContainer: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-end'
  },
  unitText: {
    fontSize: 14,
    color: colors.BLACK
  },
  contentContainer: { flex: 6 },
  bottomBordless: {
    borderBottomWidth: 0
  },
  topBordless: {
    borderTopWidth: 0
  },
  withoutPaddingRight: {
    paddingRight: 0
  },
  validIcon: {
    tintColor: colors.SUCCESS
  },
  rightIcon: {
    marginRight: 12
  }
});
