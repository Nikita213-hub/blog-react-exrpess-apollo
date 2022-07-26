import { useEffect, useState } from 'react';
import React from 'react';
import { Table } from 'antd';
import './IndividualReports.css';
import IndividualReportsService from '../../services/IndividualReportsService';

const columns = [
  {
    title: 'File name',
    dataIndex: 'file_name',
    key: 'file_name',
  },
];


const IndividualReports = (props) => {

  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    IndividualReportsService.list().then(
      data => {
        console.log(data);
        setDataSource(data);
      },
      error => {
        setDataSource([]);
      }
    );
    setIsLoading(false);
  }, []);



  return (
    <div className="IndividualReports" data-testid="IndividualReports">
      <Table dataSource={dataSource} columns={columns} loading={isLoading}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => { IndividualReportsService.download(event.target.innerText) }, // click row
          };
        }}
      />;
    </div>
  )
};

IndividualReports.propTypes = {};

IndividualReports.defaultProps = {};

export default IndividualReports;
