import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    gap: 16
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginRight: 8
  },
  selectedIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue'
  }
});
