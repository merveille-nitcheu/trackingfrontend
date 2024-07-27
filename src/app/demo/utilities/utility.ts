

export function toUTC(dateTimeString:string) {
    return new Date(dateTimeString).toUTCString();
}
export function toLocalDateTime(dateString: string) {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function toLocalTime(dateString: string) {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function toLocalDate(dateString: string) {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleDateString();
}

export function isToday(dateString: string){
    const date1 = new Date(dateString);
    const date2 = new Date();
    if (date1.getDay() == date2.getDay() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getFullYear() == date2.getFullYear()) {
        return true; // date1 est antérieure à date2
    } else  {
        return false; // date1 est postérieure à date2
    }
}
