import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <nav
      className="h-full w-20 lg:w-72 border-r border-[#2A293A] 
    flex flex-col transition-all duration-200 bg-[#1E1D2D]"
    >
      {/* Header */}
      <header className="border-b border-[#2A293A] w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-primary" />
          <span className="font-medium hidden lg:block text-white">Contacts</span>
        </div>
      </header>

      {/* Skeleton Contacts */}
      <section className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <article key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <figure className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full bg-[#2A293A]" />
            </figure>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2 bg-[#2A293A]" />
              <div className="skeleton h-3 w-16 bg-[#2A293A]" />
            </div>
          </article>
        ))}
      </section>
    </nav>
  );
};

export default SidebarSkeleton;
