import { createUser, updateUsername } from "../test-providers/form";

test("should create new user ", async () => {
  const user = {
    id: 1,
    name: "تركي",
    email: "Turki@gmail.com",
    acceptTermsAndConditions: true,
  };

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: "تركي",
    email: "Turki@gmail.com",
    acceptTermsAndConditions: true,
  });
});

test("should update a users name ", async () => {
  const user = {
    id: 1,
    name: "محمد",
    email: "mohammad@gmail.com",
  };

  await expect(updateUsername(user)).resolves.toEqual({
    id: 1,
    name: "محمد",
    email: "mohammad@gmail.com",
  });
});

test("should fail if user does not accept terms", async () => {
  const user = {
    id: 1,
    name: "خالد",
    email: "khaled@gmail.com",
    acceptTermsAndConditions: false,
  };

  await expect(createUser(user)).resolves.toEqual(
    new Error("يجب على المستخدم قبول الشروط")
  );
});
