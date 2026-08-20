import { UserRepository } from "../repositories/user.repository";
import { UpdateProfileInput } from "../module/user/user.validation";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getCurrentProfile(userId: string) {
    const user = await this.userRepository.findById(userId);

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

    if (data.email && data.email !== existingUser.email) {
      const emailUser =
        await this.userRepository.findByEmail(data.email);

      if (emailUser && emailUser.id !== userId) {
        throw new Error("Email already exists");
      }
    }

    const updatedUser =
      await this.userRepository.updateById(
        userId,
        data
      );

    return this.sanitizeUser(updatedUser);
  }

  async updateAvatar(
    userId: string,
    avatarUrl: string
  ) {
    const existingUser =
      await this.userRepository.findById(userId);

    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser =
      await this.userRepository.updateById(
        userId,
        {
          avatarUrl,
        }
      );

    return this.sanitizeUser(updatedUser);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sanitizeUser(user: any) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      googleId: user.googleId,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}