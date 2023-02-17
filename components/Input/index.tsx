import { ChangeEventHandler, MouseEventHandler } from 'react';
import styles from './styles.module.css';

interface props{
    name: string;
    type: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    spanErrorID: string;
}

export const Input = (props: props) => {
    return (
      <>
        <input value={props.value} onChange={props.onChange} className={styles.input} type={props.type} name={props.name} placeholder={props.placeholder} />
        <span id={props.spanErrorID} />
      </>
    )
}