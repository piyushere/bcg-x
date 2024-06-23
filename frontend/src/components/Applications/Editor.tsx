import { useParams } from 'react-router-dom';
import { ElectricityApplication } from '@/schemas/application.schema';
import applicationsApi from '@/apis/applications.api';
import { useEffect, useState } from 'react';
import ApplicationForm from './Form';
import { Separator } from '../ui/separator';

const ApplicationEditor = () => {
  const { applId } = useParams();
  const [data, setData] = useState<ElectricityApplication>();
  useEffect(() => {
    if (applId) applicationsApi.get(Number(applId)).then(setData);
  }, [applId]);

  function onSubmit(data: ElectricityApplication) {
    applicationsApi.update(data.id, data).then((data) => {
      setData(data);
      console.log(data);
    });
  }

  return (
    <div>
      <h1 className="text-base">Showing data for application #{applId}</h1>
      <Separator className="my-4" />
      {data ? (
        <div className="w-full flex justify-center">
          <div className="w-96">
            <ApplicationForm value={data} submit={onSubmit} />
          </div>
        </div>
      ) : (
        <h3>loading application data...</h3>
      )}
    </div>
  );
};
export default ApplicationEditor;
