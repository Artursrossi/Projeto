import Link from 'next/link'
import Router from 'next/router'
import React, { useState, FormEvent } from 'react';
import axios from 'axios';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [samepass, setSamePass] = useState('');

    async function handleRegister(event: FormEvent){
      event.preventDefault();
      if(VerifyData()){
        //loading animation
        let spinner = document.getElementById('loadingSpinner');
        spinner?.classList.remove('displayNone');
        let button = document.getElementById('loadingButton');
        button?.classList.add('displayNone');

        await axios.post('/api/Register', { userName, email, pass, samepass })
        .then(res => {
          if(res.data == "EmailAlreadyExist"){
            let formEmailErrorID= document.getElementById('formEmailError') as HTMLElement;
            formEmailErrorID.innerHTML = "Email Já Existente";
            button?.classList.remove("displayNone");
            spinner?.classList.add("displayNone"); 
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

    function VerifyData(){
      var validName = false;
      var validPass = false;
      var validEmail = false;
  
      var senhasIguais = false;
      var senhaForte = false;

      var formNameErrorID = document.getElementById('formNameError') as HTMLElement;
      var formPassErrorID= document.getElementById('formPassError') as HTMLElement;
      var formSamePassErrorID= document.getElementById('formSamePassError') as HTMLElement;
      var formEmailErrorID= document.getElementById('formEmailError') as HTMLElement;
  
      //verify if name input has value
      if(!userName){
        formNameErrorID.innerHTML = "Nome Obrigatório";
        validName = false;
      }
      else{
        //verify if name is 5 to 30 digits long
        if(userName.length >= 5 && userName.length <= 30){
          //verify if the name has only letters
          var OnlyLetters = /^[A-Za-z]+$/;
          if(OnlyLetters.test(userName) == true){
            formNameErrorID.innerHTML = "";
            validName = true;
          }
          else{
            formNameErrorID.innerHTML = "Não pode conter números no nome";
            validName = false;
          }
        }
        else{
          formNameErrorID.innerHTML = "O seu nome deve ter entre 5 a 30 letras";
          validName = false;
        }
      }
  
      //verify if pass input has value
      if(!pass){      
        formPassErrorID.innerHTML = "Senha Obrigatório";
      }
      else{
        //verify is pass is 8 to 30 digits long
        if(pass.length >= 8 && pass.length <= 30){
          formPassErrorID.innerHTML = "";
          //verify if pass has number
          var strongerPass = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
          if(strongerPass.test(pass) == true){
            formPassErrorID.innerHTML = "";
            senhaForte = true;
          }
          else{
            formPassErrorID.innerHTML = "A sua senha deve conter pelo menos um número";
            senhaForte = false;
          }
        }
        else{
          formPassErrorID.innerHTML = "A sua senha deve ter entre 8 a 30 digitos";
          senhaForte = false;
        }
      }
  
      //verify if samepass input has value 
      if(!samepass){
        formSamePassErrorID.innerHTML = "Digite Sua Senha Novamente";
      }
      else{
        formSamePassErrorID.innerHTML = "";
      }
  
      //verify if pass is equal than samepass
      if(pass == samepass){
        formSamePassErrorID.innerHTML = "";
        senhasIguais = true;
      }
      else{
        formSamePassErrorID.innerHTML = "As Senhas devem ser iguais";
        senhasIguais = false;
      }
  
      if(senhasIguais == true && senhaForte == true){
        validPass = true;
      }
      else{
        validPass = false;
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
  
      if(validName == true && validPass == true && validEmail == true){
        return true;
      }
      else{
        return false;
      }
    }

    return (
      <>
        <form className="main" onSubmit={handleRegister}>
            <img src="/react.svg" alt="logo" />
            <input value={userName} onChange={e => setUserName(e.target.value)} className="input" type="text" name="name" placeholder="Nome" />
            <span id="formNameError" />
            <input value={email} onChange={e => setEmail(e.target.value)} className="input" type="text" name="email" placeholder="Email" />
            <span id="formEmailError" />
            <input value={pass} onChange={e => setPass(e.target.value)} className="input" type="password" name="senha" placeholder="Senha" />
            <span id="formPassError" />
            <input value={samepass} onChange={e => setSamePass(e.target.value)} className="input" type="password" name="senha" placeholder="Repetir Senha" />
            <span id="formSamePassError" />
            <button id="loadingButton" className="button" type="submit">REGISTRAR</button>
            <div id="loadingSpinner" className="spinner displayNone"></div>
            <div className="formAlreadyAccount">
              Já tem uma conta?
              <Link className="formAlreadyAccountLink" href="/login">Entrar</Link>
            </div>
        </form>
      </>
    )
}