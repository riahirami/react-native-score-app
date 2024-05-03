import { colors } from '_utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  gameResultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 16,
    bottom: 0,
    position: 'absolute',
    backgroundColor: colors.PRIMARY,
    height: 50,
    width: '100%'
  },
  scoreText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold'
  },
  emptyContainer: { flex: 1 }
});
