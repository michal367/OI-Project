import { Button, Checkbox } from "@material-ui/core";
import React, { useEffect, useState } from "react";

interface OptionProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    text: string;
}

export function Option(props: OptionProps) {
    const [checked, setChecked] = useState(props.checked);
    useEffect(() => setChecked(props.checked), [props.checked, props]);

    return (
        <div style={{ display: "flex", marginBottom: "10px" }}>
            <Checkbox
                color="secondary"
                checked={checked}
                onChange={() => {
                    setChecked(prev => !prev);
                    props.onChange(!checked);
                }}
            />
            <Button variant="outlined" color="secondary" onClick={() => {
                setChecked(prev => !prev)
                props.onChange(!checked);
            }}>{props.text} </Button>
        </div>
    )
}