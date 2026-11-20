import type { Availability } from "@/types/product";

const map: Record<Availability, { label: string; cls: string }> = {
  in_stock: { label: "Có sẵn", cls: "bg-ivory/95 text-forest" },
  made_to_order: { label: "Làm theo đơn", cls: "bg-bamboo/95 text-wood" },
  out_of_stock: { label: "Tạm hết", cls: "bg-text/80 text-ivory" },
};

export function AvailabilityTag({ availability }: { availability: Availability }) {
  const { label, cls } = map[availability];
  return <span className={`inline-block px-2.5 py-1 text-[0.7rem] font-medium tracking-wide ${cls}`}>{label}</span>;
}

export function availabilityLabel(a: Availability) {
  return map[a].label;
}
