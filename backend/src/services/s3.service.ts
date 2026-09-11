import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3Client, S3_BUCKET } from "../config/s3";

export class S3Service {
  async createUploadUrl({
    key,
    contentType,
  }: {
    key: string;
    contentType: string;
  }) {
    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });

    return uploadUrl;
  }

  async createDownloadUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    });

    return getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
  }

  async deleteFile(key: string) {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
      }),
    );
  }
}
