export default function About() {
  return (
    <div className="py-16 bg-bg h-[calc(100vh-7rem)] text-text">
      <div className="mx-auto px-4 max-w-[120rem]">
        <h1 className="text-[clamp(4rem,8vw,2rem)] font-extrabold mb-6 text-center">
          About This Website
        </h1>
        <p className="text-[clamp(1.4rem,4vw,2rem)] mt-10  leading-relaxed mb-4">
          This website uses the{" "}
          <span className="font-semibold text-accent">REST Countries API</span>{" "}
          to display comprehensive information about countries from around the
          world.
        </p>
        <p className="text-[clamp(1.4rem,4vw,2rem)]  mt-10  leading-relaxed mb-4">
          Explore our data to learn about country names, capitals, regions,
          populations, flags, and much more. Whether you’re curious about a
          particular country or looking for insights about global regions, our
          interactive explorer makes it easy.
        </p>
        <p className="text-[clamp(1.4rem,4vw,2rem)]   mt-10 leading-relaxed">
          Our goal is to build a fully responsive and modern web application
          using the latest technologies, including React Router v7 for seamless
          routing and Tailwind CSS for a beautiful, responsive user interface.
        </p>
      </div>
    </div>
  );
}
