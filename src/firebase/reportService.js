import { db, storage } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const submitReport = async (file, description, userEmail) => {
  if (!userEmail) throw new Error("User not logged in");

  const fileRef = ref(storage, `reports/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  const mediaURL = await getDownloadURL(fileRef);

  await addDoc(collection(db, "reports"), {
    email: userEmail,
    description,
    mediaURL,
    status: "Raised",
    timestamp: serverTimestamp(),
  });
};

export const getAllReports = async () => {
  const snapshot = await getDocs(collection(db, "reports"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateReportStatus = async (reportId, newStatus) => {
  const reportRef = doc(db, "reports", reportId);
  await updateDoc(reportRef, {
    status: newStatus,
  });
};

export const uploadIssueReport = async ({ type, media, location, userEmail }) => {
  if (!userEmail) throw new Error("User not logged in");

  let mediaUrl = "";

  if (media) {
    const mediaRef = ref(storage, `reports/${Date.now()}_${media.name}`);
    await uploadBytes(mediaRef, media);
    mediaUrl = await getDownloadURL(mediaRef);
  }

  await addDoc(collection(db, "reports"), {
    type,
    location,
    mediaUrl,
    status: "Raised",
    createdAt: serverTimestamp(),
    createdBy: userEmail,
  });
};
