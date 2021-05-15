import Tab from '@material-ui/core/Tab';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import {  Badge } from "@material-ui/core";

interface NotifiableTabProps{
    observableList?: any[];
    label?: string;
    routes?:string;
}

export default function NotifiableTab(props: NotifiableTabProps) {
    
    const [notifiableNumber, setNotifiableNumber] = useState(0);
    const label = props.label?? "none";
    const routes = props.routes?? "none";
    
    useEffect(() => {
       if(props.observableList){ 
           if(props.observableList.length !== 0){
               setNotifiableNumber(notifiableNumber + 1);
        }}
    }, [props.observableList]);


    const resetNewQuestionsValue = () =>{
        setNotifiableNumber(0);
    }

    return (
        <div>
        <Badge badgeContent={notifiableNumber} overlap="circle" color="error">
            <Tab onClick={resetNewQuestionsValue}  label={label} value={routes} component={RouterLink} to={routes}/>
        </Badge>
        </div>
    );
}
