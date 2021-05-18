import { Card, CardContent, makeStyles } from "@material-ui/core";

interface ImageViewProps {
    imageSrc: string
}

export function ImageView(props: ImageViewProps) {
    const classes = makeStyles({
        imageContainer: {
            width: "100%",
            marginBottom: "1.5rem",
        },
        image: {
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain"
        }
    })();

    return (
        <Card className={classes.imageContainer}>
            <CardContent>
                <img src={props.imageSrc} className={classes.image} alt="" />
            </CardContent>
        </Card>
    );
}