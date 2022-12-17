


export const typePokeToHex = async ( type: string ) => {
    console.log('entre a typePokeToHex')

        switch (type) {
            case 'bug':         return '#68B984';
            case 'dragon':      return '#F49D1A';
            case 'electric':    return '#e0e21a';
            case 'fairy':       return '#FFB9B9';
            case 'fighting':    return '#820000';
            case 'fire':        return '#9B0000';
            case 'flying':      return '#82C3EC';
            case 'ghost':       return '#472183';
            case 'grass':       return '#B6E2A1';
            case 'ground':      return '#562B08';
            case 'ice':         return '#B4CDE6';
            case 'normal':      return '#FFDB89';
            case 'poison':      return '#6C4AB6';
            case 'psychic':     return '#FCF9BE';
            case 'rock':        return '#434242';
            case 'steel':       return '#E0144C';
            case 'water':       return '#1C315E';
                
            default:            return '#753654';
        }
}