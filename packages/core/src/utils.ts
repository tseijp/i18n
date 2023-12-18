export const getLocalStorageLng = <Lng extends string = string>() => {
  try {
    if (typeof localStorage !== 'undefined')
      return localStorage.getItem('lng') as Lng;
  } catch (e) {
    throw new Error('localStorage is not available');
  }
}

export const setLocalStorageLng = <Lng extends string = string>(lng: Lng) => {
  try {
    if (typeof localStorage !== "undefined")
      return localStorage.setItem("lng", lng);
  } catch (e) {
    throw new Error("localStorage is not available");
  }
};

let currentLng = "";

const listenners = new Set<() => void>();

export const getSnapshotLng = () => {
  return currentLng;
}

export const setSnapshotLng = <Lng extends string = string>(lng: Lng) => {
  setLocalStorageLng(lng);
  currentLng = lng;
  listenners.forEach((f) => f());
}

export const subscribeLng = (callback = () => {}) => {
  currentLng = getLocalStorageLng() || "ja";
  listenners.add(callback);
  return () => void listenners.delete(callback);
}