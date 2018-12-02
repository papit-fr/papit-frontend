//###########################################################################################################################
// ALL THE JAVASCRIPT CODE REQUIRED FOR THE 404.html PAGE IN PROBABLE CHRONOLOGICAL ORDER
//###########################################################################################################################
/*============================================================================================================================
WHEN THE PAGE IS READY
============================================================================================================================*/
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    let currentLocation = window.location.href;
    const desired404URL = "https://www.papit.fr/404";
    if (currentLocation != desired404URL) {
      window.location.href = desired404URL
    };
  };
};