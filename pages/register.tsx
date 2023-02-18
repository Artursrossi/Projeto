import Link from 'next/link';
import Router from 'next/router';
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

import { Button } from '../components/Button';

import { AddLoadingAnimation } from '../utils/AddLoadingAnimation';
import { RemoveLoadingAnimation } from '../utils/RemoveLoadingAnimation';
import { VerifyInputs } from '../utils/VerifyInputs';

export default function Register() {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [samepass, setSamePass] = useState('');

    async function handleRegister(event: FormEvent){
      event.preventDefault();
      let VerifyInputsProps: any = {"validateName":true, "validateEmail":true, "validatePass":true, "validateSamePass":true, "validateLink":false, name, email, pass, samepass}
      if(VerifyInputs(VerifyInputsProps) === true){
        AddLoadingAnimation();

        await axios.post('/api/Register', { name, email, pass, samepass })
        .then(res => {
          if(res.data == "EmailAlreadyExist"){
            let formEmailErrorID= document.getElementById('formEmailError') as HTMLElement;
            formEmailErrorID.innerHTML = "Email Já Existente";
            RemoveLoadingAnimation();
          }
          else if(res.data == "OK"){
            Router.push('/login');
          }
          else{
            console.log("Ocorreu um erro");
          }
        })
        .catch(err => console.log(err))
      }
    }

    return (
      <>
        <form className="main" onSubmit={handleRegister}>
            <img src="/react.svg" alt="logo" />
            <input value={name} onChange={e => setUserName(e.target.value)} className="input" type="text" name="name" placeholder="Nome" />
            <span id="formNameError" />
            <input value={email} onChange={e => setEmail(e.target.value)} className="input" type="text" name="email" placeholder="Email" />
            <span id="formEmailError" />
            <input value={pass} onChange={e => setPass(e.target.value)} className="input" type="password" name="senha" placeholder="Senha" />
            <span id="formPassError" />
            <input value={samepass} onChange={e => setSamePass(e.target.value)} className="input" type="password" name="senha" placeholder="Repetir Senha" />
            <span id="formSamePassError" />
            <Button id="loadingButton" additionalClass="" text="REGISTRAR" type="submit" func={() => {}}/>
            <div className="formAlreadyAccount">
              Já tem uma conta?
              <Link className="formAlreadyAccountLink" href="/login">Entrar</Link>
            </div>
        </form>
      </>
    )
}