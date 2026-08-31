import {
  S3Client,
} from "@aws-sdk/client-s3";

const region =
  process.env.AWS_REGION;

const accessKeyId =
  process.env.AWS_ACCESS_KEY_ID;

const secretAccessKey =
  process.env.AWS_SECRET_ACCESS_KEY;

const bucket =
  process.env.AWS_S3_BUCKET_NAME;

if (
  !region ||
  !accessKeyId ||
  !secretAccessKey ||
  !bucket
) {
  throw new Error(
    "AWS S3 configuration is missing"
  );
}

export const s3Client =
  new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

export const S3_BUCKET = bucket;