import { colors } from '_utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  globalContainer: {},
  pendingRound: {
    backgroundColor: colors.THIRTY
  },
  roundScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 8
  },

  validIcon: {
    borderColor: colors.PRIMARY,
    width: 22,
    height: 22
  },
  removeIcon: {
    width: 22,
    height: 22
  },
  errorText: {
    width: 90,
    textAlign: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    color: 'darkred'
  },
  iconsContainer: {
    gap: 8,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
