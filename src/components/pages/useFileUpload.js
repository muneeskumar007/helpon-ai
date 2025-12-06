
import { useState } from "react";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

export default function useFileUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState("");

  const uploadFile = async (file, type = "image") => {
    try {
      setUploading(true);
      setProgress(10);

      const result = await uploadToCloudinary(file, type);

      setProgress(100);
      setFileData(result);
      return result;
    } catch (err) {
      setError("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return { uploading, progress, fileData, error, uploadFile };
}
