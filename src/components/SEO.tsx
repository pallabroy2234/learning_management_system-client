import {FC} from "react";
import {Helmet} from "react-helmet-async";

type SEOProps = {
	title?: string;
	description?: string;
	keywords?: string[];
	author?: string;
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	ogUrl?: string;
	twitterHandle?: string;
}


const SEO: FC<SEOProps> = ({
							   title = "Learning Management System",
							   description = "Comprehensive platform for online learning and course management",
							   keywords = ["education", "learning", "courses", "online learning"],
							   author = "Pallab Roy Tushar",
							   ogTitle = "Learning Management System",
							   ogDescription = "Comprehensive platform for online learning and course management",
							   ogImage,
							   twitterHandle = "@pallab_roy_tushar",
							   ogUrl
						   }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords.join(", ")} />
			<meta name="author" content={author} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content="website" />
			<meta property="og:title" content={ogTitle || title} />
			<meta property="og:description" content={ogDescription || description} />
			<meta property="og:image" content={ogImage || "/default-og-image.png"} />
			<meta property="og:url" content={ogUrl || window.location.href} />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:creator" content={twitterHandle} />
			<meta name="twitter:title" content={ogTitle || title} />
			<meta name="twitter:description" content={ogDescription || description} />
			<meta name="twitter:image" content={ogImage || "/default-twitter-image.png"} />

			{/* Canonical URL */}
			<link rel="canonical" href={window.location.href} />
		</Helmet>
	);
};
export default SEO;
