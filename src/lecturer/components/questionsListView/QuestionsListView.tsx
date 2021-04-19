import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from "@material-ui/core";
import { StoreContext } from "../../services/StoreService";
import { useContext, useRef } from "react";
import { exportQuestions } from "../../services/FileService";
import React from "react";
import { styled } from '@material-ui/core/styles';
import { ChangeEvent } from 'react';

export function QuestionsListView(){
    const theme = useTheme();
    const store = useContext(StoreContext);

    const classes = makeStyles({
        root: {
            background: theme.palette.secondary.light,
            gap: "50px",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: "100%",
            top: 0,
            zIndex: -1,
            paddingTop: "55px",
            paddingBottom: "10px",
        },
    })();

    const onChangeImport = (event:ChangeEvent<HTMLInputElement>) => {
        //const target = event.target as Element;
        var files = event.target.files;
        if(files !== null && files.length !== 0){

            var f = files[0];
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e:ProgressEvent<FileReader>) {
                    if(e.target?.result != null){
                        let jsonString = e.target.result as string
                        store.questions = [...store.questions, ...JSON.parse(jsonString)];
                    }
                }
            })(f);
            reader.readAsText(f);
        }
    }
    const Input = styled('input')({
        display: 'none',
      });

    const handleExportButtonClick = () => {
        exportQuestions(store.questions);
        // for future use
        //store.quizes.forEach(quiz => {
        //    exportQuestions(quiz.questions, quiz.title+".json")
        //})
    }

    return(
        <div className={classes.root}>
            <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
            
            <label>
            <Input accept=".json" id="contained-button-file" type="file" onChange={(e) => onChangeImport(e)} />
            <Button variant="contained" component="span">
                Import
                </Button>
            </label>
            <label>
                <Button onClick={ handleExportButtonClick } variant="contained">
                    Export
                </Button>
            </label>
            </ButtonGroup>
        </div>
    );
}