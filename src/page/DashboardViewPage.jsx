import { Helmet } from "react-helmet";
import DashboardView from "../section/DashboardPage/DashboardView";

function ClinicPage() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <DashboardView />
    </div>
  );
}
export default ClinicPage;
