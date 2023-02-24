import { Context } from "./context";

interface CreateUser {
  name: string;
  email: string;
  acceptTermsAndConditions: boolean;
}

export async function createUser(user: CreateUser, ctx?: Context) {
  if (user.acceptTermsAndConditions) {
    return await ctx?.prisma.student.create({
      data: user as any,
    });
  } else {
    return new Error("User must accept terms!");
  }
}

interface UpdateUser {
  id: number;
  name: string;
  email: string;
}

export async function updateUsername(user: UpdateUser, ctx?: Context) {
  return await ctx?.prisma.studentSupervisor.update({
    where: { id: user.id },
    data: user,
  });
}
