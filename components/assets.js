//convert date to date string
export const parseDate = (dateObject) => {
    const dateArray = dateObject.split('/');
    const date = new Date(+dateArray[2], dateArray[1]-1, +dateArray[0]);

    return date.toDateString();
}

