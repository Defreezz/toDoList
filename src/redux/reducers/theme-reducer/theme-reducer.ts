type InitialStateType = {
    isDarkTheme: boolean
}
type ToggleTheme = {
    type:'TOGGLE-THEME'
    isDarkTheme:boolean
}
export  type ThemeActionsTypes = ToggleTheme

export function themeReducer(state:InitialStateType = {isDarkTheme:true}, action: ThemeActionsTypes)  {
    switch (action.type) {
        case 'TOGGLE-THEME': {
            return {
                ...state,
                isDarkTheme:action.isDarkTheme
            }
        }
        default:
            return state
    }
}

export const toggleTheme = (isDarkTheme:boolean):ToggleTheme => {
    return {type:"TOGGLE-THEME",isDarkTheme}
}
