import {createGlobalStyle} from 'styled-components'

export const lightTheme = {
    body: '#faa961'
}

export const darkTheme = {
    body: '#211f21'
}

export const GlobalStyles = createGlobalStyle`
    body{
        background-color: ${(props) => props.theme.body};
    }
`;