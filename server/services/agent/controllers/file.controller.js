import cloudinary from "../config/cloudinary.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a file",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "NexusAI",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      uploadStream.end(req.file.buffer);
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        name: req.file.originalname,
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        resourceType: result.resource_type,
        size: result.bytes,
      },
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "File upload failed",
    });
  }
};