import { redirect } from 'next/navigation';

export default function RootPage(): never {
  // After login the user is sent to their default store's dashboard. If they
  // have no stores yet, the (onboarding) group takes over.
  redirect('/onboarding');
}
