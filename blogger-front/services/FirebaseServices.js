import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import "./firebase";
import logger from "@/utils/logger";

const storage = getStorage();

const FirebaseServices = {
  /** Uploads file to Firebase. Returns file Firebase URL. */
  uploadFile: async (file, fileName) => {
    try {
      const fileStoreRef = ref(
        storage,
        `${fileName}-${new Date().toISOString()}-${Math.round(
          Math.random() * 10 ** 10
        )}`
      );
      await uploadBytes(fileStoreRef, file);
      const url = await getDownloadURL(fileStoreRef);
      return { ok: true, data: url };
    } catch {
      return { ok: false, data: "" };
    }
  },
  deleteFile: async (url) => {
    try {
      const fileStoreRef = ref(storage, url);
      await deleteObject(fileStoreRef);
      return { ok: true, data: null };
    } catch (err) {
      return { ok: false, data: null };
    }
  },
};

export default FirebaseServices;
