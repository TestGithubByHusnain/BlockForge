import type { CollectionEntry } from "astro:content";
import { Card } from "../components/Card";
import { Tag } from "../components/Tag";
import { getPostColorFromCategory } from "../utils/postUtils";
import { CutCornerButton } from "../components/CutCornerButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

export const LatestPosts = (props: { latestPosts: CollectionEntry<'blog'>[] }) => {
  const { latestPosts } = props;
  const targetRef = useRef<HTMLDivElement>(null);

  // Scroll-related animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'start center'],
  });
  const marginTop = useTransform(scrollYProgress, [0, 1], [0, 64]);

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "#4C51BF",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <section className="py-20 md:py-60">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={itemVariants}
        >
          <h2 className="font-heading font-black text-3xl md:text-5xl lg:text-6xl">
            Your portal to everything blockchain.
          </h2>
          <p className="text-lg md:text-2xl text-zinc-400 mt-6 md:mt-8">
            Keep up with the newest trends, updates, and insights in the blockchain world, updated weekly.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          className="mt-10 md:mt-28 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          ref={targetRef}
          style={{ marginTop }}
          variants={containerVariants}
        >
          {latestPosts.slice(0, 4).map(({ data: { title, description, category } }, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="transition-transform"
            >
              <Card
                buttonText="Read More"
                color={getPostColorFromCategory(category)}
                className={twMerge("flex flex-col gap-4")}
              >
                <Tag color={getPostColorFromCategory(category)}>{category}</Tag>
                <h3 className="font-heading font-black text-xl md:text-3xl mt-3">{title}</h3>
                <p className="text-sm md:text-lg text-zinc-400 mt-4 md:mt-6">{description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-Action Button */}
        <motion.div
          className="flex justify-center mt-20 md:mt-32"
          variants={itemVariants}
        >
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            className="rounded-lg"
          >
            <CutCornerButton>Read the Blog</CutCornerButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
