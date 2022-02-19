import * as actions from './todolist-actions'

type ActionsType = typeof actions // actions
type ActionCreatorsNamesType = keyof ActionsType // Object.keys(actions)[1] --> 'addTaskAC,'
type ActionCreatorType = ActionsType[ActionCreatorsNamesType] // actions['addTaskAC'] -->  addTaskAC
export type TodolistReducerActionsTypes = ReturnType<ActionCreatorType> //  addTaskAC()