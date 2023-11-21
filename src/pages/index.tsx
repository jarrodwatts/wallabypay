import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: `
            radial-gradient(circle farthest-side at -15% 85%, rgba(90, 122, 255, .36), rgba(0, 0, 0, 0) 52%),
            radial-gradient(circle farthest-side at 100% 30%, rgba(245, 40, 145, 0.25), rgba(0, 0, 0, 0) 30%)
          `,
      }}
    >
      <div className="container justify-center flex flex-col lg:flex-row lg:justify-around items-center h-screen gap-8 lg:gap-0">
        <div className="mt-48 lg:-mt-72 flex flex-col items-center lg:items-start">
          <Badge className="w-24">Wallaby Pay</Badge>
          <h1 className="mt-4 text-5xl lg:text-7xl font-bold lg:font-extrabold max-w-xl leading-snug text-center lg:text-start text-slate-900">
            The Simplest Way to Pay Your Friends.
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mt-6 mb-4 lg:mb-8 max-w-2xl leading-normal text-center lg:text-start">
            Send money to anyone in the world money in under 5 seconds.
          </p>

          <Button className="w-full lg:w-48 h-14 text-lg font-semibold">
            Get Started
          </Button>
        </div>
        <div>
          <Image
            src="/wallaby.png"
            width={720}
            height={720}
            quality={100}
            alt="Wallaby"
            className="invisible lg:-mt-72 lg:visible"
          />
        </div>
      </div>
    </main>
  );
}
