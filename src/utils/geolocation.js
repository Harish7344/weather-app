export const getCurrentLocation = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      errorCallback('Geolocation is not supported by this browser');
    }
  };
  