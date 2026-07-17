// to grab  anything thing is url like localhost:3000/profile/1 or localhost:3000/profile/2 what we can do is use the useParams hook from next/navigation. This hook will return an object containing the parameters of the current route. For example, if the current route is /profile/1, then useParams will return { id: '1' }.

// 1. Explicitly type your params promise for Next.js 16 type-safety
interface PageProps {
  params: Promise<{ id: string }>;
}

// 2. Make the page function async
export default async function UserProfile({ params }: any) {
  // 3. Await the params object before accessing properties
    const { id } = await params;
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <hr />
      <p className="text-lg">
        Welcome to your profile page,
        <span className="font-bold">{id}</span>!
      </p>
    </div>
  );
}