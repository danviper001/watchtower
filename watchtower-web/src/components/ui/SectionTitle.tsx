interface Props {
  title: string;
  subtitle: string;
}

function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="text-center mb-20">

      <h2 className="text-4xl md:text-5xl font-black">
        {title}
      </h2>

      <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-8">
        {subtitle}
      </p>

    </div>
  );
}

export default SectionTitle;