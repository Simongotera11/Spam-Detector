import React, { useState, useEffect } from 'react';
import Table from './Table';
import PieChart from './PieChart';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tableContent, setTableContent] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const [precision, setPrecision] = useState(0);

  useEffect(() => {
    const requestAccuracy = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/spam/accuracy', {
          method: 'GET',
        });
        const data = await response.json();
        setAccuracy(data.value * 100);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    requestAccuracy();
  }, []);

  const pieData = {
    labels: ['Accurate', 'Inaccurate'],
    values: [accuracy, 100 - accuracy],
  };

  useEffect(() => {
    const requestPrecision = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/spam/precision', {
          method: 'GET',
        });
        const data = await response.json();
        setPrecision(data.value * 100);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    requestPrecision();
  }, []);

  const preData = {
    labels: ['Precise', 'Imprecise'],
    values: [precision, 100 - precision],
  };

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/spam', {
          method: 'GET',
        });
        const data = await response.json();
        setTableContent(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    requestData();
  }, []);

  return (
    <div className='flex h-[86vh] justify-center align-middle p-8'>
      {loading ? (
        <div className='basis-2/3'>Loading</div>
      ) : (
        <div className='basis-2/3 h-100 overflow-auto max-h-full'>
          <Table data={tableContent} />
        </div>
      )}
      <div className='basis-1/3 flex flex-col w-full h-100 px-4 '>
        <div className='flex w-full pl-4 p-y-5 '>
          <p>Accuracy: {accuracy.toFixed(2)+"%"} </p>
          <PieChart data={pieData} width={'100%'} height={'100%'} />
        </div>
        <div className='flex w-full pl-4 p-y-5 '>
          <p>Precision: {precision.toFixed(2) +"%"} </p>
          <PieChart data={preData} width={'100%'} height={'100%'} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
