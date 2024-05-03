import { colors } from '_utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center'
  },
  imageStyle: {
    width: 198,
    height: 330
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16
  },
  buttonContent: { alignSelf: 'center' }
});
