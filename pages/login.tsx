import Link from 'next/link'
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Router from 'next/router'
import { setCookie } from 'nookies';

export default function Login(){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    async function handleLogin(event: FormEvent){
        event.preventDefault();
        if(VerifyData()){
            AddLoadingAnimation();

            let formPassErrorID = document.getElementById('formPassError') as HTMLElement;
            let formEmailErrorID = document.getElementById('formEmailError') as HTMLElement;

            await axios.post('/api/Login/setToken', { email, pass })
            .then(res => {
              if(res.data == "InvalidEmail"){
                formEmailErrorID.innerHTML = "Email Incorreto";
                RemoveLoadingAnimation();
              }
              else if(res.data == "InvalidPass"){
                formPassErrorID.innerHTML = "Senha Incorreta";
                RemoveLoadingAnimation();
              }
              else if(res.status == 201){
                setCookie(undefined, 'token', res.data.token, {
                  maxAge: 60 * 60 * 1, // 1 hour
                  path: '/',
                })
                Redirect(res.data.token);
              }
              else{
                console.log("Ocorreu um erro")
              }
            })
            .catch(err => console.log(err))
        }
    }

    async function Redirect(token: string){
      try{
        const resHasLink =  await axios.post('http://localhost:3000/api/getLinkFromToken', { token })
        if(resHasLink.status == 201){
          Router.push('/users/' + resHasLink.data)
        }
        else{
          Router.push('/create-list')
        }
      }
      catch(err){
        console.log(err)
      }
    }

    function AddLoadingAnimation(){
      let LoadingSpinnerID = document.getElementById('loadingSpinner') as HTMLElement;
      let LoadingButtonID = document.getElementById('loadingButton') as HTMLElement;

      LoadingSpinnerID?.classList.remove('displayNone');
      LoadingButtonID?.classList.add('displayNone');
    }

    function RemoveLoadingAnimation(){
      let LoadingSpinnerID = document.getElementById('loadingSpinner') as HTMLElement;
      let LoadingButtonID = document.getElementById('loadingButton') as HTMLElement;

      LoadingSpinnerID?.classList.add('displayNone');
      LoadingButtonID?.classList.remove('displayNone');
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