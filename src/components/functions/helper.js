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
  return "location";
};
