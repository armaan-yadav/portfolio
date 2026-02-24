"use client";
import { RiExternalLinkLine, RiBox3Line } from "react-icons/ri";
import { TbBrandGithub, TbBrandNpm } from "react-icons/tb";
import { motion } from "framer-motion";
import { OpenSource } from "@/app/utils/constants";
import Link from "next/link";

export function OpenSourceItem({
  contribution,
  index,
}: {
  contribution: OpenSource;
  index: number;
}) {
  return (
    <motion.div
      className="mb-4 pb-6"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-1">
        <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <RiBox3Line className="text-gray-600 dark:text-gray-400 text-base sm:text-lg" />
          <Link href={contribution.githubLink} target="_blank" rel="noopener noreferrer">
            <span className="underline underline-offset-2">{contribution.title}</span>
          </Link>
        </h3>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {contribution.date}
        </span>
      </div>
      
      {contribution.stats && (
        <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 mb-2">
          {contribution.stats}
        </p>
      )}
      
      <p className="text-gray-500 text-sm sm:text-base mb-2 dark:text-gray-400">
        {contribution.description}
      </p>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {contribution.technologies.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="text-xs border border-gray-500 px-2 py-1"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-4">
        {contribution.npmLink && (
          <motion.a
            href={contribution.npmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 hover:text-gray-600 text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <TbBrandNpm className="text-base" />
            <span>NPM</span>
          </motion.a>
        )}
        
        <motion.a
          href={contribution.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 hover:text-gray-600 text-xs sm:text-sm"
          whileHover={{ scale: 1.05 }}
        >
          <TbBrandGithub className="text-base" />
          <span>GitHub</span>
        </motion.a>
        
        {contribution.websiteLink && (
          <motion.a
            href={contribution.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 hover:text-gray-600 text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <RiExternalLinkLine className="text-base" />
            <span>Website</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
