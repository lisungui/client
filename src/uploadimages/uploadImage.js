import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

const uploadImage = async (imageFile) => {
  if (!imageFile) return;

  // Create a storage reference
  const storageRef = ref(storage, `images/${imageFile.name}`);

  try {
    // Upload the image file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, imageFile);

    // Get the HTTPS URL of the uploaded image
    const url = await getDownloadURL(snapshot.ref);
    
    return url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

export { uploadImage };
