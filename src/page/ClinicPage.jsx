import { Helmet } from "react-helmet";
import  ClinicView  from "../section/ClinicSetPage/ClinicView";

function ClinicPage() {
  return (
    <div>
      <Helmet>
        <title>Đặt lịch</title>
      </Helmet>
      <ClinicView />
    </div>
  );
}
export default ClinicPage;
