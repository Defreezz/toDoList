import * as actions from './ui-actions'

type ActionsType = typeof actions
type ActionCreatorsNamesType = keyof ActionsType
type ActionCreatorType = ActionsType[ActionCreatorsNamesType]
export type UiReducerActionsTypes = ReturnType<ActionCreatorType>