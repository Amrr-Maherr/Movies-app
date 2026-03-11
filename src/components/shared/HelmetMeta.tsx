import { Helmet } from "react-helmet";

interface HelmetMetaProps {
  name: string;
  description: string;
}

/**
 * HelmetMeta Component
 * 
 * A reusable component to set dynamic HTML head content for each page.
 * Sets the page title and meta description for SEO purposes.
 * 
 * @param {string} name - The name of the Movie, Series, Season, or Actor
 * @param {string} description - A brief description of the item
 * 
 * @example
 * <HelmetMeta 
 *   name="Avengers: Endgame" 
 *   description="Avengers: Endgame is an epic conclusion to the Marvel superhero saga..." 
 * />
 */
const HelmetMeta = ({ name, description }: HelmetMetaProps) => {
  return (
    <Helmet>
      <title>{`${name} | Netflix`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${name} | Netflix`} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={`${name} | Netflix`} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default HelmetMeta;
