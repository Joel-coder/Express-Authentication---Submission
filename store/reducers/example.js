const example = (state, action) => {
    switch (action.type) {
        case "SET_DISPLAY_TEXT":
            return {
                ...state,
                displayText: action.payload,
            };
        default: state;
    }
};

export default example;