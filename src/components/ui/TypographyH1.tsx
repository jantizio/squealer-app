type Props_t = {
  children: string;
};

export function TypographyH1(props: Props_t) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.children}
    </h1>
  );
}
