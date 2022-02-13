import * as actions from './task-actions'

type ActionsType = typeof actions
type ActionCreatorsNamesType = keyof ActionsType
type ActionCreatorType = ActionsType[ActionCreatorsNamesType]
export type TaskReducerActionType = ReturnType<ActionCreatorType>