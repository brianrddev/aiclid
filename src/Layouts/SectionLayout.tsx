interface SectionLayoutProps {
  children: React.ReactNode;
  ScrollId: string;
  BackgroundColor: 'transparent' | 'white' | 'black';
  Relative?: boolean;
}

export default function SectionLayout({
  children,
  ScrollId,
  BackgroundColor,
  Relative,
}: SectionLayoutProps) {
  return (
    <section
      id={`${ScrollId}`}
      className={`z-relative flex h-[100dvh] snap-start p-4 px-6 pt-8 sm:p-8 md:p-10 lg:p-12 ${BackgroundColor === 'white' ? 'bg-gray-100' : BackgroundColor === 'black' ? 'bg-black' : BackgroundColor === 'transparent' ? 'bg-transparent' : ''} ${Relative ? 'relative' : ''} `}
    >
      {children}
    </section>
  );
}
