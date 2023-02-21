export async function loginController(email: string) {
  // const subscription = await getSubscriptionByEmail(email);

  if (email) {
    return {
      message: 'success',
    };
  }
}
