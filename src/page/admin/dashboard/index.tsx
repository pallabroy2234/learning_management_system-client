import SEO from "../../../components/shared/SEO.tsx";

const Dashboard = () => {
    return (
        <div>
            {/* SEO */}
            <SEO
                title="Admin Dashboard | User Management | Learning Management System"
                description="Administrate platform users, manage courses, and monitor system performance with detailed analytics and insights"
                keywords={[
                    "admin dashboard",
                    "user management",
                    "course management",
                    "system analytics",
                    "admin tools",
                    "user analytics"
                ]}
                ogTitle="Admin Dashboard - User Management & Analytics"
                ogDescription="Oversee platform operations, manage user roles, courses, and monitor system performance efficiently"
                ogImage="/admin-dashboard.png"
                ogUrl={`${window.location.origin}/admin-dashboard`}
            />


            {/* Dashboard content */}
            <div className="mt-[60px]">
asdfasd
            </div>
        </div>
    );
};
export default Dashboard;
