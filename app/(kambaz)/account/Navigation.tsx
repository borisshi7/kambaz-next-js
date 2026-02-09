import Link from "next/link";
export default function AccountNavigation() {
  return (
    <div className="wd list-group fs-5 rounded-0">
      <Link
        href="/account/signin"
        id="wd-signin"
        className="list-group-item active border-0"
      >
        SignIn
      </Link>
      <Link
        href="/account/signup"
        id="wd-signup"
        className="list-group-item text-danger border-0"
      >
        SignUp
      </Link>
      <Link
        href="/account/profile"
        id="wd-profile"
        className="list-group-item text-danger border-0"
      >
        Profile
      </Link>
    </div>
  );
}
