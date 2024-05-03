import { colors } from '_utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  globalContainer: {
    backgroundColor: colors.BLACK,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 998,
    elevation: 2,
    opacity: 0.8
  },
  exitAlertContainer: {
    padding: 16,
    borderWidth: 3,
    borderColor: colors.PRIMARY,
    marginHorizontal: 16,
    borderRadius: 12,
    gap: 16,
    position: 'absolute',
    top: '35%',
    right: 0,
    left: 0,
    backgroundColor: colors.WHITE,
    zIndex: 999,
    alignSelf: 'center'
  },
  exitAlertTitle: { fontSize: 20 },
  exitAlertText: { fontSize: 16 },
  exitAlertButtonContainer: {
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
