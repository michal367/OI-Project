import { makeStyles, useTheme, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';

interface TimestampRowProps {
	message?: string,
	hours?: string,
	minutes?: string,
	owner?: string,
	icon?: JSX.Element,
}

export function TimestampRow(props: TimestampRowProps) {
	const owner = props.owner ?? "";
	const hours = props.hours ?? "";
	const minutes = props.minutes ?? "";
	const message = props.message ?? "";

	const theme = useTheme();

	const classes = makeStyles({
		content: {
			padding: "10px 24px",
		},
	})();

	const TimelineIcon = withStyles((theme) => ({
		root: {
			padding: 0,
		},
	}))(TimelineDot);

	return (
		<TimelineItem>
			<TimelineOppositeContent className={classes.content}>
				<Typography color="textSecondary">{hours + ":" + minutes}</Typography>
			</TimelineOppositeContent>
			<TimelineSeparator>
				<TimelineIcon color="secondary" variant="outlined">
					{props.icon}
				</TimelineIcon>
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent className={classes.content}>
				<Typography>{owner + ": " + message}</Typography>
			</TimelineContent>
		</TimelineItem>
	);
}

export default TimestampRow;