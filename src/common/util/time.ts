export function digit2format(time: number) {
    return (time).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
}
export function formatTime(clock: number) {
    let date = timeToHMS(clock);
    return `${digit2format(date.h)}:${digit2format(date.m)}:${digit2format(date.s)}`
}
export function timeToHMS(clock: number) {
    let secs = clock / 1000;
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}