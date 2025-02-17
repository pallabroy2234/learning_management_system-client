import Hero from "../../features/home/components/Hero.tsx";
import SEO from "../../components/shared/SEO.tsx";


const Home = () => {
	return (
		<div>
			<SEO
				title="Home | Learning Management System"
				description="Welcome to our comprehensive learning platform"
				keywords={["learning", "courses", "education"]}
			/>
			<Hero />
		</div>
	);
};
export default Home;
