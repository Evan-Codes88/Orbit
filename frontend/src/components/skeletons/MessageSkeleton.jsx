const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <section className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#1E1D2D]">
      {skeletonMessages.map((_, idx) => (
        <article key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <figure className="chat-image avatar">
            <div className="size-10 rounded-full border border-[#8A86C1] overflow-hidden">
              <div className="skeleton w-full h-full rounded-full bg-[#2A293A]" />
            </div>
          </figure>

          <header className="chat-header mb-2">
            <div className="skeleton h-4 w-20 bg-[#8A86C1]/50" />
          </header>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-14 w-[220px] bg-[#2A293A]" />
          </div>
        </article>
      ))}
    </section>
  );
};

export default MessageSkeleton;
