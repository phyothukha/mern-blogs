import axios from "axios";

export const checkImage = (file: File) => {
  let error = "";
  if (!file) return (error = "File does not exists");
  if (file.size > 1024 * 1024)
    return (error = "file size must be less than 1mb");
  return error;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "msyzmk55");
  formData.append("cloud_name", "dsy6lxtrn");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dsy6lxtrn/auto/upload",
      formData
    );
    return { publicId: res.data.public_id, secureUrl: res.data.secure_url };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
