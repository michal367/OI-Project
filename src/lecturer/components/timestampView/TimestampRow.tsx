import Typography from '@material-ui/core/Typography';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

interface TimestampRowProps{
    message?: string,
    hours?: string,
    minutes?: string,
    owner?: string,
}

export function TimestampRow(props: TimestampRowProps) {
    const owner = props.owner?? "";
    const hours = props.hours?? "";
    const minutes = props.minutes??"";
    const message = props.message?? "";

    return (
        <>
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography color="textSecondary">{hours+":"+minutes}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography>{owner+": "+message}</Typography>
          </TimelineContent>
        </TimelineItem>
        </>
    );
}

export default TimestampRow;