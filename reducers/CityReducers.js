
export default (state = null , action ) => {
    switch (action.type ) {
        case 'CITY_SELECTED':
            return action.payload;
    }

            return state;   

}