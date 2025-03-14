export interface ICreateCourseRequest {
	thumbnail: string;
	name: string;
	price: number;
	estimatedPrice: number;
	tags: string;
	level: string;
	description: string;
	demoUrl: string;
	benefits: {title: string}[];
	prerequisites: {title: string}[];
	courseData: {
		title: string;
		videoDescription: string;
		videoUrl: string;
		videoSection: string;
		videoLength: number | null;
		videoPlayer: string;
		links: {title: string; url: string}[];
		suggestion?: string;
	}[];
}
