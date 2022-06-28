import './App.css';
import 'antd/dist/antd.css';
import moment from 'moment';
import NewEvent from './NewEventModal';
import { useState } from 'react';
import { Badge, Calendar } from 'antd';

const events = [];

const getListData = (value) => {
  const filteredEvents = events
    .filter(event => event.year == value.year() 
                && event.month == value.month() 
                && event.date == value.date());

  const listData = filteredEvents.map(event => {
    return {
      type: 'success', content: event.name
    }
  });

  return listData || [];
};

let selectedDate = {};

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = (values) => {
    setIsModalVisible(false);

    const event = {
      year: selectedDate.year(),
      month: selectedDate.month(),
      date: selectedDate.date(),
      name: values.name,
      startTime: values.startTime,
      endTime: values.endTime,
      description: values.description
    }

    events.push(event);
    console.log(this.events);
  };

  const handleCancel = (values) => {
    setIsModalVisible(false);
    console.log('Success:', values);
  };

  const handleDateSelection = (value) => {
    selectedDate = value;

    showModal();
  }

  const showModal = (v) => {
    setIsModalVisible(true);
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
      <Calendar
        dateCellRender={dateCellRender}
        defaultValue={moment()}
        onSelect={handleDateSelection}
      />;

      <NewEvent
        selectedDate={selectedDate}
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
