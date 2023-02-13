import Head from 'next/head'
import Link from 'next/link'
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Router from 'next/router'

export default function Login(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    async function handleLogin(event: FormEvent){
        event.preventDefault();
        if(VerifyData()){
            //loading animation
            let spinner = document.getElementById('loadingSpinner') as HTMLElement;
            let button = document.getElementById('loadingButton') as HTMLElement;
            spinner?.classList.remove('displayNone');
            button?.classList.add('displayNone');

            let formPassErrorID = document.getElementById('formPassError') as HTMLElement;
            let formEmailErrorID = document.getElementById('formEmailError') as HTMLElement;

            await axios.post('/api/Login/setToken', { email, pass })
            .then(res => {
              if(res.data == "InvalidEmail"){
                formEmailErrorID.innerHTML = "Email Incorreto";
                spinner?.classList.add('displayNone')
                button?.classList.remove('displayNone');
              }
              else if(res.data == "InvalidPass"){
                formPassErrorID.innerHTML = "Senha Incorreta";
                spinner?.classList.add('displayNone')
                button?.classList.remove('displayNone');
              }
              else if(res.data == "OK"){
                Router.push('/create');
              }
              else{
                console.log("Ocorreu um erro")
              }
            })
        }
    }

    function VerifyData(){
        var validEmail = false;
        var validPass = false;

        var formPassErrorID = document.getElementById('formPassError') as HTMLElement;
        var formEmailErrorID = document.getElementById('formEmailError') as HTMLElement;
    
        //verify if pass input has value
        if(!pass){      
            formPassErrorID.innerHTML = "Senha Obrigatório";
        }
        else{
          //verify if pass is 8 to 30 digits long
          if(pass.length >= 8 && pass.length <= 30){
            formPassErrorID.innerHTML = "";
            //verify if pass has number
            var strongerPass = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
            if(strongerPass.test(pass) == true){
                formPassErrorID.innerHTML = "";
              validPass = true
            }
            else{
                formPassErrorID.innerHTML = "A sua senha deve conter pelo menos um número";
              validPass = false
            }
          }
          else{
            formPassErrorID.innerHTML = "A sua senha deve ter entre 8 a 30 digitos";
            validPass = false
          }
        }
    
        //verify if email input has value
        if(email){
            formEmailErrorID.innerHTML = "";
    
          //verify if email is valid
          var regex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
          if(regex.test(email) == true){
            formEmailErrorID.innerHTML = "";
            validEmail = true;
          }
          else{
            formEmailErrorID.innerHTML = "Email Inválido";
            validEmail = false;
          } 
        }
        else{
            formEmailErrorID.innerHTML = "Email Obrigatório";
        }
    
        if(validEmail == true && validPass == true){
          return true;
        }
        else{
          return false;
        }
    }

    return(
      <>
        <Head>
          <title>Projetinho</title>
          <meta name="description" content="Projeto desenvolvido por Artur Schincariol Rossi" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
        </Head>
        <form className="main" onSubmit={handleLogin}>
            <img src="/react.svg" alt="logo" />
            <input value={email} onChange={e => setEmail(e.target.value)} className="input" type="text" name="email" placeholder="Email" />
            <span id="formEmailError" />
            <input value={pass} onChange={e => setPass(e.target.value)} className="input" type="password" name="senha" placeholder="Senha" />
            <span id="formPassError" />
            <button id="loadingButton" className="button" type="submit">ENTRAR</button>
            <div id="loadingSpinner" className="spinner displayNone"></div>
            <div className="formAlreadyAccount">
              Não tem uma conta?
              <Link className="formAlreadyAccountLink" href="/register">Registre-se</Link>
            </div>
        </form>
      </>
    )
}