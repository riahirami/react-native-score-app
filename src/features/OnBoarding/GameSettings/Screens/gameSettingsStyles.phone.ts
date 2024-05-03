import { colors } from '../../../../utils/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
  scrollViewContainer: {
    flex: 1
  },
  container: {},
  modalContainer: {
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    padding: 8,
    zIndex: 9999,
    gap: 16,
    marginHorizontal: 16
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    position: 'relative',
    top: 10,
    marginBottom: 16
  },
  formContainer: {
    flex: 1,
    gap: 16
  },
  playerNameContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 5
  },
  radioButtonContainer: {
    alignItems: 'flex-start',
    gap: 8
  },
  switchContainer: { flexDirection: 'row', alignItems: 'center' },
  formLabelStyle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
