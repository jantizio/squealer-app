import { ModeToggleDropdown } from '@/components/ModeToggle';
import { H2, H3 } from '@/components/ui/typography';

export const Preferences = () => {
  return (
    <>
      <H2>Preferenze</H2>
      <section className="mt-6 space-y-7">
        <section className="flex flex-wrap items-center gap-3">
          <H3>Tema</H3>
          <ModeToggleDropdown />
        </section>
      </section>
    </>
  );
};
