import { Button, ButtonGroup, Fab, makeStyles, styled } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import { ChangeEvent, RefObject, useCallback, useRef } from 'react';
import { exportToJsonFile } from '../../services/FileService';


interface ImportExportProps {
    onImport?: (e: ProgressEvent<FileReader>) => void,
    onExport?: () => void,
    objectToExport?: Object,
    fileName?: string,
}

const Input = styled('input')({
    display: 'none',
});


export function ImportExport(props: ImportExportProps) {

    const classes = makeStyles({
        importExport: {
            overflow: "hidden",
            padding: 0,
            "& .MuiFab-label": {
                height: "100%",
            },
            height: 55,
        },
        importExportGroup: {
            width: "100%",
            height: "100%",
        },
        importExportButton: {
            padding: "0 10",
            fontSize: "16px",
            width: 144,
            "& span": {
                display: "flex",
                gap: 10,
            },
        },
    })();

    const onChangeImport = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (!props.onImport) return;
        var files = event.target.files;
        if (files !== null && files.length !== 0) {
            var f = files[0];
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return props.onImport;
            })(f);
            reader.readAsText(f);
        }
    }, [props]);

    const handleImportButtonClick = () => {
        inputRef.current?.click();
    }

    const handleExportButtonClick = useCallback(() => {
        if (props.onExport) return props.onExport();
        if (props.objectToExport) exportToJsonFile(props.objectToExport, props.fileName);
    }, [props]);

    const inputRef = useRef<HTMLInputElement>() as RefObject<HTMLInputElement>;

    return (
        <Fab variant="extended" className={classes.importExport}>
            <ButtonGroup
                variant="contained"
                color="primary"
                className={classes.importExportGroup}
            >

                <Input ref={inputRef} accept=".json" type="file" onChange={(e) => onChangeImport(e)} />
                <Button className={classes.importExportButton} onClick={handleImportButtonClick} > <PublishIcon /> Wczytaj </Button>

                <Button className={classes.importExportButton} onClick={handleExportButtonClick}> Zapisz <GetAppIcon />   </Button>
            </ButtonGroup>
        </Fab>
    );
}
