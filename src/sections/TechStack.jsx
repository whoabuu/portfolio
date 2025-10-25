import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./TechStack.css";
import TitleHeader from "../components/TitleHeader";

// Import the tech stack logos mapping
const techStackLogos = {
  react: "/images/react.svg",
  next: "/images/next.png",
  typescript: "/images/Typescript.svg",
  javascript: "/images/Javascript.svg",
  tailwind: "/images/tailwind.svg",
  html: "/images/HTML.svg",
  css: "/images/CSS.svg",
  redux: "/images/Redux.svg",
  materialui: "/images/MaterialUI.svg",
  nodejs: "/images/NodeJs.svg",
  express: "/images/Express.png",
  mongodb: "/images/MongoDB.svg",
  graphql: "/images/Graphql.svg",
  mysql: "/images/MySQL.svg",
  docker: "/images/Docker.svg",
  kubernetes: "/images/K8s.svg",
  azure: "/images/Azure.svg",
  azuredevops: "/images/Azure Devops.svg",
  vercel: "/images/Vercel.svg",
  git: "/images/Git.svg",
  postman: "/images/postman.svg",
  vite: "/images/Vite.svg",
  jest: "/images/Jest.svg",
  playwright: "/images/Playwrite.svg",
  vscode: "/images/vscode.svg",
};

const TechStack = () => {
  // Animate the tech cards in the skills section
  useGSAP(() => {
    gsap.fromTo(
      ".skillsLogo",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );

    gsap.fromTo(
      ".skillSubHeading p",
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

  return (
    <section id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="My Technical Arsenal"
          sub="🛠️ Languages, Frameworks & Tools"
        />
        <div className="skillContainer">
          <div className="leftSkillContainer">
            <div className="skillSubHeading">
              <p>
                Hi Everyone 👋 I'm Abuzar Tamboli — a Full Stack Developer with
                4+ years of experience (which in dev years probably counts as 40
                😅). I believe in writing clean code, authentic connections, and
                occasionally talking to my toddler for debugging help 🐤.
              </p>
              <p>
                Over the years, I've picked up a solid arsenal of tools — MERN
                Stack, React.js, Node.js, TypeScript, and all the shiny modern
                web tech the internet throws at us. If it runs in a browser (or
                even if it doesn't), I'm probably already trying to build
                something with it.
              </p>
              <p>
                I'm an innovator at heart — I love turning caffeine and ideas
                into production-ready features ☕💡. Solving problems is my jam,
                especially the ones that start with "it works on my machine..."
              </p>
              <p>
                I thrive in collaborative environments, where commits are clean
                and pull requests come with funny comments. I bring passion,
                skill, and a hint of nerdiness that can make even Monday morning
                standups bearable.
              </p>
            </div>
          </div>

          <div className="rightSkillContainer">
            <div className="space2">
              <video autoPlay muted loop>
                <source src="/images/cards-video.webm" type="video/webm" />
              </video>
            </div>

            {/* Core MERN Frontend */}
            {Object.entries(techStackLogos).map(([key, path]) => (
              <img key={key} src={path} alt={key} className="skillsLogo" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
