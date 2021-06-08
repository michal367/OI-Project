import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react"

interface AnswerProps {
    value: string;
    onChange: (text: string) => void;
    label: string;
}

export function Answer(props: AnswerProps){
    const [answer, setAnswer] = useState<string>(props.value);
    useEffect(() => setAnswer(props.value), [props.value, props]);

    return (<TextField
        multiline={true}
        variant="filled"
        label={props.label}
        value={answer}
        fullWidth={true}
        rows={5}
        onChange={(e) => {
            let text = e.target.value;
            setAnswer(text);
            props.onChange(text);
        }}
    />)
}