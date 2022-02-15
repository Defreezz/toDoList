type initialStateType = {
    darkTheme: boolean
}
type ToggleTheme = {
    type:'TOGGLE-THEME'
    theme:boolean
}
export  type ThemeActionsType = ToggleTheme

export function themeReducer(state:initialStateType = {darkTheme:false}, action: ThemeActionsType)  {
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
