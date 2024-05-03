import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister
} from 'react-hook-form';
import { ScrollView, Switch, Text, View } from 'react-native';

import { type GameAttributes } from '_models/Game/Games';

import styles from './gameSettingsStyles.phone';
import { GamePlayerNumberEnum } from '../../../../utils/enum';
import CustomButton from '../../../../components/CustomButton/CustomButton';
import { colors } from '../../../../utils/colors';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import CustomRadioButtonGroup from '../../../../components/CustomRadioButtonGroup/CustomRadioButtonGroup';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Represents GameSettings screen ui
 * @returns JSX.Element
 */

interface GameSettingsProps {
  handleTeamModeChange: (event: any) => void;
  onConfirm: (data: GameAttributes) => void;
  isTeamModeActivated: boolean;
  playersNumberObject: {
    id: string;
    label: string;
    value: string;
  };
  formResults: {
    register: UseFormRegister<GameAttributes>;
    handleSubmit: UseFormHandleSubmit<GameAttributes, undefined>;
    errors: FieldErrors<GameAttributes>;
    control: Control<any>;
  };
  handlePlayersNumberChange: (value: string) => void;
  playerNumberRadioButtons: {
    id: string;
    label: string;
    value: string;
  }[];
  gameTypeRadioButtons: {
    id: string;
    label: string;
    value: string;
  }[];
  handleGameTypeChange: (value: string) => void;
  selectedGameType: {
    id: string;
    label: string;
    value: string;
  };
  handleCancelGame: () => void;
}
const GameSettings: React.FC<GameSettingsProps> = ({
  handleTeamModeChange,
  onConfirm,
  isTeamModeActivated,
  playersNumberObject,
  formResults: { register, handleSubmit, errors, control: playerControl },
  playerNumberRadioButtons,
  handlePlayersNumberChange,
  gameTypeRadioButtons,
  handleGameTypeChange,
  selectedGameType,
  handleCancelGame
}): JSX.Element => {
  const renderPlayersNameInput = (playersNumber: {
    id: string;
    label: string;
    value: string;
  }) => {
    const numberOfPlayers = isTeamModeActivated
      ? Number(playersNumber.value) / 2
      : Number(playersNumber.value);

    return Array.from({ length: numberOfPlayers }, (_, i) => (
      <View key={`playerNameInput-${i}`} style={styles.playerNameContainer}>
        <Controller
          control={playerControl}
          name={`playersName.${i}`}
          rules={{
            required: true,
            pattern: /^[A-Za-z0-9]+$/i,
            minLength: {
              value: 2,
              message: 'Le nom du joueur doit contenir au moins 2 caractères'
            }
          }}
          render={({ field }) => (
            <CustomInput
              width={300}
              value={field.value}
              onChangeText={field.onChange}
              // label={`Player ${i + 1}`}
              placeholder={`Player ${i + 1}`}
              withoutBottomBorder
              withoutTopBorder
              {...register(`playersName.${i}`, {
                required: true,
                pattern: /^[A-Za-z0-9]+$/i,
                minLength: {
                  value: 2,
                  message:
                    'Le nom du joueur doit contenir au moins 2 caractères'
                }
              })}
            />
          )}
        />
        {errors?.playersName?.[i] && (
          <Text>{errors?.playersName[i]?.message}</Text>
        )}
      </View>
    ));
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.formLabelStyle}>Nombre des joueurs</Text>
              <CustomRadioButtonGroup
                options={playerNumberRadioButtons}
                selectedId={playersNumberObject.id}
                onSelect={handlePlayersNumberChange}
              />
            </View>
            {playersNumberObject.value ===
              GamePlayerNumberEnum.FOUR.toString() && (
              <View
                style={[styles.radioButtonContainer, styles.switchContainer]}>
                <Text>Individuel</Text>
                <Switch
                  value={isTeamModeActivated}
                  onValueChange={handleTeamModeChange}
                />
                <Text>Equipe</Text>
              </View>
            )}
            <View style={styles.radioButtonContainer}>
              <Text style={styles.formLabelStyle}>Type du jeu</Text>
              <CustomRadioButtonGroup
                options={gameTypeRadioButtons}
                selectedId={selectedGameType.id}
                onSelect={handleGameTypeChange}
              />
            </View>
            <View>
              <Text style={styles.formLabelStyle}>Score à atteindre</Text>
              <Controller
                control={playerControl}
                name={'finalScore'}
                rules={{
                  required: true,
                  pattern: /^\d+$/,
                  minLength: {
                    value: 2,
                    message:
                      'Le score final doit contenir au moins Number caractères'
                  }
                }}
                render={({ field }) => (
                  <CustomInput
                    value={field.value}
                    onChangeText={field.onChange}
                    width={70}
                    placeholder="Final Score"
                    textAlign="center"
                    defaultValue="501"
                    withoutTopBorder
                    withoutBottomBorder
                    {...register('finalScore')}
                  />
                )}
              />
              {errors?.finalScore && <Text>{errors.finalScore.message}</Text>}
            </View>
            <View>
              <Text style={styles.formLabelStyle}>Players Name</Text>

              {renderPlayersNameInput(playersNumberObject)}
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Cancel"
              onPress={handleCancelGame}
              titleColor={colors.WHITE}
              buttonBackgroundColor={colors.PRIMARY}
              titleSize={18}
              hasButtonWidth
              buttonWidth={150}
              gradientColors={[colors.RED, colors.RED]}
            />
            <CustomButton
              title="Confirm"
              onPress={handleSubmit(onConfirm)}
              titleSize={18}
              hasButtonWidth
              buttonWidth={150}
              gradientColors={[colors.PRIMARY, colors.PRIMARY]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameSettings;
