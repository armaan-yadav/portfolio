"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowDownLong } from "react-icons/fa6";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";
import { skills } from "./utils/constants";
import Container from "@/components/Container";


export default function Home() {
  return (
    <Container
      as="div"
      className="flex flex-col mt-3"
    >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
        <p className="text-sm sm:text-base text-justify">
          Hey, I'm Armaan Yadav, a pragmatic software developer and
          cybersecurity enthusiast passionate about{" "}
          <span className="underline">building and breaking</span> things that
          live on the internet. <br /> I love exploring emerging technologies
          and applying them to solve meaningful problems.
        </p>

        <div className="flex items-center w-full text-sm sm:text-base mt-4">
          <RiArrowRightLine className="mx-2" />
          By the way, I'm open to projects and work.
          <RiArrowRightLine className="mx-2" />
          <Link
            href="mailto:yadavarmaan10@gmail.com"
            className="hover:text-blue-500 transition-colors"
          >
            <RiMailLine className="inline-block w-4 h-4" />
          </Link>
        </div>
        <div className="flex items-center w-full text-sm sm:text-base mt-4">
          <RiArrowRightLine className="mx-2" />
          <span className="mr-2">Get the TL;DR version of my career</span>
          <Link href={"/resume/resume.pdf"} target="_blank">
            <button className="text-xs border border-gray-500 px-2 py-1 transition-colors duration-200 w-fit hover:bg-gray-100 dark:hover:bg-gray-800 group">
              Resume{" "}
              <FaArrowDownLong
                className="inline-block ml-1 group-hover:animate-bounce"
                size={10}
              />
            </button>
          </Link>
        </div>
        {/* Skills section */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-6">Skills & Technologies</h2>
          <div className="flex flex-col gap-2">
            {skills.map((skill, index) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="text-base sm:text-lg"
                key={index}
              >
                <h1 className="mb-1">{skill.category}</h1>
                <div className="flex flex-wrap gap-1">
                  {skill.skills.map((item, i) => {
                    return (
                      <span
                        className="text-xs border border-gray-500 px-2 py-1 transition-colors duration-200 w-fit"
                        key={i}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
}
