"use client";
import { Education } from "@/app/utils/constants";
import React from "react";
import { motion } from "framer-motion";
import { RiGraduationCapLine } from "react-icons/ri";

interface EducationItemProps {
  education: Education;
  index: number;
  isLast?: boolean;
}

const EducationItem = ({ education, index, isLast = false }: EducationItemProps) => {
  return (
    <motion.div
      className="relative mb-4 pb-6 pl-8"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] top-6 bottom-0 w-[2px] bg-gray-300 dark:bg-gray-700" />
      )}
      
      {/* Timeline node */}
      <motion.div
        className="absolute left-0 top-1 w-4 h-4 rounded-full bg-gray-700 dark:bg-gray-300 border-2 border-white dark:border-black shadow-md"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
      />

      <h3 className="text-base sm:text-lg font-semibold mb-1 flex items-center gap-2">
        <RiGraduationCapLine className="text-gray-600 dark:text-gray-400 text-base sm:text-lg" />
        <span className="underline underline-offset-2">
          {education.schoolName}
        </span>
      </h3>
      <p className="text-gray-500 text-sm sm:text-base mb-2 dark:text-gray-400">
        {education.degree} ({education.duration})
      </p>
    </motion.div>
  );
};

export default EducationItem;
