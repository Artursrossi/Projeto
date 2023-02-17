export const AddLoadingAnimation = () => {
    let LoadingSpinnerID = document.getElementById('loadingSpinner');
    let LoadingButtonID = document.getElementById('loadingButton');

    LoadingSpinnerID?.classList.remove('displayNone');
    LoadingButtonID?.classList.add('displayNone');
}