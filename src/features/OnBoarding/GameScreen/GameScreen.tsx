/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import styles from './gameScreenStyles.phone';
import { colors } from '../../../utils/colors';
import CustomButton from '_components/CustomButton/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomAlertPopup from '_components/CustomAlertPopup/CustomAlertPopup';
import GameDetailsCard from '_components/GameDetailsCard/GameDetailsCard';
import useModalAlert from '_hooks/useModalAlert';
import useGameActions from '_hooks/useGameActions';
import RoundScoreRow from '_components/RoundScoreRow/RoundScoreRow';
import ScoreTabHeader from '_components/ScoreTabHeader/ScoreTabHeader';
import ScoreTabFooter from '_components/ScoreTabFooter/ScoreTabFooter';
import FinalGameResult from '_components/FinalGameResult/FinalGameResult';
/**
 * Represents GameScreen screen ui
 * @returns JSX.Element
 */
interface GameScreenProps {
  modalAlertType: Pick<
    ReturnType<typeof useModalAlert>,
    'handleAlertClose' | 'handleAlertOpen' | 'isAlertOpen'
  >;
  gameActionsProps: Pick<
    ReturnType<typeof useGameActions>,
    | 'game'
    | 'setGame'
    | 'getWinnersPlayers'
    | 'checkIfPlayerWin'
    | 'checkIfGameIsOver'
    | 'isGameOverRef'
  >;
  form: Pick<UseFormReturn<any>, 'register' | 'handleSubmit' | 'control'> & {
    formState: Pick<UseFormReturn<any>['formState'], 'errors' | 'isValid'>;
  };
  endGameAction: () => void;
  replayGameAction: () => void;

  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
}
const GameScreen: React.FC<GameScreenProps> = ({
  modalAlertType: { handleAlertClose, handleAlertOpen, isAlertOpen },
  gameActionsProps: { game, checkIfPlayerWin, checkIfGameIsOver },
  endGameAction,
  replayGameAction,
  handleSubmit,
  form
}): JSX.Element => {
  const isValid = form.formState.isValid;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <GameDetailsCard game={game} />
        <View style={styles.gameActionContainer}>
          {!checkIfGameIsOver() ? (
            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={handleAlertOpen}
                title="Quitter ?"
                buttonBackgroundColor={colors.RED}
                titleSize={16}
                hasButtonWidth
                buttonWidth={100}
              />
              <CustomButton
                onPress={replayGameAction}
                title="Rejouer ?"
                buttonBackgroundColor={colors.PRIMARY}
                titleSize={16}
                hasButtonWidth
                buttonWidth={100}
              />
            </View>
          ) : (
            <FinalGameResult
              game={game}
              checkIfPlayerWin={checkIfPlayerWin}
              title={'تخسر ها يوسف'}
              replayGameAction={replayGameAction}
            />
          )}
        </View>
        <Divider />
        <ScoreTabHeader game={game} />
        <Divider />
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <RoundScoreRow
            game={game}
            handleSubmit={handleSubmit}
            roundNumber={1}
            isValid={isValid}
            checkIfPlayerWin={checkIfPlayerWin}
            isTextFieldDisabled={game.rounds.length >= 1}
            isButtonAddDisabled={game.rounds.length >= 1}
            isButtonRemoveDisabled={game.rounds.length !== 1}
            pendingRound={1 === game.rounds.length + 1}
          />
          {game.rounds.map((round, index) => (
            <RoundScoreRow
              key={`field${index}`}
              game={game}
              handleSubmit={handleSubmit}
              roundNumber={round.roundNumber + 1}
              isValid={isValid}
              checkIfPlayerWin={checkIfPlayerWin}
              isButtonAddDisabled={
                index !== game.rounds.length - 1 || checkIfGameIsOver()
              }
              isTextFieldDisabled={
                index !== game.rounds.length - 1 || checkIfGameIsOver()
                // checkIfPlayerWin(player) ||
                // ifPlayerOnLostPlayers(player) ||
              }
              isButtonRemoveDisabled={
                game.rounds.length !== round.roundNumber + 1
              }
              pendingRound={
                index === game.rounds.length - 1 && !checkIfGameIsOver()
              }
            />
          ))}
        </ScrollView>
        <ScoreTabFooter game={game} />
      </View>
      {isAlertOpen && (
        <CustomAlertPopup
          handleAlertCloseAction={handleAlertClose}
          handleAlertConfirmAction={endGameAction}
          title={'Quitter le jeu ?'}
          message={' Vous êtes sur le point de quitter le jeu, êtes-vous sûr ?'}
        />
      )}
    </SafeAreaView>
  );
};

export default GameScreen;
