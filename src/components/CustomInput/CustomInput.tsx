import React from 'react';
import {
  type KeyboardTypeOptions,
  Text,
  View,
  type ReturnKeyTypeOptions,
  type NativeSyntheticEvent,
  type TextInputSubmitEditingEventData,
  Image,
  type ImageSourcePropType,
  TouchableOpacity,
  TextInput,
  DimensionValue
} from 'react-native';

import { customInputStyles } from './customInputStyles';

import { colors } from '../../utils/colors';
import {
  CUSTOM_INPUT_DEFAULT_FONT_SIZE,
  CUSTOM_INPUT_DEFAULT_VERTICAL_PADDING
} from '../../utils/constants';
import { icons } from '../../utils/icons';

export interface CustomInputProps {
  value: string | undefined;
  placeholder?: string;
  width?: DimensionValue | undefined;
  textColor?: string;
  backgroundcolor?: string;
  fontSize?: number;
  onChangeText: (value: string | any) => void;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  textAlign?: 'left' | 'right' | 'center';
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  onBlurInput?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  disabled?: boolean;
  multiline?: boolean;
  textAlignVertical?: 'center' | 'auto' | 'bottom' | 'top' | undefined;
  label?: string;
  paddingVertical?: number;
  showSecureIcon?: boolean;
  withoutBottomBorder?: boolean;
  withoutTopBorder?: boolean;
  withoutPaddingRight?: boolean;
  toFocusOnNextInput?: boolean;
  showValidIcon?: boolean;
  onPressIn?: () => void;
  rightIcon?: ImageSourcePropType;
  leftIcon?: ImageSourcePropType;
  numberOfLines?: number;
  labelColor?: string;
  defaultValue?: string;
  height?: number;
  unit?: string;
  hasVerticalBorders?: boolean;
  editable?: boolean;
  onContainerPress?: () => void;
  onRightIconPress?: () => void;
}

const CustomInput = ({
  value,
  placeholder,
  width,
  fontSize,
  error,
  keyboardType,
  onChangeText,
  textAlign,
  returnKeyType,
  onSubmitEditing,
  disabled,
  backgroundcolor = colors.WHITE,
  textAlignVertical,
  multiline,
  label,
  paddingVertical,
  withoutBottomBorder = false,
  withoutTopBorder = false,
  withoutPaddingRight = false,
  toFocusOnNextInput = false,
  onPressIn,
  rightIcon,
  leftIcon,
  numberOfLines = 1,
  labelColor = colors.BLACK,
  defaultValue = '',
  height,
  unit,
  hasVerticalBorders = true,
  editable,
  onContainerPress,
  onRightIconPress
}: CustomInputProps): JSX.Element => {
  const containerBorders = hasVerticalBorders && {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.GRAY
  };

  return (
    <TouchableOpacity
      onPress={onContainerPress}
      disabled={!onContainerPress}
      style={[
        customInputStyles.inputContainer,
        containerBorders,
        {
          paddingVertical:
            paddingVertical ?? CUSTOM_INPUT_DEFAULT_VERTICAL_PADDING
        },
        withoutBottomBorder && customInputStyles.bottomBordless,
        withoutTopBorder && customInputStyles.topBordless,
        withoutPaddingRight && customInputStyles.withoutPaddingRight,
        { backgroundColor: backgroundcolor }
      ]}>
      {!!leftIcon && (
        <Image source={leftIcon} style={customInputStyles.rightIcon} />
      )}
      <View style={customInputStyles.contentContainer}>
        {label && (
          <Text style={[customInputStyles.label, { color: labelColor }]}>
            {label}
          </Text>
        )}
        <View style={{ height }}>
          <TextInput
            autoCapitalize="none"
            textAlign={textAlign ?? undefined}
            value={value}
            defaultValue={defaultValue ?? ''}
            placeholder={placeholder ?? ''}
            placeholderTextColor={colors.TEXT_PLACEHOLDER}
            onPressIn={onPressIn}
            multiline={multiline}
            onChangeText={onChangeText as (text: string) => void}
            hitSlop={{ top: 20, bottom: 10 }}
            pointerEvents={onContainerPress ? 'none' : undefined}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            onSubmitEditing={(e: any) => {
              onSubmitEditing?.(e);
            }}
            editable={editable !== undefined ? editable : !disabled}
            numberOfLines={numberOfLines}
            style={{
              ...customInputStyles.input,
              width: width ?? '100%',
              fontSize: fontSize ?? CUSTOM_INPUT_DEFAULT_FONT_SIZE,
              backgroundColor: backgroundcolor,
              textAlignVertical
            }}
            {...(toFocusOnNextInput && {
              blurOnSubmit: false,
              returnKeyType: 'next'
            })}
          />
        </View>

        {!!error && <Text style={customInputStyles.errorMessage}>{error}</Text>}
      </View>

      {!!rightIcon && (
        <TouchableOpacity
          disabled={!onRightIconPress}
          onPress={onRightIconPress}
          style={customInputStyles.iconContainer}>
          <Image source={rightIcon} />
        </TouchableOpacity>
      )}
      {unit ? (
        <View style={customInputStyles.iconContainer}>
          <Text style={customInputStyles.unitText}>{unit}</Text>
        </View>
      ) : (
        !!error && (
          <View style={customInputStyles.iconContainer}>
            <Image
              source={icons.ERROR_ICON}
              style={customInputStyles.errorIcon}
            />
          </View>
        )
      )}
    </TouchableOpacity>
  );
};

export default React.forwardRef(CustomInput);
