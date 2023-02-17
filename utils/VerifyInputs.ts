interface props {
    validateName: boolean; 
    validateEmail: boolean;
    validatePass: boolean;
    validateSamePass: boolean;
    validateLink: boolean; 
    name: any; 
    email: string;  
    pass: string; 
    samepass: string; 
    link: string; 
}

export const VerifyInputs = (props: props) => {
    // Document Elements
    let formNameErrorID = document.getElementById('formNameError') as HTMLElement;
    let formEmailErrorID = document.getElementById('formEmailError') as HTMLElement;
    let formPassErrorID = document.getElementById('formPassError') as HTMLElement;
    let formSamePassErrorID = document.getElementById('formSamePassError') as HTMLElement;
    let createLinkErrorID = document.getElementById('createLinkError') as HTMLElement;

    // vars
    let validName = false;
    let validEmail = false;
    let validPass = false;
    let validSamePass = false;
    let validLink = false;


    // Verify Name
    let ReGexName = /^[a-zA-ZzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{3,30}$/;
    if(props.validateName === true){
        if(props.name){
            if(props.name.length >= 3 && props.name.length <= 30){
                if(ReGexName.test(props.name) === true){
                    formNameErrorID.innerHTML = "";
                    validName = true;
                }
                else{
                    formNameErrorID.innerHTML = "Não pode conter números no nome";
                    validName = false;
                }
            }
            else{
                formNameErrorID.innerHTML = "O seu nome deve conter entre 3 a 30 letras";
                validName = false;
            }
        }
        else{
            formNameErrorID.innerHTML = "Nome Obrigatório";
            validName = false;
        }
    }
    else{
        validName = true;
    }


    // Verify Email
    let ReGexEmail = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    if(props.validateEmail === true){
        if(props.email){
            if(ReGexEmail.test(props.email) === true){
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
            validEmail = false;
        }
    }
    else{
        validEmail = true;
    }

    // Verify Pass
    let ReGexStrongerPass = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    if(props.validatePass === true){
        if(props.pass){
            if(props.pass.length >= 8 && props.pass.length <= 30){
                if(ReGexStrongerPass.test(props.pass) === true){
                    formPassErrorID.innerHTML = "";
                    validPass = true;
                }
                else{
                    formPassErrorID.innerHTML = "A sua senha deve conter pelo menos um número";
                    validPass = false;
                }
            }
            else{
                formPassErrorID.innerHTML = "A sua senha deve conter entre 8 a 30 digitos";
                validPass = false;
            }
        }
        else{
            formPassErrorID.innerHTML = "Senha Obrigatória";
            validPass = false;
        }

    }
    else{
        validPass = true;
    }


    // Verify SamePass
    if(props.validateSamePass === true){
        if(props.samepass){
            if(props.pass == props.samepass){
                formSamePassErrorID.innerHTML = "";
                validSamePass = true;
            }
            else{
                formSamePassErrorID.innerHTML = "As Senhas devem ser iguais";
                validSamePass = false;
            }
        }
        else{
            formSamePassErrorID.innerHTML = "Digite Sua Senha Novamente";
            validSamePass = false;
        }
    }
    else{
        validSamePass = true;
    }

    // Verify Link
    let ReGexLink = /^[A-Za-z]{3,20}$/;
    if(props.validateLink === true){
        if(props.link){
            if(props.link.length >= 3 && props.link.length <= 20){
                if(ReGexLink.test(props.link) === true){
                    createLinkErrorID.innerHTML = "";
                    validLink = true;
                }
                else{
                    createLinkErrorID.innerHTML = "O Link não pode conter espaço ou caracteres especiais";
                    validLink = false;
                    location.href = "#divCreateLink";
                }
            }
            else{
                createLinkErrorID.innerHTML = "O Link deve conter entre 3 a 20 letras";
                validLink = false;
                location.href = "#divCreateLink";
            }
        }
        else{
            createLinkErrorID.innerHTML = "Link Obrigatório";
            validLink = false;
            location.href = "#divCreateLink";
        }
    }
    else{
        validLink = true;
    }


    // Check all validations
    if(validName === true && validEmail === true && validPass === true && validSamePass === true && validLink === true){
        return true;
    }
    else{
        return false;
    }

}
