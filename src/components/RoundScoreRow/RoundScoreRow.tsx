import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './roundScoreRowStyles.phone';
import { Game, Player } from 'src/types/interfaces/game';
import CustomInput from '_components/CustomInput/CustomInput';
import { Controller, useFormContext } from 'react-hook-form';
import { icons } from '_utils/icons';
import { colors } from '_utils/colors';
interface RoundScoreRowProps {
  game: Game;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  roundNumber: number;
  isValid?: boolean;
  checkIfPlayerWin: (player: Player) => boolean;
  isButtonAddDisabled: boolean;
  isButtonRemoveDisabled: boolean;
  isTextFieldDisabled: boolean;
  pendingRound: boolean;
}

const RoundScoreRow: React.FC<RoundScoreRowProps> = ({
  game,
  handleSubmit,
  roundNumber,
  isValid,
  isButtonAddDisabled,
  isButtonRemoveDisabled,
  isTextFieldDisabled,
  pendingRound
}) => {
  const { control } = useFormContext();
  const addRowButtonWidth = isButtonRemoveDisabled ? 23 : 20;
  const addButtonIconColor =
    !isValid || game.rounds.length >= roundNumber
      ? colors.GRAY
      : colors.PRIMARY;

  return (
    <View style={pendingRound && styles.pendingRound}>
      <View style={styles.roundScoreContainer} key={`field${roundNumber}`}>
        <Text>{roundNumber}</Text>
        {game.players.map((player) => (
          <View key={`${player.name}round${roundNumber}`}>
            <Controller
              render={({ field, fieldState }) => (
                <>
                  <CustomInput
                    backgroundcolor={'transparent'}
                    {...field}
                    width={60}
                    textAlign="center"
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder="0"
                    key={`${player.name}round${roundNumber}`}
                    withoutTopBorder
                    withoutBottomBorder
                    disabled={isTextFieldDisabled}
                  />
                  {fieldState.error && (
                    <Text style={styles.errorText}>
                      {fieldState.error.message}
                    </Text>
                  )}
                </>
              )}
              control={control}
              name={`${player.name}round${roundNumber}`}
              defaultValue={0}
              rules={{
                required: 'Le score est obligatoire',
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Veuillez saisir un score valide'
                }
              }}
            />
          </View>
        ))}
        <View style={styles.iconsContainer}>
          <Text disabled={isButtonAddDisabled} onPress={handleSubmit}>
            <Image
              source={icons.VALID_ICON}
              style={[styles.validIcon, { tintColor: addButtonIconColor }]}
              width={addRowButtonWidth}
            />
          </Text>
          {!isButtonRemoveDisabled && (
            <Text disabled={isButtonRemoveDisabled} onPress={handleSubmit}>
              <Image source={icons.TRASH} style={styles.removeIcon} />
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default RoundScoreRow;
