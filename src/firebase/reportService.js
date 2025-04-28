import { db, storage, auth } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const submitReport = async (file, description) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const fileRef = ref(storage, `reports/${file.name}`);
  await uploadBytes(fileRef, file);
  const mediaURL = await getDownloadURL(fileRef);

  await addDoc(collection(db, "reports"), {
    email: user.email,
    description,
    mediaURL: mediaURL,
    timestamp: new Date(),
  });
};
