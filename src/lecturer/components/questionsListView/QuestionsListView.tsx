import { importQuestions } from "../../services/FileService"
import { Button, ButtonGroup } from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core";
export function QuestionsListView(){
    const theme = useTheme();

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
    const onChange = (event:any) => {
        var files = event.target.files;
        var json;
        for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                    return function (e:any) {
                        try {
                            json = JSON.parse(e.target.result);
                            console.log(importQuestions(JSON.stringify(json))[0].text); // test
                        } catch (ex) {
                            alert(ex);
                        }
                    }
                })(f);
                reader.readAsText(f);
            }
    }

    return(
        <div className={classes.root}>
            <ButtonGroup variant="contained" color="primary" size="large" aria-label="contained primary button group">
                <Button>
                    Import<input type="file" hidden onChange={(e) => onChange(e)}/>
                </Button>
                <Button disabled>
                    Export
                </Button>
            </ButtonGroup>
        </div>
    );
}