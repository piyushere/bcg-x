import { ElectricityApplication } from '@/schemas/application.schema';
import ApplicationGrid from './Grid';
import React from 'react';
import applicationsApi from '@/apis/applications.api';

const Applications = () => {
  const [applications, setApplications] = React.useState<
    ElectricityApplication[]
  >([]);

  React.useEffect(() => {
    applicationsApi.getAll().then((res) => {
      if (res) setApplications(res);
    });
  }, []);

  return (
    <div>
      {applications.length ? (
        <ApplicationGrid data={applications} />
      ) : (
        <div>loading applications...</div>
      )}
    </div>
  );
};

export default Applications;
