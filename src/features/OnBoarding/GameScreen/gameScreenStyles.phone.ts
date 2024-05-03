import { colors } from '_utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeAreaContainer: { flex: 1, backgroundColor: colors.WHITE },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.WHITE
  },
  playerNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 80,
    paddingVertical: 16
  },
  textfieldStyle: {
    width: 155,
    justifyContent: 'center'
  },

  validIcon: {
    borderWidth: 3,
    borderRadius: 50,
    borderColor: colors.WHITE,
    width: 28,
    height: 28
  },
  gameActionContainer: {
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16
  },
  divider: { height: 1, backgroundColor: colors.GRAY, marginVertical: 16 }
});
