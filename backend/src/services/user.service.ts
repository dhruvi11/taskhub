import { UserRepository } from "../repositories/user.repository";
import { UpdateProfileInput } from "../module/user/user.validation";
import { S3Service } from "./s3.service";

export class UserService {
  private readonly s3Service: S3Service;

  constructor(
    private readonly userRepository: UserRepository
  ) {
    this.s3Service = new S3Service();
  }

  async getCurrentProfile(userId: string) {
    const user =
      await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return this.sanitizeUser(user);
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileInput
  ) {
    const existingUser =
      await this.userRepository.findById(userId);

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (
      data.email &&
      data.email !== existingUser.email
    ) {
      const emailUser =
        await this.userRepository.findByEmail(
          data.email
        );

      if (
        emailUser &&
        emailUser.id !== userId
      ) {
        throw new Error(
          "Email already exists"
        );
      }
    }

    const updatedUser =
      await this.userRepository.updateById(
        userId,
        data
      );

    return this.sanitizeUser(updatedUser);
  }

  /**
   * Save the S3 object key as the user's avatar.
   *
   * Example:
   * users/{userId}/profile/{uuid}.jpg
   */
  async updateAvatar(
    userId: string,
    avatarKey: string
  ) {
    const existingUser =
      await this.userRepository.findById(
        userId
      );

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (
      !avatarKey.startsWith(
        `users/${userId}/profile/`
      )
    ) {
      throw new Error(
        "Invalid avatar file"
      );
    }

    const updatedUser =
      await this.userRepository.updateById(
        userId,
        {
          avatarUrl: avatarKey,
        }
      );

    return this.sanitizeUser(
      updatedUser
    );
  }

  private async sanitizeUser(
    user: any
  ) {
    let avatarUrl =
      user.avatarUrl ?? null;

    /**
     * avatarUrl in DB is the S3 key.
     * Return a temporary signed URL to clients.
     */
    if (user.avatarUrl) {
      avatarUrl =
        await this.s3Service.createDownloadUrl(
          user.avatarUrl
        );
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl,
      googleId: user.googleId,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}