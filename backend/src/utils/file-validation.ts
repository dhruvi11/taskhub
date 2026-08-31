const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const validateFile = (
  contentType: string,
  fileSize: number
) => {
  if (
    !ALLOWED_IMAGE_TYPES.includes(
      contentType
    )
  ) {
    throw new Error(
      "Invalid file type. Only JPEG, PNG and WebP are allowed."
    );
  }

  if (fileSize > MAX_FILE_SIZE) {
    throw new Error(
      "File size must not exceed 5MB."
    );
  }
};