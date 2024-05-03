import { colors } from '_utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  gameDetailsContainer: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    textAlign: 'center',
    backgroundColor: colors.PRIMARY,
    padding: 10,
    paddingBottom: 22,
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopWidth: 0,
    marginBottom: 16,
    paddingTop: 20
  },
  gameDetailsText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.WHITE
  },
  inlineTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 24,
    paddingRight: 24
  },
  gameTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 12
  }
});
