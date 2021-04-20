/* Code adopted from: https://material-ui.com/components/tables/ */

import { makeStyles, useTheme, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useBackEnd, useBackEndSocket } from "../../services/BackEndService";
import { StoreContext } from "../../services/StoreService";
import { getComparator, Order, stableSort } from "../../util/comparators";
import { QuizListView } from "./QuizListView";

interface StudentListViewProps {
    lecture?: Lecture
}

export interface StudentListRow extends Student {
    orderIndex: number;
}

export function SendQuizView(props: StudentListViewProps) {
    const store = useContext(StoreContext);
    const theme = useTheme();

    const classes = makeStyles({
        root: {
            maxWidth: "500px",
            margin: "15px auto",
            background: theme.palette.secondary.light,
            borderRadius: "0"
        },
        row: {
            "& td": {
                padding: "15px",
                textAlign: "left",
                verticalAlign: "middle",
                fontWeight: 300,
                fontSize: "14px",
                color: "#000",
                borderBottom: "solid 1px rgba(255,255,255,0.1)"
            },
            "&:nth-of-type(odd)": {
                background: "#fedf9d;"
            }
        },
        details: {
            padding: 20,
            height: "100%",
            maxHeight: "100%",
        }
    })();

    return (
        <Paper className={classes.details} variant="outlined" square >
            <QuizListView />
            SendQuizView
        </Paper>
    );
}
