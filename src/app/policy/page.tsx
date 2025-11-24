export default function Policy() {
  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center bg-gray-50 text-gray-800">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>

        <p>
          NuraStudy is designed to help students track their study time and
          manage their subjects. This Privacy Policy explains what data we
          collect, how we use it, and how it is stored.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Data We Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Account Information:</strong> When you sign up, Supabase
            securely stores your username, email, and password. We do not have
            access to your raw password.
          </li>
          <li>
            <strong>Study Time Logs:</strong> We store your total study time and
            session history.
          </li>
          <li>
            <strong>Subjects:</strong> Information about subjects you create or
            manage in the app (only stored locally unless you sync).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">How Your Data Is Used</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To authenticate your account using Supabase Auth.</li>
          <li>To display your study statistics inside the app.</li>
          <li>To display your ranking on the leaderboard.</li>
          <li>To sync your study data across devices.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">How Your Data Is Stored</h2>
        <p>
          All online data is stored in our managed Supabase PostgreSQL database.
          Study time is stored as incremental values. Authentication is handled
          securely by Supabase, following industry best practices.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Local Storage</h2>
        <p>
          Some data such as subjects and offline study time is stored locally on
          your device using AsyncStorage.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Data Security</h2>
        <p>
          We rely on Supabase&apos;s security, which includes encrypted storage
          for sensitive information and secure authentication flows.
        </p>

        <h2 className="text-2xl font-semibold mt-4">Your Rights</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You may request deletion of your account at any time.</li>
          <li>You may request deletion of your study data.</li>
          <li>
            You may stop using the app at any time and delete local data from
            your device.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4">Contact</h2>
        <p>
          If you have questions about your data, you can reach out at:
          ormomenm@gmail.com
        </p>
      </div>
    </div>
  );
}
