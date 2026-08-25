export interface MemberUser {
  id: string;
  name: string;
  email: string;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: string;
  createdAt?: string;
  user?: MemberUser;
}

export interface MemberListResponse {
  success: boolean;
  message: string;
  data: {
    members: ProjectMember[];
  };
}

export interface AddMemberRequest {
  userId: string;
  role?: string;
}