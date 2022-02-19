type InitialStateType = {
    darkTheme: boolean
}
type ToggleTheme = {
    type:'TOGGLE-THEME'
    theme:boolean
}
export  type ThemeActionsTypes = ToggleTheme

export function themeReducer(state:InitialStateType = {darkTheme:false}, action: ThemeActionsTypes)  {
    switch (action.type) {
        case 'TOGGLE-THEME': {
            return {
                ...state,
                darkTheme:action.theme
            }
        }
        default:
            return state
    }
}

export const toggleTheme = (theme:boolean):ToggleTheme => {
    return {type:"TOGGLE-THEME",theme}
}
