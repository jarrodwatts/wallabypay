import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "../styles/Landing.module.css";
import Link from "next/link";
import AppContainer from "@/components/AppContainer";

/**
 * A simple Homepage for the app.
 * Just a title with a description and an image that bounces when you hover on it lol =)
 */
export default function Home() {
  return (
    <AppContainer>
      <div className="container justify-center flex flex-col lg:flex-row lg:justify-around items-center gap-8 lg:gap-0">
        <div className="mt-48 lg:-mt-72 flex flex-col items-center lg:items-start">
          <Badge className="w-24">Wallaby Pay</Badge>
          <h1 className="mt-4 text-5xl lg:text-7xl font-bold lg:font-extrabold max-w-xl leading-snug text-center lg:text-start text-slate-900">
            The Simplest Way to Pay Your Friends.
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mt-6 mb-4 lg:mb-8 max-w-2xl leading-normal text-center lg:text-start">
            Send money to anyone in the world money in under 5 seconds.
          </p>

          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto justify-center lg:justify-start">
            <Link href="/login" passHref>
              <Button className="w-full lg:w-48 h-14 text-lg font-semibold">
                Get Started
              </Button>
            </Link>

            <Link
              href="https://github.com/jarrodwatts/wallabypay"
              target="_blank"
              passHref
            >
              <Button
                variant="outline"
                className="w-full lg:w-48 h-14 text-lg font-semibold"
              >
                View GitHub
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.bounceOnHover}>
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
    </AppContainer>
  );
}
