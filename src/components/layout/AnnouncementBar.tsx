import { pages } from "@/data/pages";
const messages = pages.announcement;

export function AnnouncementBar() {
  return (
    <div className="bg-forest text-bamboo">
      <ul className="container-page flex min-h-9 items-center justify-center gap-x-6 py-2 text-center text-[0.72rem] tracking-[0.12em] uppercase sm:text-xs">
        {messages.map((m, i) => (
          <li key={m} className={`items-center gap-6 ${i === 0 ? "flex" : "hidden md:flex"}`}>
            {i > 0 && <span aria-hidden="true" className="size-1 rotate-45 bg-wood" />}
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
