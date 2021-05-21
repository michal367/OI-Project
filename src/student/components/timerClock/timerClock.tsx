
import { Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { useCallback, useEffect, useState } from 'react';
import { formatTime } from '../../util/time';

interface TimerClockProps {
    targetTime: Date
    onTimerEnd?: () => void
}

export function TimerClock(props: TimerClockProps) {
    const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timeout>();
    const [clock, setClock] = useState(0);

    const refreshClock = useCallback((timeToWait) => {
        if (timeToWait - Date.now() <= 0) {
            if (intervalTimer)
                clearTimeout(intervalTimer);
            setClock(0);

            if (props.onTimerEnd) props.onTimerEnd();
        } else
            setClock(timeToWait - Date.now());
    }, [intervalTimer, props])


    useEffect(() => {
        let now = Date.now();
        let targetTime = props.targetTime.getTime();
        if (targetTime - now > 0) {
            setClock(targetTime - Date.now());
            setIntervalTimer(setInterval(() => { refreshClock(targetTime) }, 1000));
        }
        return () => {
            if (intervalTimer)
                clearTimeout(intervalTimer);
        }
    }, [intervalTimer, props, refreshClock])

    return (
        <>
            <Typography style={{ color: (props.targetTime.getTime() - Date.now() < 1000 * 60) ? red[500] : "inherit" }}>
                {formatTime(clock)}
            </Typography>
        </>
    );

}