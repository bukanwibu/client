export default function({ store, redirect, next }) {
  if (store.state.auth.isLoggedIn) {
    return redirect("/");
  }
}
