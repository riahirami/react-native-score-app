import React, { useCallback } from 'react';
import {
  Image,
  type ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
  type ViewStyle,
  type ImageStyle,
  DimensionValue
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../utils/colors';
import {
  ACTIVE_TOUCHABLE_OPACITY,
  DEFAULT_HORIZONTAL_PADDING,
  SCREEN_WIDTH
} from '../../utils/constants';
import { CUSTOM_BUTTON_DEFAULT_HEIGHT } from '../../utils/dimensions';

import styles from './customButtonStyles';

interface CustomButtonProps {
  title?: string;
  onPress: () => void;
  buttonBackgroundColor?: string;
  isDisabled?: boolean;
  titleSize?: number;
  titleColor?: string;
  buttonHeight?: number;
  buttonWidth?: DimensionValue;
  font?: string;
  gradientColors?: Array<number | string>;
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  buttonIcon?: ImageSourcePropType;
  borderColor?: string;
  containerStyle?: ViewStyle;
  borderWidth?: number;
  isLeftIconNextToTitle?: boolean;
  iconSize?: number;
  marginLeft?: number;
  hasButtonWidth?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  buttonBackgroundColor,
  titleSize,
  titleColor,
  buttonHeight,
  buttonWidth,
  font,
  isDisabled = false,
  gradientColors,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 0 },
  buttonIcon,
  borderColor,
  containerStyle,
  borderWidth,
  isLeftIconNextToTitle = false,
  iconSize,
  marginLeft,
  hasButtonWidth = true
}) => {
  const leftIconStyle: Record<string, ViewStyle> = {
    container: {
      justifyContent: isLeftIconNextToTitle ? 'center' : 'flex-start'
    },
    text: { position: isLeftIconNextToTitle ? 'relative' : 'absolute' }
  };

  const width: DimensionValue | undefined =
    buttonWidth ??
    (hasButtonWidth ? SCREEN_WIDTH - DEFAULT_HORIZONTAL_PADDING : undefined);

  const height: number | string = buttonHeight ?? CUSTOM_BUTTON_DEFAULT_HEIGHT;

  const backgroundColor = isDisabled
    ? colors.DISABLED_BUTTON
    : buttonBackgroundColor ?? colors.BLACK;

  const contentColor = isDisabled
    ? colors.DISABLED_BUTTON_TEXT
    : titleColor ?? colors.WHITE;

  const iconStyle: ImageStyle = iconSize
    ? {
        width: iconSize,
        height: iconSize
      }
    : {};
  const renderButtonContent = useCallback(
    (): JSX.Element => (
      <>
        {!!buttonIcon && (
          <Image
            source={buttonIcon}
            style={[
              iconStyle,
              styles.buttonIcon,
              isLeftIconNextToTitle && {
                tintColor: contentColor
              },
              {
                marginLeft
              }
            ]}
          />
        )}
        <Text
          style={[
            leftIconStyle.text,
            styles.title,
            {
              color: contentColor,
              fontSize: titleSize,
              fontFamily: font
            }
          ]}>
          {title}
        </Text>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDisabled, buttonIcon, titleColor, titleSize, font, title, hasButtonWidth]
  );

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onPress}
        activeOpacity={ACTIVE_TOUCHABLE_OPACITY}
        style={[
          styles.container,
          leftIconStyle.container,
          { backgroundColor },
          { borderColor: borderColor ?? backgroundColor },
          { borderWidth: borderWidth ?? 0 },
          { height },
          { width: (hasButtonWidth && width && width) || '100%' }
        ]}>
        {gradientColors && !isDisabled ? (
          <LinearGradient
            colors={gradientColors}
            start={gradientStart}
            end={gradientEnd}
            style={[
              leftIconStyle.container,
              styles.container,
              { height },
              { width: (hasButtonWidth && width && width) || '100%' }
            ]}>
            {renderButtonContent()}
          </LinearGradient>
        ) : (
          renderButtonContent()
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
