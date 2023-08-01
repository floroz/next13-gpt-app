import Feed from "@/components/feed";

export default function Home() {
  return (
    <div>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Discover & Share
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            AI-Powered Prompts
          </span>
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi culpa expedita ea quae minus. Quam perspiciatis placeat nesciunt ea dolor alias culpa totam omnis earum et repudiandae, eligendi officiis accusamus?</p>
        <Feed />
      </section>
    </div>
  )
}
