export const RemoveLoadingAnimation = () => {
    let LoadingSpinnerID = document.getElementById('loadingSpinner');
    let LoadingButtonID = document.getElementById('loadingButton');

    LoadingSpinnerID?.classList.add('displayNone');
    LoadingButtonID?.classList.remove('displayNone');
}