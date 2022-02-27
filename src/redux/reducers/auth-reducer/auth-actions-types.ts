import * as actions from './auth-actions'

type ActionsType = typeof actions
type ActionCreatorsNamesType = keyof ActionsType
type ActionCreatorType = ActionsType[ActionCreatorsNamesType]
export type AuthReducerActionsTypes = ReturnType<ActionCreatorType>