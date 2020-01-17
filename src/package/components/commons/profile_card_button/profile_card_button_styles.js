import { getColorsFromCardVariant, getHexFromPaletteColor } from '../../../utils/styles/styles_utils';

export const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    button: {
        marginRight: 0
    },
    typography: ({ cardVariant }) => ({
        textTransform: 'unset',
        fontSize: ['14px', '!important'],
        color: [getHexFromPaletteColor(theme, getColorsFromCardVariant(theme, cardVariant).color), '!important']
    }),
    arrowContainer: {
        display: 'flex'
    },
    arrow: ({ cardVariant }) => ({
        height: 28,
        '& > path': {
            stroke: getHexFromPaletteColor(theme, getColorsFromCardVariant(theme, cardVariant).color)
        }
    })
});
