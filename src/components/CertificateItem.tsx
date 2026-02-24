"use client";
import { Certificate } from "@/app/utils/constants";
import React from "react";
import { motion } from "framer-motion";
import { RiAwardLine } from "react-icons/ri";

interface CertificateItemProps {
  certificate: Certificate;
  index: number;
}

const CertificateItem = ({ certificate, index }: CertificateItemProps) => {
  return (
    <motion.div
      className="mb-4 pb-6"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <h3 className="text-base sm:text-lg font-semibold mb-1 flex items-center gap-2">
        <RiAwardLine className="text-gray-600 dark:text-gray-400 text-base sm:text-lg" />
        <span className="underline underline-offset-2">
          {certificate.title}
        </span>
      </h3>
      <p className="text-gray-500 text-sm sm:text-base mb-2 dark:text-gray-400">
        {certificate.description}
      </p>
      <motion.a
        href={certificate.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-xs sm:text-sm inline-block"
        whileHover={{ scale: 1.03 }}
      >
        View Certificate
      </motion.a>
    </motion.div>
  );
};

export default CertificateItem;
