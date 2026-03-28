import { memo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyWrapper from "@/components/ui/lazy-wrapper";
import { PersonLayout } from "@/components/shared/Card/CardVariantLayouts";
import { usePersonDerivedValues } from "../hooks/useCardDerivedValues";
import type { CardProps } from "../types";

type PersonCardProps = Pick<CardProps, "person">;

const PersonCard = memo(({ person }: PersonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { imageUrl, detailsUrl } = usePersonDerivedValues(person);

  if (!person) return null;

  return (
    <LazyWrapper height={350}>
      <motion.div transition={{ duration: 0.3, ease: "easeOut" }} className="h-full w-full">
        <Link
          to={detailsUrl}
          className="group relative cursor-pointer block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <PersonLayout
            name={person.name}
            imageUrl={imageUrl}
            role={person.role}
            isHovered={isHovered}
          />
        </Link>
      </motion.div>
    </LazyWrapper>
  );
});

PersonCard.displayName = "PersonCard";
export default PersonCard;
