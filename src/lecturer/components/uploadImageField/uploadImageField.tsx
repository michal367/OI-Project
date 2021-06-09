
import { Card, CardContent, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, ClipboardEventHandler, useCallback, useEffect, useState } from 'react';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';

interface UploadImageFieldProps {
    onChange?: (image: string | undefined) => void,
    imageSrc?: string,
}

export function UploadImageField(props: UploadImageFieldProps) {
    const [imageSrc, setImageSrc] = useState<string>(props.imageSrc ?? "");
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageSrc(props.imageSrc ?? "");
    }, [props.imageSrc])


    const classes = makeStyles({
        root: {
            width: "100%",
            borderRadius: "0 0 5px 5px",
        },
        field: {
            width: "100%",
        },
        image: {
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain"
        },
        placeHolder: {
            fontSize: "10rem",
            marginTop: "3rem",
            width: "100%",
            color: "#cdcdcd"
        }
    })();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImageSrc(e.target.value);
    };

    const handlePaste: ClipboardEventHandler<HTMLDivElement> = (event) => {
        setImageError(false);

        var items = event.clipboardData.items;
        console.log(JSON.stringify(items)); // will give you the mime types
        // find pasted image among pasted items
        var blob = null;
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") === 0) {
                blob = items[i].getAsFile();
            }
        }
        // load image if there is a pasted image
        if (blob !== null) {
            var reader = new FileReader();
            reader.onload = function (event) {
                if (event.target) {
                    console.log(event.target.result); // data url!  
                    if (typeof event.target.result === "string")
                        setImageSrc(event.target.result as string);
                }
            };
            reader.readAsDataURL(blob);
        }
    };

    const handleImageError = useCallback(() => {
        setImageError(true);
        if (props.onChange) props.onChange(undefined);
    }, [props])

    const handleImageLoad = useCallback(() => {
        setImageError(false);
        if (props.onChange) props.onChange(imageSrc);
    }, [imageSrc, props])


    return (
        <div className={classes.root}>
            <TextField
                variant="filled"
                label="Wklej obrazek lub link do niego"
                value={imageSrc}
                onChange={handleChange}
                onPaste={handlePaste}
                className={classes.field}
            />

            <Card className={classes.root}>
                <CardContent>
                    {imageSrc !== "" ?
                        <>
                            {imageError &&
                                <>
                                    <Typography>Nie można załadować obrazka</Typography>
                                    <BrokenImageIcon className={classes.placeHolder} fontSize="inherit" />
                                </>
                            }

                            <img src={imageSrc} className={classes.image} alt="" onError={handleImageError} onLoad={handleImageLoad} />
                        </>

                        :
                        <Typography>Podgląd obrazka</Typography>
                    }
                </CardContent>
            </Card>
        </div >
    );
}
