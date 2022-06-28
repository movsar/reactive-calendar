import './App.css';
import 'antd/dist/antd.css';
import { Form, DatePicker, TimePicker, Button, Input, Modal } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import NewEvent from './NewEventModal';
import { Badge, Calendar } from 'antd';

const getListData = (value) => {
  let listData;

  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;

    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
        {
          type: 'error',
          content: 'This is error event.',
        },
      ];
      break;

    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
        {
          type: 'success',
          content: 'This is very long usual event。。....',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
      ];
      break;

    default:
  }

  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values) => {
    setIsModalVisible(false);
    console.log('Success:', values);
  };

  const handleCancel = (values) => {
    setIsModalVisible(false);
    console.log('Success:', values);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} onSelect={showModal} />;

      <NewEvent
        handleCancel={handleCancel}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        showModal={showModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible} />
    </>
  );
}

export default App;
