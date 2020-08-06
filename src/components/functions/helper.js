import firebase from "../protected/Firebase";

export const addNotification = (notification) => {
  return firebase.firestore().collection("notifications").add({
    date: notification.date,
    fromUser: notification.fromUser,
    fromUsername: notification.fromUsername,
    jobId: notification.jobId,
    notificationType: notification.notificationType,
    toUser: notification.toUser,
  });
};

export const GeoName = (lng, lat) => {
  /*fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=5305f546fbc84e378acc3138bdd5a82f`
  )
    .then((response) => response.json())
    .then((data) => console.log(data.city));*/
  return "location";
};
