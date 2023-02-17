import { MouseEventHandler } from 'react';
import styles from './styles.module.css';

interface props{
    text: string;
    id: string;
    type: "button" | "submit" | "reset" | undefined;
    func: MouseEventHandler<HTMLButtonElement> | undefined;
    additionalClass: string;
}

export const Button = (props: props) => {
    return (
      <>
        {props.func == undefined ? 
        <button id={props.id} className={props.additionalClass + ' ' + styles.button} type={props.type}>{props.text}</button> : 
        <button id={props.id} className={props.additionalClass + ' ' + styles.button} type={props.type} onClick={props.func}>{props.text}</button> }
        {(props.id == "loadingButton" ? <div id="loadingSpinner" className={styles.spinner + " " + "displayNone"}></div> : <></>)}
      </>
    )
}